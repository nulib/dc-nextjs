import { render, screen, within } from "@/test-utils";
import { FACETS } from "@/lib/constants/facets-model";
import FacetsGroupList from "./GroupList";
import { FilterProvider } from "@/context/filter-context";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

mockRouter.setCurrentUrl("/search");

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

  it("renders all top level facet group UI trigger elements", () => {
    renderHelper();
    expect(screen.getByTestId("facets-group-list"));

    facetGroupLabels.forEach((label) => {
      expect(screen.getByText(label));
    });
  });

  /**
   * Make sure all facets in our FACET mapping are getting
   * rendered to the screen
   */
  FACETS.forEach((group) => {
    it("renders facet children when facet group is clicked", async () => {
      const user = userEvent.setup();
      renderHelper();

      const groupTrigger = screen.getByText(group.label);
      await user.click(groupTrigger);

      /* eslint-disable-next-line */
      const ancestorEl = groupTrigger.closest("div");
      if (ancestorEl) {
        group?.facets.forEach((facet) => {
          const el = within(ancestorEl).getByText(facet.label);
          expect(el).toBeInTheDocument();
        });
      } else {
        throw Error("Error finding ancestor of Facet Group trigger");
      }
    });
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
    expect(screen.getAllByRole("tab")[0].dataset.state).toEqual("active");
    expect(screen.getAllByRole("tab")[1].dataset.state).toEqual("inactive");
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
