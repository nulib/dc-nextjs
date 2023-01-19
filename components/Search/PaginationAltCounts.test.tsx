import { render, screen } from "@/test-utils";
import PaginationAltCounts from "@/components/Search/PaginationAltCounts";

/* eslint sort-keys: 0 */
const pagination = {
  query_url:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search?searchToken=N4IgRg9gJgniBcoDOBLAXgUwQFgAwBoQB9JCAVwC&page=4",
  current_page: 4,
  limit: 40,
  offset: 120,
  total_hits: 584,
  total_pages: 15,
  prev_url:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search?searchToken=N4IgRg9gJgniB&page=3",
  next_url:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search?searchToken=N4IgRg9gJgniBcoDOBLAXgUwQFgAwBoQ&page=5",
  search_token: "N4IgRg9gJgn",
};

describe("PaginationAltCounts component", () => {
  it("renders a middle pagination page", () => {
    const expectedResult = "Showing 121 to 160 of 584 results";

    render(<PaginationAltCounts pagination={pagination} />);

    /** Results */
    expect(screen.getByTestId("pagination-alt-counts"));
    expect(screen.getByTestId("results")).toHaveTextContent(expectedResult);

    /** Buttons */
    expect(screen.getByText(/start/i)).toBeInTheDocument();
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it("renders the first pagination page", () => {
    const expectedResult = "Showing 1 to 40 of 584 results";

    const newPagination = {
      ...pagination,
      current_page: 1,
      offset: 0,
    };
    render(<PaginationAltCounts pagination={newPagination} />);

    /** Results */
    expect(screen.getByTestId("pagination-alt-counts"));
    expect(screen.getByTestId("results")).toHaveTextContent(expectedResult);

    /** Buttons */
    expect(screen.queryByText(/start/i)).toBeNull();
    expect(screen.queryByText(/previous/i)).toBeNull();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it("renders the first pagination page", () => {
    const expectedResult = "Showing 561 to 584 of 584 results";

    const newPagination = {
      ...pagination,
      current_page: 15,
    };
    render(<PaginationAltCounts pagination={newPagination} />);

    /** Results */
    expect(screen.getByTestId("pagination-alt-counts"));
    expect(screen.getByTestId("results")).toHaveTextContent(expectedResult);

    /** Buttons */
    expect(screen.getByText(/start/i)).toBeInTheDocument();
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.queryByText(/next/i)).toBeNull();
  });
});
