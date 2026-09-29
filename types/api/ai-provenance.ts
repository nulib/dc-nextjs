import type { Work } from "@nulib/dcapi-types";

/**
 * Types for the DC API's AI provenance disclosure, exposed on a Work as the
 * `ai_involved` and `ai_provenance` keys.
 *
 * These are not yet published in @nulib/dcapi-types, so they live here and are
 * composed onto the package's `Work` type. Delete this file and use the
 * package's types once it ships them.
 */

/**
 * `origin` is an open vocabulary. Known values are listed for autocomplete, but
 * unrecognized values must still be handled — see `isAIOrigin` in
 * `lib/ai-provenance.ts`, which treats anything not explicitly human as AI.
 */
export type AIOrigin =
  | "ai_generated"
  | "ai_assisted_human_modified"
  | "human_generated"
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

/**
 * PREMIS preservation event detail. Modeled but not surfaced in the UI yet.
 */
export interface AIProvenancePremis {
  event_outcome?: string | null;
  event_type?: string | null;
  linking_object_role?: string | null;
  object_category?: string | null;
  object_identifier_type?: string | null;
  object_identifier_value?: string | null;
}

/**
 * C2PA content credential detail. Modeled but not surfaced in the UI yet.
 */
export interface AIProvenanceC2pa {
  action?: string | null;
  assertion_label?: string | null;
  claim_id?: string | null;
  digital_source_type_uri?: string | null;
  human_oversight_level?: string | null;
  ingredient_relationship?: string | null;
  manifest_id?: string | null;
  ready?: boolean | null;
  signature_status?: string | null;
  validation_status?: string | null;
}

export interface AIProvenanceEntry {
  access_mode?: string | null;
  activity_id?: string | null;
  activity_type?: string | null;
  ai_use_type?: string | null;
  applied_at?: string | null;
  c2pa?: AIProvenanceC2pa | null;
  citation_completeness?: string | null;
  generated_at?: string | null;
  human_oversight_level?: string | null;
  model?: string | null;
  model_provider?: string | null;
  model_type?: string | null;
  model_version?: string | null;
  operation?: string | null;
  origin?: AIOrigin | null;
  premis?: AIProvenancePremis | null;
  reversibility?: string | null;
  reviewer?: string | null;
  source_count?: number | null;
  status?: string | null;
  target_id?: string | null;
  target_type?: string | null;
}

/**
 * `descriptive_metadata` is keyed by snake_case Work field name (`creator`,
 * `style_period`, ...). `file_set_annotations` is keyed `content:<annotation id>`;
 * note those annotation ids do not correspond to any `file_sets[].id` on the same
 * Work, so annotations cannot currently be attributed to a specific file set.
 */
export interface AIProvenance {
  descriptive_metadata?: Record<string, AIProvenanceEntry> | null;
  file_set_annotations?: Record<string, AIProvenanceEntry> | null;
}

/**
 * High level summary of which sections AI was involved in. Authoritative when
 * present, but not yet returned by the API.
 */
export interface AIInvolved {
  descriptive_metadata?: boolean;
  file_set_annotations?: boolean;
}

export type WorkWithAIProvenance = Work & {
  ai_involved?: AIInvolved | null;
  ai_provenance?: AIProvenance | null;
};
