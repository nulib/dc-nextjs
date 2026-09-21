import {
  getAIFieldLabel,
  getAIInvolvement,
  getAIStatusLabel,
  getTranscriptionFileSetLabels,
} from "@/lib/ai-provenance";

import { apiPostRequest } from "@/lib/dc-api";

jest.mock("@/lib/dc-api", () => ({ apiPostRequest: jest.fn() }));

const mockApiPostRequest = apiPostRequest as jest.MockedFunction<
  typeof apiPostRequest
>;

import type { WorkWithAIProvenance } from "@/types/api/ai-provenance";

const entry = (origin: string) => ({
  origin,
  ai_use_type: "metadata_generation",
  status: "applied",
});

/**
 * Mirrors the shape returned by the staging record
 * 7628f860-96bf-4093-b8d9-8ca94d4ea739, including the `notes` entry that is
 * present but human authored.
 */
const workWithProvenance = {
  id: "7628f860-96bf-4093-b8d9-8ca94d4ea739",
  ai_provenance: {
    descriptive_metadata: {
      alternate_title: entry("ai_generated"),
      creator: entry("ai_generated"),
      description: entry("ai_assisted_human_modified"),
      notes: entry("human_generated"),
      style_period: entry("ai_generated"),
    },
    file_set_annotations: {
      "content:89723082-bf54-4a5f-bada-04b8344bfa60": entry("ai_generated"),
      "content:934c33eb-91d8-4f79-a8b6-96e1d9e18c5d": entry(
        "ai_assisted_human_modified",
      ),
    },
  },
} as unknown as WorkWithAIProvenance;

describe("getAIInvolvement()", () => {
  it("reports no involvement for a missing work", () => {
    expect(getAIInvolvement(undefined).hasAI).toBe(false);
    expect(getAIInvolvement(null).hasAI).toBe(false);
  });

  it("reports no involvement when ai_provenance is null", () => {
    // A work with no AI returns the key with a null value.
    const work = { id: "abc", ai_provenance: null } as WorkWithAIProvenance;
    expect(getAIInvolvement(work)).toEqual({
      hasAI: false,
      hasMetadata: false,
      hasTranscription: false,
      metadataFields: [],
      transcriptions: [],
    });
  });

  it("derives section flags from ai_provenance when ai_involved is absent", () => {
    const summary = getAIInvolvement(workWithProvenance);

    expect(summary.hasAI).toBe(true);
    expect(summary.hasMetadata).toBe(true);
    expect(summary.hasTranscription).toBe(true);
    expect(summary.transcriptions).toHaveLength(2);
  });

  it("carries the annotation id and status for each transcription", () => {
    const { transcriptions } = getAIInvolvement(workWithProvenance);

    expect(transcriptions).toEqual([
      {
        key: "content:89723082-bf54-4a5f-bada-04b8344bfa60",
        annotationId: "89723082-bf54-4a5f-bada-04b8344bfa60",
        status: "AI generated",
      },
      {
        key: "content:934c33eb-91d8-4f79-a8b6-96e1d9e18c5d",
        annotationId: "934c33eb-91d8-4f79-a8b6-96e1d9e18c5d",
        status: "AI + human edited",
      },
    ]);
  });

  it("excludes human authored fields", () => {
    const { metadataFields } = getAIInvolvement(workWithProvenance);

    expect(metadataFields.map(({ key }) => key)).not.toContain("notes");
    expect(metadataFields).toHaveLength(4);
  });

  it("orders metadata fields by their display label", () => {
    const { metadataFields } = getAIInvolvement(workWithProvenance);

    expect(metadataFields.map(({ key }) => key)).toEqual([
      "alternate_title",
      "creator",
      "description",
      "style_period",
    ]);
  });

  it("carries a display label and status for each metadata field", () => {
    const { metadataFields } = getAIInvolvement(workWithProvenance);

    expect(metadataFields).toEqual([
      {
        key: "alternate_title",
        label: "Alternate Title",
        status: "AI generated",
      },
      { key: "creator", label: "Creator", status: "AI generated" },
      {
        key: "description",
        label: "Description",
        status: "AI + human edited",
      },
      { key: "style_period", label: "Style Period", status: "AI generated" },
    ]);
  });

  it("prefers ai_involved over ai_provenance when it is present", () => {
    const work = {
      ...workWithProvenance,
      ai_involved: { descriptive_metadata: false, file_set_annotations: true },
    } as WorkWithAIProvenance;
    const summary = getAIInvolvement(work);

    expect(summary.hasMetadata).toBe(false);
    expect(summary.metadataFields).toEqual([]);
    expect(summary.hasTranscription).toBe(true);
    expect(summary.transcriptions).toHaveLength(2);
  });

  it("falls back per key when ai_involved is only partially populated", () => {
    const work = {
      ...workWithProvenance,
      ai_involved: { descriptive_metadata: false },
    } as WorkWithAIProvenance;
    const summary = getAIInvolvement(work);

    expect(summary.hasMetadata).toBe(false);
    // file_set_annotations is absent from ai_involved, so it derives.
    expect(summary.hasTranscription).toBe(true);
  });

  it("renders the pill from ai_involved alone when ai_provenance is missing", () => {
    const work = {
      id: "abc",
      ai_involved: { descriptive_metadata: true, file_set_annotations: false },
    } as WorkWithAIProvenance;
    const summary = getAIInvolvement(work);

    expect(summary.hasAI).toBe(true);
    expect(summary.hasMetadata).toBe(true);
    expect(summary.metadataFields).toEqual([]);
    expect(summary.transcriptions).toEqual([]);
  });

  it("reports no involvement when every origin is human", () => {
    const work = {
      ai_provenance: {
        descriptive_metadata: {
          creator: entry("human_generated"),
          notes: entry("human_created"),
        },
        file_set_annotations: {},
      },
    } as unknown as WorkWithAIProvenance;

    expect(getAIInvolvement(work).hasAI).toBe(false);
  });

  it("ignores an entry with no origin", () => {
    const work = {
      ai_provenance: {
        descriptive_metadata: { subject: { status: "applied" } },
      },
    } as unknown as WorkWithAIProvenance;

    expect(getAIInvolvement(work).hasAI).toBe(false);
  });

  it("reports no involvement for empty section objects", () => {
    const work = {
      ai_provenance: { descriptive_metadata: {}, file_set_annotations: {} },
    } as unknown as WorkWithAIProvenance;

    expect(getAIInvolvement(work).hasAI).toBe(false);
  });
});

describe("getAIFieldLabel()", () => {
  it("title cases a snake_case field key", () => {
    expect(getAIFieldLabel("style_period")).toBe("Style Period");
    expect(getAIFieldLabel("creator")).toBe("Creator");
    expect(getAIFieldLabel("alternate_title")).toBe("Alternate Title");
    expect(getAIFieldLabel("description")).toBe("Description");
  });

  it("keeps small words lowercase", () => {
    expect(getAIFieldLabel("table_of_contents")).toBe("Table of Contents");
    expect(getAIFieldLabel("scope_and_contents")).toBe("Scope and Contents");
    expect(getAIFieldLabel("terms_of_use")).toBe("Terms of Use");
  });

  it("uses the display label where it differs from the field key", () => {
    expect(getAIFieldLabel("date_created")).toBe("Date");
    expect(getAIFieldLabel("library_unit")).toBe("Department");
    expect(getAIFieldLabel("physical_description_size")).toBe("Dimensions");
    expect(getAIFieldLabel("related_url")).toBe("Related URL");
  });

  it("degrades readably for an unmapped field", () => {
    expect(getAIFieldLabel("some_future_field")).toBe("Some Future Field");
  });
});

describe("origin and status filtering", () => {
  const field = (entry: Record<string, unknown>) =>
    ({
      ai_provenance: { descriptive_metadata: { creator: entry } },
    }) as unknown as WorkWithAIProvenance;

  /**
   * Meadow defaults a target with no recorded origin to "human_or_legacy".
   * It is not in @ai_involved_origins, so it must not be disclosed as AI.
   */
  it("does not disclose human_or_legacy as AI involvement", () => {
    expect(getAIInvolvement(field({ origin: "human_or_legacy" })).hasAI).toBe(
      false,
    );
  });

  it("does not disclose human_generated as AI involvement", () => {
    expect(getAIInvolvement(field({ origin: "human_generated" })).hasAI).toBe(
      false,
    );
  });

  /**
   * An origin outside Meadow's allowlist is not disclosed. Trade-off: a new AI
   * origin Meadow adds stays hidden until this set is updated.
   */
  it("does not disclose an origin outside Meadow's allowlist", () => {
    expect(getAIInvolvement(field({ origin: "ai_translated" })).hasAI).toBe(
      false,
    );
  });

  /**
   * A non-applied entry records a value that is NOT the one on the page, so
   * disclosing it would attribute AI to content the user isn't looking at.
   */
  it.each(["proposed", "reviewed", "rejected", "failed", "deleted"])(
    "does not disclose a %s entry",
    (status) => {
      expect(
        getAIInvolvement(field({ origin: "ai_generated", status })).hasAI,
      ).toBe(false);
    },
  );

  it("discloses an applied entry", () => {
    expect(
      getAIInvolvement(field({ origin: "ai_generated", status: "applied" }))
        .hasAI,
    ).toBe(true);
  });

  it("treats a missing status as live", () => {
    expect(getAIInvolvement(field({ origin: "ai_generated" })).hasAI).toBe(
      true,
    );
  });
});

describe("getAIStatusLabel()", () => {
  /**
   * Origin is authorship and carries the most information, so it is the base
   * label in every case -- matching Meadow's ORIGIN_META verbatim.
   */
  it("labels each AI origin exactly as Meadow does", () => {
    expect(getAIStatusLabel({ origin: "ai_generated" })).toBe("AI generated");
    expect(getAIStatusLabel({ origin: "ai_modified_human_content" })).toBe(
      "AI edited",
    );
    expect(getAIStatusLabel({ origin: "ai_assisted_human_modified" })).toBe(
      "AI + human edited",
    );
    expect(
      getAIStatusLabel({ origin: "human_replacement_after_ai_suggestion" }),
    ).toBe("Human replaced AI");
    expect(getAIStatusLabel({ origin: "human_attested_after_ai" })).toBe(
      "Human attested",
    );
  });

  /**
   * The one deliberate divergence from Meadow: a human approving AI-generated
   * content is a primary public disclosure, so it is appended to the origin.
   */
  it("appends review to AI generated content a human approved", () => {
    expect(
      getAIStatusLabel({
        origin: "ai_generated",
        human_oversight_level: "human_reviewed",
      }),
    ).toBe("AI generated, human reviewed");
  });

  /**
   * `human_review_required` is the DEFAULT oversight for ai_generated and means
   * review has NOT happened. It must never read as any kind of sign-off.
   */
  it("does not imply review for human_review_required", () => {
    expect(
      getAIStatusLabel({
        origin: "ai_generated",
        human_oversight_level: "human_review_required",
      }),
    ).toBe("AI generated");
  });

  /**
   * Oversight is derived from origin for every value but human_reviewed, so
   * letting it win would discard what the origin label already says.
   */
  it("does not let a derived oversight level override the origin", () => {
    expect(
      getAIStatusLabel({
        origin: "ai_assisted_human_modified",
        human_oversight_level: "human_modified",
      }),
    ).toBe("AI + human edited");

    expect(
      getAIStatusLabel({
        origin: "human_replacement_after_ai_suggestion",
        human_oversight_level: "human_modified",
      }),
    ).toBe("Human replaced AI");

    expect(
      getAIStatusLabel({
        origin: "human_attested_after_ai",
        human_oversight_level: "human_attested",
      }),
    ).toBe("Human attested");
  });

  it("humanizes an unrecognized origin, keeping the acronym uppercase", () => {
    expect(getAIStatusLabel({ origin: "ai_translated" })).toBe("AI translated");
  });

  it("degrades to a neutral status with no origin", () => {
    expect(getAIStatusLabel({})).toBe("AI involved");
    expect(getAIStatusLabel(null)).toBe("AI involved");
  });
});

describe("getTranscriptionFileSetLabels()", () => {
  beforeEach(() => mockApiPostRequest.mockReset());

  /** Mirrors the staging response for work 7628f860-...  */
  const searchResponse = {
    data: [
      {
        annotations: [{ id: "89723082-bf54-4a5f-bada-04b8344bfa60" }],
        id: "288c7e70-67ac-46e8-911f-b1af2b94217d",
        label: "p. 1 recto",
      },
      {
        annotations: [{ id: "934c33eb-91d8-4f79-a8b6-96e1d9e18c5d" }],
        id: "8c00f5b6-b70b-4782-978f-bcbeb0739cb8",
        label: "p. 1 verso",
      },
    ],
  };

  it("maps each annotation id to its file set label", async () => {
    mockApiPostRequest.mockResolvedValue(searchResponse);

    await expect(getTranscriptionFileSetLabels("work-1")).resolves.toEqual({
      "89723082-bf54-4a5f-bada-04b8344bfa60": "p. 1 recto",
      "934c33eb-91d8-4f79-a8b6-96e1d9e18c5d": "p. 1 verso",
    });
  });

  it("asks for the whole work in one request", async () => {
    mockApiPostRequest.mockResolvedValue(searchResponse);

    await getTranscriptionFileSetLabels("work-1");

    expect(mockApiPostRequest).toHaveBeenCalledTimes(1);
    const [{ body, url }] = mockApiPostRequest.mock.calls[0];
    expect(url).toContain("/search/file-sets");
    expect(body).toMatchObject({ query: { term: { work_id: "work-1" } } });
  });

  it("makes no request without a work id", async () => {
    await expect(getTranscriptionFileSetLabels(undefined)).resolves.toEqual({});
    expect(mockApiPostRequest).not.toHaveBeenCalled();
  });

  // apiPostRequest swallows errors and resolves undefined.
  it("returns an empty map when the request fails", async () => {
    mockApiPostRequest.mockResolvedValue(undefined);

    await expect(getTranscriptionFileSetLabels("work-1")).resolves.toEqual({});
  });

  // Search respects visibility, so a file set the viewer cannot see is absent
  // rather than errored; its annotations simply go unlabeled.
  it("omits annotations whose file set is not in the response", async () => {
    mockApiPostRequest.mockResolvedValue({
      data: [
        { annotations: [{ id: "visible" }], id: "fs-1", label: "p. 1 recto" },
        { annotations: [{ id: "unlabeled" }], id: "fs-2", label: null },
      ],
    });

    await expect(getTranscriptionFileSetLabels("work-1")).resolves.toEqual({
      visible: "p. 1 recto",
    });
  });
});
