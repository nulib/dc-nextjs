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
  user: UserContextType = defaultUser,
) => {
  return <UserContext.Provider value={user}>{Component}</UserContext.Provider>;
};

const withSearchProvider = (
  Component: React.ReactNode,
  initialState = defaultSearchState,
) => {
  return (
    <SearchProvider initialState={initialState}>{Component}</SearchProvider>
  );
};

describe("GenerativeAIToggle", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");

    // Note: localStorage mocked in "jest.setup.js"
    localStorage.clear();
  });

  it("renders the generative AI toggle UI and toggles state for a logged in user", async () => {
    const user = userEvent.setup();
    render(withUserProvider(withSearchProvider(<GenerativeAIToggle />)));

    const label = screen.getByLabelText("Use Generative AI");
    const checkbox = screen.getByRole("checkbox");

    expect(label).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("data-state", "unchecked");

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
    expect(localStorage.getItem("ai")).toEqual(JSON.stringify("true"));
  });

  it("renders the generative AI tooltip", () => {
    render(withSearchProvider(<GenerativeAIToggle />));
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
        withSearchProvider(<GenerativeAIToggle />),
        nonLoggedInUser,
      ),
    );

    const checkbox = await screen.findByRole("checkbox");
    await user.click(checkbox);

    const generativeAIDialog = await screen.findByText(
      "You must be logged in with a Northwestern NetID to use the Generative AI search feature.",
    );

    expect(generativeAIDialog).toBeInTheDocument();
  });

  it("renders a toggled generative ai state when localStorage variable is set and user is logged in", () => {
    const activeSearchState = {
      ...defaultSearchState,
    };

    localStorage.setItem("ai", JSON.stringify("true"));

    mockRouter.setCurrentUrl("/search");
    render(
      withUserProvider(
        withSearchProvider(<GenerativeAIToggle />, activeSearchState),
      ),
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("updates localStorage ai variable when generative AI checkbox is clicked", async () => {
    const user = userEvent.setup();

    mockRouter.setCurrentUrl("/");

    localStorage.setItem("ai", JSON.stringify("false"));

    render(
      withUserProvider(
        withSearchProvider(<GenerativeAIToggle />, defaultSearchState),
      ),
    );

    await user.click(screen.getByRole("checkbox"));

    expect(localStorage.getItem("ai")).toEqual(JSON.stringify("true"));
  });
});
