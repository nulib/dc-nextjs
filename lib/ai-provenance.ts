import type {
  AIProvenanceEntry,
  WorkWithAIProvenance,
} from "@/types/api/ai-provenance";

import type { ApiSearchRequestBody } from "@/types/api/request";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import { apiPostRequest } from "@/lib/dc-api";

/** One disclosed metadata field and its status. */
export interface AIProvenanceItem {
  /** the provenance map key, a stable React key */
  key: string;
  /** display label, e.g. "Alternate Title" */
  label: string;
  /** short status, e.g. "AI generated", "Human reviewed" */
  status: string;
}

/**
 * One disclosed transcription. It carries no label of its own: the file set it
 * belongs to is resolved separately by `getTranscriptionFileSetLabels`.
 */
export interface AITranscriptionItem {
  /** the provenance map key, a stable React key */
  key: string;
  /** the FileSetAnnotation id, which the label lookup is keyed on */
  annotationId: string;
  status: string;
}

export interface AIInvolvementSummary {
  hasAI: boolean;
  hasMetadata: boolean;
  hasTranscription: boolean;
  /** ordered by display label */
  metadataFields: AIProvenanceItem[];
  transcriptions: AITranscriptionItem[];
}

const EMPTY_SUMMARY: AIInvolvementSummary = {
  hasAI: false,
  hasMetadata: false,
  hasTranscription: false,
  metadataFields: [],
  transcriptions: [],
};

/**
 * Mirrors Meadow's `@ai_involved_origins` allowlist (app/lib/meadow/ai/provenance.ex).
 * Anything outside this set is not AI-involved and is never disclosed here.
 *
 * An allowlist rather than a human-only denylist because Meadow defaults a
 * target with no origin to "human_or_legacy", which a denylist would wrongly
 * disclose as AI. Keep in sync with Meadow if it adds an origin.
 */
const AI_ORIGINS = new Set([
  "ai_assisted_human_modified",
  "ai_generated",
  "ai_modified_human_content",
  "human_attested_after_ai",
  "human_replacement_after_ai_suggestion",
]);

/**
 * Statuses where the recorded value is NOT the field's live value, so
 * disclosing it would attribute AI to a value the page isn't showing.
 * Mirrors Meadow's `INACTIVE_FIELD_STATUSES` in AIProvenance/Badges.jsx.
 *
 * Meadow's `work_summary_map` does not filter by status, so these can reach us.
 */
const INACTIVE_STATUSES = new Set([
  "deleted",
  "failed",
  "proposed",
  "rejected",
  "reviewed",
]);

function isAIEntry(entry?: AIProvenanceEntry | null): boolean {
  const origin = entry?.origin;
  if (typeof origin !== "string" || !AI_ORIGINS.has(origin)) return false;
  // An absent status is treated as live; only known-inactive ones are dropped.
  const status = entry?.status;
  return typeof status !== "string" || !INACTIVE_STATUSES.has(status);
}

function aiEntries(
  section?: Record<string, AIProvenanceEntry> | null,
): [string, AIProvenanceEntry][] {
  if (!section || typeof section !== "object") return [];
  return Object.entries(section).filter(([, entry]) => isAIEntry(entry));
}

/**
 * Origin labels, verbatim from Meadow's `ORIGIN_META` so a record reads the
 * same in the staff UI and here. Origin is authorship: what the AI did, and
 * whether a human has since edited or taken responsibility for the value.
 */
const ORIGIN_LABELS: Record<string, string> = {
  ai_assisted_human_modified: "AI + human edited",
  ai_generated: "AI generated",
  ai_modified_human_content: "AI edited",
  human_attested_after_ai: "Human attested",
  human_replacement_after_ai_suggestion: "Human replaced AI",
};

/**
 * `human_oversight_level` is derived from `origin` in every case except one:
 * Meadow sets "human_reviewed" only when a person actually approved the value
 * (provenance.ex, review_target!/5). So it is the single oversight value that
 * adds information the origin label doesn't already carry, and the only one we
 * append.
 *
 * We deliberately diverge from Meadow here, which badges origin alone: that a
 * human checked AI-generated content is a primary disclosure for the public.
 * Note the consequence -- a field NOT marked reviewed is, by omission, one no
 * one has reviewed yet.
 *
 * "human_review_required" is the default for `ai_generated` and means review
 * has NOT happened, so it must never produce review wording. The reviewer's
 * name and the model are staff-facing and never surfaced publicly.
 */
const REVIEWED_SUFFIX = ", human reviewed";

/**
 * A short, public-facing status for one provenance entry. `origin` is an open
 * vocabulary, so an unrecognized value is humanized rather than dropped.
 */
export function getAIStatusLabel(entry?: AIProvenanceEntry | null): string {
  const origin = entry?.origin;
  if (!origin) return "AI involved";

  let label = ORIGIN_LABELS[origin];
  if (!label) {
    const spaced = origin.replace(/_/g, " ");
    const sentence = spaced.charAt(0).toUpperCase() + spaced.slice(1);
    // Keep the acronym uppercase for an origin we don't have a label for yet.
    label = sentence.replace(/^Ai\b/, "AI");
  }

  // Only add review when the origin doesn't already say a human acted.
  if (
    entry?.human_oversight_level === "human_reviewed" &&
    origin === "ai_generated"
  )
    return `${label}${REVIEWED_SUFFIX}`;

  return label;
}

/**
 * Field keys whose display label on the work page differs from a plain
 * Title Case rendering of the key.
 */
const FIELD_LABEL_OVERRIDES: Record<string, string> = {
  date_created: "Date",
  keywords: "Keyword",
  library_unit: "Department",
  physical_description_material: "Materials",
  physical_description_size: "Dimensions",
  related_url: "Related URL",
};

const SMALL_WORDS = new Set(["a", "an", "and", "of", "or", "the", "to"]);

/**
 * Turn a snake_case API field key into the label the work page shows, e.g.
 * "style_period" -> "Style Period", "table_of_contents" -> "Table of Contents".
 */
export function getAIFieldLabel(field: string): string {
  const override = FIELD_LABEL_OVERRIDES[field];
  if (override) return override;

  return field
    .split("_")
    .map((word, index) =>
      index > 0 && SMALL_WORDS.has(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

/**
 * Normalize a work's AI disclosure into what the indicator needs.
 *
 * `ai_involved` is authoritative for the section flags when the API supplies it;
 * until then the flags are derived from `ai_provenance`.
 */
export function getAIInvolvement(
  work?: WorkWithAIProvenance | null,
): AIInvolvementSummary {
  if (!work) return EMPTY_SUMMARY;

  const { ai_involved: involved, ai_provenance: provenance } = work;

  const metadataFields = aiEntries(provenance?.descriptive_metadata)
    .map(([key, entry]) => ({
      key,
      label: getAIFieldLabel(key),
      status: getAIStatusLabel(entry),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // The provenance map is keyed `content:<FileSetAnnotation id>`. That id is
  // not on `file_sets[]`, so the file set it belongs to has to be looked up —
  // see `getTranscriptionFileSetLabels`.
  const transcriptions = aiEntries(provenance?.file_set_annotations).map(
    ([key, entry]) => ({
      key,
      annotationId: annotationIdFromKey(key),
      status: getAIStatusLabel(entry),
    }),
  );

  const hasMetadata =
    typeof involved?.descriptive_metadata === "boolean"
      ? involved.descriptive_metadata
      : metadataFields.length > 0;

  const hasTranscription =
    typeof involved?.file_set_annotations === "boolean"
      ? involved.file_set_annotations
      : transcriptions.length > 0;

  return {
    hasAI: hasMetadata || hasTranscription,
    hasMetadata,
    hasTranscription,
    metadataFields: hasMetadata ? metadataFields : [],
    transcriptions: hasTranscription ? transcriptions : [],
  };
}

/**
 * `content:89723082-...` -> `89723082-...`. The key is `<field_path>:<target_id>`
 * and `target_id` is the FileSetAnnotation id, so everything after the first
 * colon is the id.
 */
function annotationIdFromKey(key: string): string {
  const separator = key.indexOf(":");
  return separator === -1 ? "" : key.slice(separator + 1);
}

interface FileSetLabelHit {
  annotations?: { id?: string | null }[] | null;
  id?: string | null;
  label?: string | null;
}

/**
 * Map each of a work's annotation ids to the label of the file set holding it.
 *
 * One request for the whole work rather than one per annotation: the
 * `/annotations/:id` route also returns a `file_set_id`, but a page-level item
 * would need a call per page, and each of those runs two queries server side.
 *
 * Search respects visibility, so a private or unpublished file set simply will
 * not come back. Callers should treat a missing label as "do not display"
 * rather than an error — the same applies when the request itself fails, which
 * `apiPostRequest` reports by resolving to `undefined`.
 */
export async function getTranscriptionFileSetLabels(
  workId?: string | null,
): Promise<Record<string, string>> {
  if (!workId) return {};

  const body = {
    _source: ["id", "label", "annotations.id"],
    query: { term: { work_id: workId } },
    size: 100,
  } as ApiSearchRequestBody;

  const response = await apiPostRequest<{ data?: FileSetLabelHit[] }>({
    body,
    url: `${DCAPI_ENDPOINT}/search/file-sets`,
  });

  const labels: Record<string, string> = {};

  for (const fileSet of response?.data ?? []) {
    if (!fileSet?.label) continue;
    for (const annotation of fileSet.annotations ?? []) {
      if (annotation?.id) labels[annotation.id] = fileSet.label;
    }
  }

  return labels;
}
