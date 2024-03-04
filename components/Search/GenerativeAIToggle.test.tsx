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

  it("renders the generative AI dialog for a non-logged in user", async () => {
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

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    const generativeAIDialog = screen.queryByText(
      "You must be logged in with a Northwestern NetID to use the Generative AI search feature."
    );
    const cancelButton = screen.getByText("Cancel");

    expect(generativeAIDialog).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    await user.click(cancelButton);

    expect(generativeAIDialog).not.toBeInTheDocument();
  });

  it("renders a toggled generative ai state when a query param is set", () => {
    const activeSearchState = {
      ...defaultSearchState,
      isGenerativeAI: true,
    };

    mockRouter.setCurrentUrl("/search?ai=true");
    render(
      withSearchProvider(
        <GenerativeAIToggle isSearchActive={true} />,
        activeSearchState
      )
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });
});
