// import { render, screen, within } from "@/test-utils";
import { act, render, renderHook, screen } from "@testing-library/react";
import singletonRouter, { useRouter } from "next/router";
import { FilterProvider } from "@/context/filter-context";
import React from "react";
import { SearchProvider } from "@/context/search-context";
import UserFacets from "./UserFacets";

jest.mock("next/router", () => require("next-router-mock"));

const searchStateDefault = {
  aggregations: {},
  q: "",
  searchFixed: false,
};

const searchState = {
  aggregations: {},
  q: "",
  searchFixed: false,
};

const filterStateDefault = {
  userFacetsUnsubmitted: {},
};

const filterState = {
  userFacetsUnsubmitted: { genre: ["Foo"], subject: ["Bar", "Baz"] },
};

describe("UserFacet UI component", () => {
  it("Renders a user facet component without value entries.", () => {
    const { result } = renderHook(() => {
      return useRouter();
    });

    act(() => {
      result.current.push({
        pathname: "/search",
      });
    });

    render(
      <SearchProvider initialState={searchStateDefault}>
        <FilterProvider initialState={filterStateDefault}>
          <UserFacets screen="search" urlFacets={{}} />
        </FilterProvider>
      </SearchProvider>
    );
    const userFacets = screen.queryByText(`facet-user-component`);

    expect(result.current).toMatchObject({
      asPath: "/search",
      query: {},
    });
    expect(userFacets).toBeNull();
  });

  it("Renders a user facet component in `search` screen.", async () => {
    singletonRouter.push({
      pathname: "/search",
      query: {
        genre: ["Foo"],
      },
    });

    render(
      <SearchProvider initialState={searchState}>
        <FilterProvider initialState={filterState}>
          <UserFacets
            screen="search"
            urlFacets={{
              genre: ["Foo"],
            }}
          />
        </FilterProvider>
      </SearchProvider>
    );
    const userFacets = await screen.findByTestId(`facet-user-component`);
    expect(userFacets).toBeInTheDocument();
    const toggle = screen.getByTestId(`facet-user-component-popover-toggle`);
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveTextContent("1");
    const content = screen.queryByText(`facet-user-component-popover-content`);
    expect(content).toBeNull();
  });

  it("Renders a user facet component in `modal` screen.", () => {
    singletonRouter.push({
      pathname: "/search",
      query: {
        genre: ["Foo"],
      },
    });

    render(
      <SearchProvider initialState={searchState}>
        <FilterProvider initialState={filterState}>
          <UserFacets
            screen="modal"
            urlFacets={{
              genre: ["Foo"],
            }}
          />
        </FilterProvider>
      </SearchProvider>
    );
    const userFacets = screen.getByTestId(`facet-user-component`);
    expect(userFacets).toBeInTheDocument();
    const values = screen.getAllByTestId(`facet-user-value-component`);
    expect(values.length).toBe(3);
  });
});
