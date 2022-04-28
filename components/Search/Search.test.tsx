import { render, screen } from "@/test-utils";
import Search from "./Search";

describe("Search", () => {
  it("renders the search ui component", () => {
    render(<Search isSearchActive={() => ({})} />);
    const wrapper = screen.getByTestId("search-ui-component");
    expect(wrapper).toBeInTheDocument();
  });
});
