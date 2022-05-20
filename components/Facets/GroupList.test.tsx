import { fireEvent, render, screen, within } from "@/test-utils";
import { FACETS } from "@/lib/constants/facets-model";
import FacetsGroupList from "./GroupList";

const facetGroupLabels = FACETS.map((group) => group.label);

describe("FacetsGroupList component", () => {
  function renderHelper() {
    return render(<FacetsGroupList />);
  }
  it("renders all the facet group UI triggers", () => {
    renderHelper();
    expect(screen.getByTestId("facets-group-list"));
    facetGroupLabels.forEach((label) => {
      expect(screen.getByText(label));
    });
  });

  it("renders facets under each facet group", () => {
    renderHelper();
    const subjectsGroup = FACETS.find(
      (group) => group.label === "Subjects and Descriptive"
    );
    const groupTrigger = screen.getByText("Subjects and Descriptive");
    fireEvent.click(groupTrigger);

    const ancestorEl = groupTrigger.closest("div");
    if (ancestorEl) {
      subjectsGroup?.facets.forEach((facet) => {
        expect(within(ancestorEl).getByText(facet.label));
      });
    } else {
      throw Error("Error finding ancestor of Facet Group trigger");
    }
  });

  //   it("renders an initial facet value", () => {

  //   })
});
