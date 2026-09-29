import { manifest, work } from "@/mocks/sample-work-image";
import { render, screen } from "@/test-utils";

import type { Work } from "@nulib/dcapi-types";
import WorkTopInfo from "@/components/Work/TopInfo";
import type { WorkWithAIProvenance } from "@/types/api/ai-provenance";

describe("WorkTopInfo component", () => {
  function renderHelper() {
    return render(
      <WorkTopInfo manifest={manifest} work={work as unknown as Work} />,
    );
  }

  it("renders", async () => {
    renderHelper();
    expect(screen.getByTestId("work-top-info-wrapper"));
  });

  it("renders title and description", async () => {
    renderHelper();
    expect(screen.getByTestId("title")).toHaveTextContent(
      manifest?.label?.none?.join(",") as string,
    );
    expect(screen.getByTestId("summary")).toHaveTextContent(
      manifest?.summary?.none?.join(",") as string,
    );
  });

  it("renders Action buttons", async () => {
    renderHelper();
    expect(screen.getByText(/find this item/i));
    expect(screen.getByText(/cite this item/i));
    expect(screen.getByText(/download and share/i));
  });

  it("renders metadata", async () => {
    renderHelper();

    const metadataEl = await screen.findByTestId("metadata");
    expect(metadataEl).toBeInTheDocument();
  });

  it("renders no AI provenance indicator for a work without AI", () => {
    renderHelper();
    expect(screen.queryByTestId("ai-provenance")).not.toBeInTheDocument();
  });

  it("renders the AI provenance indicator above, and outside of, the collapsible metadata", () => {
    const aiWork = {
      ...work,
      ai_provenance: {
        descriptive_metadata: { creator: { origin: "ai_generated" } },
      },
    } as unknown as WorkWithAIProvenance;

    render(<WorkTopInfo manifest={manifest} work={aiWork} />);

    const indicator = screen.getByTestId("ai-provenance");
    const expand = screen.getByTestId("expand");

    // Outside the Expand, so it cannot be clipped by the "Show More" collapse.
    expect(expand).not.toContainElement(indicator);
    // And before it in document order.
    expect(
      indicator.compareDocumentPosition(expand) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("keeps the two column metadata/collection grid intact", () => {
    const { container } = render(
      <WorkTopInfo manifest={manifest} work={work as unknown as Work} />,
    );

    // TopInfoContent is a 2 column grid; a third direct child would reflow it.
    const grid = container.querySelector('[data-testid="expand"]')
      ?.parentElement?.parentElement;
    expect(grid?.children).toHaveLength(2);
  });
});
