import { render, screen } from "@/test-utils";
import WorkTopInfo from "@/components/Work/TopInfo";
import { sampleWork1 } from "@/mocks/sample-work1";

describe("WorkTopInfo component", () => {
  function renderHelper() {
    return render(<WorkTopInfo work={sampleWork1} />);
  }
  it("renders", () => {
    renderHelper();
    expect(screen.getByTestId("work-top-info-wrapper"));
  });

  it("renders title and description", () => {
    renderHelper();
    expect(screen.getByText(sampleWork1.title));
    expect(screen.getByText(sampleWork1.descriptions[0]));
  });

  it("renders Action buttons", () => {
    renderHelper();
    expect(screen.getByText(/find this item/i));
    expect(screen.getByText(/cite this item/i));
    expect(screen.getByText(/download and share/i));
  });

  // TODO: Flesh this out once we know if we're pulling from a IIIF Manifest
  it("renders metadata", () => {
    renderHelper();
    expect(screen.getByTestId("metadata"));
  });
});
