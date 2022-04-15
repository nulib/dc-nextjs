import { render, screen } from "@testing-library/react";
import Search from "./Search";

describe("Search", () => {
  it("renders the search ui component", () => {
    render(
      <Search isSearchActive={() => console.log(`isSearchActive`, true)} />
    );
    const wrapper = screen.getByTestId("search-ui-component");
    expect(wrapper).toBeInTheDocument();
  });
});
