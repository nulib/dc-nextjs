// import { render, screen, within } from "@/test-utils";
import { render, screen } from "@testing-library/react";
import { FilterProvider } from "@/context/filter-context";
import React from "react";
import { SearchProvider } from "@/context/search-context";
import UserFacets from "./UserFacets";

const searchStateDefault = {
  aggregations: [],
  q: "",
  userFacets: {},
};

const searchState = {
  aggregations: [],
  q: "",
  userFacets: { genre: ["Foo"] },
};

const filterStateDefault = {
  userFacetsUnsubmitted: {},
};

const filterState = {
  userFacetsUnsubmitted: { genre: ["Foo"], subject: ["Bar", "Baz"] },
};

describe("UserFacet UI component", () => {
  it("Renders a user facet component without value entries.", () => {
    render(
      <SearchProvider initialState={searchStateDefault}>
        <FilterProvider initialState={filterStateDefault}>
          <UserFacets screen="search" />
        </FilterProvider>
      </SearchProvider>
    );
    const userFacets = screen.queryByText(`facet-user-component`);
    expect(userFacets).toBeNull();
  });

  it("Renders a user facet component in `search` screen.", () => {
    render(
      <SearchProvider initialState={searchState}>
        <FilterProvider initialState={filterState}>
          <UserFacets screen="search" />
        </FilterProvider>
      </SearchProvider>
    );
    const userFacets = screen.getByTestId(`facet-user-component`);
    expect(userFacets).toBeInTheDocument();
    const toggle = screen.getByTestId(`facet-user-component-popover-toggle`);
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveTextContent("1");
    const content = screen.queryByText(`facet-user-component-popover-content`);
    expect(content).toBeNull();
  });

  it("Renders a user facet component in `modal` screen.", () => {
    render(
      <SearchProvider initialState={searchState}>
        <FilterProvider initialState={filterState}>
          <UserFacets screen="modal" />
        </FilterProvider>
      </SearchProvider>
    );
    const userFacets = screen.getByTestId(`facet-user-component`);
    expect(userFacets).toBeInTheDocument();
    const values = screen.getAllByTestId(`facet-user-value-component`);
    expect(values.length).toBe(3);
  });
});
