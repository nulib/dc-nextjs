import { render, screen } from "@/test-utils";

import Search from "./Search";
import { UserContext } from "@/context/user-context";
import { UserContext as UserContextType } from "@/types/context/user";
import mockRouter from "next-router-mock";
import { renderHook } from "@testing-library/react";
import { useRouter } from "next/router";
import userEvent from "@testing-library/user-event";

const mockIsSearchActive = jest.fn();

const defaultUser = {
  user: {
    email: "ace@northewestern.edu",
    isLoggedIn: true,
    isReadingRoom: false,
    name: "Ace Frehley",
    sub: "xyz123",
  },
};

const withUserProvider = (
  Component: React.ReactNode,
  user: UserContextType = defaultUser,
) => {
  return <UserContext.Provider value={user}>{Component}</UserContext.Provider>;
};

describe("Search component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the search ui component", () => {
    render(<Search isSearchActive={() => ({})} />);
    const wrapper = screen.getByTestId("search-ui-component");
    expect(wrapper).toBeInTheDocument();
  });

  it("accepts text input as a form value", async () => {
    const user = userEvent.setup();
    render(<Search isSearchActive={mockIsSearchActive} />);
    const form = screen.getByTestId("search-ui-component");

    await user.type(screen.getByRole("search"), "foo");

    expect(form).toHaveFormValues({ search: "foo" });
  });

  it("populates the search query param in browser url bar", async () => {
    const user = userEvent.setup();
    mockRouter.setCurrentUrl("/search");
    const { result } = renderHook(() => {
      return useRouter();
    });

    expect(result.current).toMatchObject({
      asPath: "/search",
    });

    render(<Search isSearchActive={mockIsSearchActive} />);

    await user.type(screen.getByRole("search"), "foo");
    await user.click(screen.getByTestId("submit-button"));

    expect(result.current).toMatchObject({
      asPath: "/search?q=foo",
    });
  });

  it("retains filter query params in browser url bar when searching", async () => {
    const user = userEvent.setup();
    mockRouter.setCurrentUrl("/search?subject=baz");
    const { result } = renderHook(() => {
      return useRouter();
    });

    render(<Search isSearchActive={mockIsSearchActive} />);

    await user.type(screen.getByRole("search"), "foo");
    await user.click(screen.getByTestId("submit-button"));

    expect(result.current).toMatchObject({
      asPath: "/search?q=foo&subject=baz",
    });
  });

  it("renders the generative ai toggle component", async () => {
    render(<Search isSearchActive={mockIsSearchActive} />);
    expect(screen.getByTestId("generative-ai-toggle")).toBeInTheDocument();
  });

  it("renders standard placeholder text for non AI search", () => {
    render(<Search isSearchActive={mockIsSearchActive} />);
    const input = screen.getByPlaceholderText(
      "Search by keyword or phrase, ex: Berkeley Music Festival",
    );
    expect(input).toBeInTheDocument();
  });

  it("renders the jump to component for collection routes", () => {
    mockRouter.setCurrentUrl("/collections/123");
    render(<Search isSearchActive={mockIsSearchActive} />);
    expect(screen.getByTestId("search-jump-to")).toBeInTheDocument();
  });

  it("renders generative AI placeholder text when AI search is active", () => {
    localStorage.setItem(
      "ai",
      JSON.stringify({ enabled: "true", expires: 9733324925021 }),
    );

    render(withUserProvider(<Search isSearchActive={mockIsSearchActive} />));

    const input = screen.getByPlaceholderText(
      "What can we show you from our collections?",
    );
    expect(input).toBeInTheDocument();
  });
});
