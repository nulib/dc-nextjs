import { render, screen, waitFor } from "@testing-library/react";

import { apiPostRequest } from "@/lib/dc-api";

import React from "react";
import WorkAIProvenance from "@/components/Work/AIProvenance";
import type { WorkWithAIProvenance } from "@/types/api/ai-provenance";
import userEvent from "@testing-library/user-event";

jest.mock("@/lib/dc-api", () => ({ apiPostRequest: jest.fn() }));

const mockApiPostRequest = apiPostRequest as jest.MockedFunction<
  typeof apiPostRequest
>;

beforeEach(() => mockApiPostRequest.mockReset().mockResolvedValue(undefined));

const entry = (origin: string) => ({ origin, status: "applied" });

const buildWork = (
  ai_provenance: Record<string, unknown>,
): WorkWithAIProvenance =>
  ({ id: "abc123", ai_provenance }) as unknown as WorkWithAIProvenance;

const metadataOnly = buildWork({
  descriptive_metadata: {
    creator: entry("ai_generated"),
    description: entry("ai_assisted_human_modified"),
    notes: entry("human_generated"),
  },
});

const transcriptionOnly = buildWork({
  file_set_annotations: {
    "content:89723082": entry("ai_generated"),
    "content:934c33eb": entry("ai_assisted_human_modified"),
  },
});

const both = buildWork({
  descriptive_metadata: { style_period: entry("ai_generated") },
  file_set_annotations: { "content:89723082": entry("ai_generated") },
});

/**
 * Radix renders tooltip content twice: the visible popup and a visually hidden
 * copy for screen readers. Both carry the test id, so take the first.
 */
const openTooltip = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.hover(screen.getByTestId("ai-provenance-tooltip-trigger"));
  const [tooltip] = await screen.findAllByTestId("ai-provenance-tooltip");
  return tooltip;
};

describe("WorkAIProvenance", () => {
  it("renders nothing when the work has no AI involvement", () => {
    const { container } = render(
      <WorkAIProvenance work={{ id: "abc" } as WorkWithAIProvenance} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when every provenance entry is human authored", () => {
    const work = buildWork({
      descriptive_metadata: { notes: entry("human_generated") },
    });
    const { container } = render(<WorkAIProvenance work={work} />);

    expect(container).toBeEmptyDOMElement();
  });

  // The pill names the sections AI touched, so the disclosure is specific
  // before the tooltip is opened.
  it.each([
    ["metadata only", metadataOnly, "AI-assisted metadata"],
    ["transcription only", transcriptionOnly, "AI-assisted transcriptions"],
    ["both", both, "AI-assisted metadata and transcriptions"],
  ])("labels a %s work", (_name, work, expected) => {
    render(<WorkAIProvenance work={work} />);

    expect(screen.getByTestId("ai-provenance")).toHaveTextContent(expected);
  });

  it("exposes the tooltip trigger as a named button", () => {
    render(<WorkAIProvenance work={metadataOnly} />);

    expect(
      screen.getByRole("button", {
        name: "More information about AI involvement in this item",
      }),
    ).toBeInTheDocument();
  });

  it("lists the affected metadata fields with a per-field status", async () => {
    const user = userEvent.setup();
    render(<WorkAIProvenance work={metadataOnly} />);

    const tooltip = await openTooltip(user);

    expect(tooltip).toHaveTextContent("Descriptive Metadata fields");
    expect(tooltip).toHaveTextContent("Creator: AI generated");
    expect(tooltip).toHaveTextContent("Description: AI + human edited");
    // `notes` is human authored and must not be disclosed as AI involved.
    expect(tooltip).not.toHaveTextContent("Notes");
  });

  it("appends review to the origin once a human has approved the value", async () => {
    const user = userEvent.setup();
    const work = buildWork({
      descriptive_metadata: {
        creator: {
          origin: "ai_generated",
          human_oversight_level: "human_reviewed",
        },
      },
    });
    render(<WorkAIProvenance work={work} />);

    expect(await openTooltip(user)).toHaveTextContent(
      "Creator: AI generated, human reviewed",
    );
  });

  it("pluralizes the transcription count", async () => {
    const user = userEvent.setup();
    render(<WorkAIProvenance work={transcriptionOnly} />);

    expect(await openTooltip(user)).toHaveTextContent(
      "This item includes 2 AI-assisted transcriptions.",
    );
  });

  it("labels each transcription with its file set once the lookup resolves", async () => {
    mockApiPostRequest.mockResolvedValue({
      data: [
        { annotations: [{ id: "89723082" }], id: "fs-1", label: "p. 1 recto" },
        { annotations: [{ id: "934c33eb" }], id: "fs-2", label: "p. 1 verso" },
      ],
    });
    const user = userEvent.setup();
    render(<WorkAIProvenance work={transcriptionOnly} />);

    const tooltip = await openTooltip(user);

    await waitFor(() =>
      expect(tooltip).toHaveTextContent("p. 1 recto: AI generated"),
    );
    expect(tooltip).toHaveTextContent("p. 1 verso: AI + human edited");
  });

  // The lookup is deferred so it costs nothing for the visitors who never
  // open the tooltip.
  it("does not look up file set labels until the tooltip opens", () => {
    render(<WorkAIProvenance work={transcriptionOnly} />);

    expect(mockApiPostRequest).not.toHaveBeenCalled();
  });

  it("keeps the count sentence and omits the list when the lookup fails", async () => {
    mockApiPostRequest.mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<WorkAIProvenance work={transcriptionOnly} />);

    const tooltip = await openTooltip(user);

    expect(tooltip).toHaveTextContent(
      "This item includes 2 AI-assisted transcriptions.",
    );
    expect(tooltip).not.toHaveTextContent("p. 1 recto");
  });

  it("uses the singular for a single transcription", async () => {
    const user = userEvent.setup();
    const work = buildWork({
      file_set_annotations: { "content:89723082": entry("ai_generated") },
    });
    render(<WorkAIProvenance work={work} />);

    expect(await openTooltip(user)).toHaveTextContent(
      "This item includes 1 AI-assisted transcription.",
    );
  });

  it("omits the field list when ai_involved has no provenance detail", async () => {
    const user = userEvent.setup();
    const work = {
      id: "abc",
      ai_involved: { descriptive_metadata: true, file_set_annotations: false },
    } as WorkWithAIProvenance;
    render(<WorkAIProvenance work={work} />);

    const tooltip = await openTooltip(user);

    expect(tooltip).toHaveTextContent(
      "This applies to the item's descriptive metadata and transcriptions, not to the digitized object itself.",
    );
    expect(tooltip).not.toHaveTextContent("Description fields");
    expect(tooltip).not.toHaveTextContent("This item includes");
  });
});
