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

const defaultUserContext: UserContextType = {
  user: {
    email: "ace@northewestern.edu",
    primaryAffiliation: "student",
    isLoggedIn: true,
    isReadingRoom: false,
    name: "Ace Frehley",
    sub: "xyz123",
  },
  isSignInModalOpen: false,
  openSignInModal: jest.fn(() => {
    defaultUserContext.isSignInModalOpen = true;
  }),
  closeSignInModal: jest.fn(() => {
    defaultUserContext.isSignInModalOpen = false;
  }),
};

const withUserProvider = (
  Component: React.ReactNode,
  userContext: UserContextType = defaultUserContext,
) => {
  return (
    <UserContext.Provider value={userContext}>{Component}</UserContext.Provider>
  );
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

    const label = screen.getByLabelText("AI Mode");
    const checkbox = screen.getByRole("checkbox");

    expect(label).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("data-state", "unchecked");

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");

    const ai = JSON.parse(String(localStorage.getItem("ai")));
    expect(ai?.enabled).toEqual("true");
    expect(typeof ai?.expires).toEqual("number");
    expect(ai?.expires).toBeGreaterThan(Date.now());
  });

  it("renders the generative AI tooltip", () => {
    render(withSearchProvider(<GenerativeAIToggle />));
    // Target the svg icon itself
    const tooltip = screen.getByText("Information Circle");

    expect(tooltip).toBeInTheDocument();
  });

  it("renders a login dialog for a non-logged-in user when generative ai checkbox is checked", async () => {
    const user = userEvent.setup();
    const nonLoggedInUser: UserContextType = {
      ...defaultUserContext,
      user: {
        ...defaultUserContext.user!,
        isLoggedIn: false,
      },
      openSignInModal: jest.fn(() => {
        nonLoggedInUser.isSignInModalOpen = true;
      }),
      closeSignInModal: jest.fn(() => {
        nonLoggedInUser.isSignInModalOpen = false;
      }),
    };

    render(
      withUserProvider(
        withSearchProvider(<GenerativeAIToggle />),
        nonLoggedInUser,
      ),
    );

    const checkbox = await screen.findByRole("checkbox");
    await user.click(checkbox);

    expect(nonLoggedInUser.isSignInModalOpen).toBe(true);
  });

  it("saves AI preference to localStorage before opening login dialog for non-logged-in user", async () => {
    const user = userEvent.setup();
    const nonLoggedInUser: UserContextType = {
      ...defaultUserContext,
      user: {
        ...defaultUserContext.user!,
        isLoggedIn: false,
      },
      openSignInModal: jest.fn(() => {
        nonLoggedInUser.isSignInModalOpen = true;
      }),
      closeSignInModal: jest.fn(() => {
        nonLoggedInUser.isSignInModalOpen = false;
      }),
    };

    render(
      withUserProvider(
        withSearchProvider(<GenerativeAIToggle />),
        nonLoggedInUser,
      ),
    );

    const checkbox = await screen.findByRole("checkbox");
    await user.click(checkbox);

    // Verify AI preference was saved to localStorage before opening modal
    const ai = JSON.parse(String(localStorage.getItem("ai")));
    expect(ai?.enabled).toEqual("true");
    expect(typeof ai?.expires).toEqual("number");
    expect(ai?.expires).toBeGreaterThan(Date.now());
    expect(nonLoggedInUser.isSignInModalOpen).toBe(true);
  });

  it("renders a toggled generative ai state when localStorage variable is set and user is logged in", () => {
    const activeSearchState = {
      ...defaultSearchState,
    };

    localStorage.setItem(
      "ai",
      JSON.stringify({ enabled: "true", expires: 9733324925021 }),
    );

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

    localStorage.setItem("ai", JSON.stringify({ enabled: "false" }));

    render(
      withUserProvider(
        withSearchProvider(<GenerativeAIToggle />, defaultSearchState),
      ),
    );

    await user.click(screen.getByRole("checkbox"));

    const ai = JSON.parse(String(localStorage.getItem("ai")));
    expect(ai?.enabled).toEqual("true");
    expect(typeof ai?.expires).toEqual("number");
    expect(ai?.expires).toBeGreaterThan(Date.now());
  });
});
