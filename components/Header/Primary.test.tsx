import { render, screen } from "@/test-utils";

import HeaderPrimary from "./Primary";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import mockRouter from "next-router-mock";

// Tell mockRouter about the dynamic routes in our app:
mockRouter.useParser(
  createDynamicRouteParser(["/search", "/collections/[id]"]),
);

jest.mock("@/components/Search/Search", () => {
  return function DummySearch() {
    return <div data-testid="search-ui-component">Search</div>;
  };
});

jest.mock("@/components/Search/JumpTo", () => {
  return function DummySearchJumpTo() {
    return <div data-testid="search-jump-to">Jump To</div>;
  };
});

describe("HeaderPrimary", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/search");
  });

  it("renders the header-primary ui component", () => {
    render(<HeaderPrimary />);
    const wrapper = screen.getByTestId("header-primary-ui-component");
    expect(wrapper).toBeInTheDocument();
  });

  it("renders the search component", () => {
    render(<HeaderPrimary />);
    const search = screen.getByTestId("search-ui-component");
    expect(search).toBeInTheDocument();
  });

  it("renders the search jump to component", () => {
    mockRouter.setCurrentUrl(
      "https://devbox.library.northwestern.edu:3000/collections/1c2e2200-c12d-4c7f-8b87-a935c349898a",
    );
    render(<HeaderPrimary />);

    expect(screen.queryByTestId("search-ui-component")).toBeNull();
    expect(screen.getByTestId("search-jump-to")).toBeInTheDocument();
  });

  it("renders browse collections link", () => {
    render(<HeaderPrimary />);
    const link = screen.getByText("Browse Collections");
    expect(link).toBeInTheDocument();
  });
});
