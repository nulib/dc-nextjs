import {
  SearchProvider,
  defaultState as defaultSearchState,
} from "@/context/search-context";
import { render, screen } from "@testing-library/react";

import GenerativeAIToggle from "./GenerativeAIToggle";
import React from "react";
import { UserContext } from "@/context/user-context";
import { UserContext as UserContextType } from "@/types/context/user";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

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
  user: UserContextType = defaultUser
) => {
  return <UserContext.Provider value={user}>{Component}</UserContext.Provider>;
};

const withSearchProvider = (
  Component: React.ReactNode,
  initialState = defaultSearchState
) => {
  return (
    <SearchProvider initialState={initialState}>{Component}</SearchProvider>
  );
};

describe("GenerativeAIToggle", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  it("renders the generative AI toggle UI and toggles state for a logged in user", async () => {
    const user = userEvent.setup();
    render(
      withUserProvider(
        withSearchProvider(<GenerativeAIToggle isSearchActive={true} />)
      )
    );

    const label = screen.getByLabelText("Use Generative AI");
    const checkbox = screen.getByRole("checkbox");

    expect(label).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("data-state", "unchecked");

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("renders the generative AI tooltip", () => {
    render(withSearchProvider(<GenerativeAIToggle isSearchActive={true} />));
    // Target the svg icon itself
    const tooltip = screen.getByText("Information Circle");

    expect(tooltip).toBeInTheDocument();
  });

  it("renders a login dialog for a non-logged-in user when generative ai checkbox is checked", async () => {
    const user = userEvent.setup();
    const nonLoggedInUser = {
      user: {
        ...defaultUser.user,
        isLoggedIn: false,
      },
    };

    render(
      withUserProvider(
        withSearchProvider(<GenerativeAIToggle isSearchActive={true} />),
        nonLoggedInUser
      )
    );

    const checkbox = await screen.findByRole("checkbox");
    await user.click(checkbox);

    const generativeAIDialog = await screen.findByText(
      "You must be logged in with a Northwestern NetID to use the Generative AI search feature."
    );

    expect(generativeAIDialog).toBeInTheDocument();
  });

  it("renders a toggled generative ai state when a query param is set and user is logged in", () => {
    const activeSearchState = {
      ...defaultSearchState,
      isGenerativeAI: true,
    };

    mockRouter.setCurrentUrl("/search?ai=true");
    render(
      withUserProvider(
        withSearchProvider(
          <GenerativeAIToggle isSearchActive={true} />,
          activeSearchState
        )
      )
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("sets a query param in the URL when generative AI checkbox is clicked", async () => {
    const user = userEvent.setup();

    mockRouter.setCurrentUrl("/");

    render(
      withUserProvider(
        withSearchProvider(
          <GenerativeAIToggle isSearchActive={false} />,
          defaultSearchState
        )
      )
    );

    await user.click(screen.getByRole("checkbox"));

    expect(mockRouter).toMatchObject({
      asPath: "/?ai=true",
      pathname: "/",
      query: { ai: "true" },
    });
  });
});
