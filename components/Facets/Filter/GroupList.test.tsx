import { render, screen, within } from "@/test-utils";
import { FACETS } from "@/lib/constants/facets-model";
import FacetsGroupList from "./GroupList";
import { FilterProvider } from "@/context/filter-context";
import userEvent from "@testing-library/user-event";

jest.mock("@/hooks/useFetchApiData", () => {
  return jest.fn(() => ({
    data: [],
    error: "",
    loading: "",
  }));
});

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

  it("renders facets under a facet group when facet group is clicked", async () => {
    const user = userEvent.setup();
    renderHelper();
    const subjectsGroup = FACETS.find(
      (group) => group.label === "Subjects and Descriptive"
    );
    const groupTrigger = screen.getByText("Subjects and Descriptive");
    await user.click(groupTrigger);

    /* eslint-disable-next-line */
    const ancestorEl = groupTrigger.closest("div");
    if (ancestorEl) {
      subjectsGroup?.facets.forEach((facet) => {
        expect(within(ancestorEl).getByText(facet.label));
      });
    } else {
      throw Error("Error finding ancestor of Facet Group trigger");
    }
  });

  it("renders a default expanded initial facet value", () => {
    render(
      <FilterProvider
        initialState={{
          recentFacet: {
            field: "descriptiveMetadata.contributor.displayFacet",
            id: "contributor",
            label: "Contributor",
          },
          userFacetsUnsubmitted: {},
        }}
      >
        <FacetsGroupList />
      </FilterProvider>
    );
    /**
     * Looks like Radix puts this active state data attribute
     * on the element.... good for testing against:)
     */
    expect(screen.getByText("Contributor").dataset.state).toEqual("active");
  });

  it("renders facet aggregations when a facet is clicked upon", async () => {
    const user = userEvent.setup();
    renderHelper();
    await user.click(screen.getByText("Subjects and Descriptive"));

    const el = screen.getByText("Genre");
    await user.click(el);
    expect(el.dataset.state).toEqual("active");
  });
});
