import {
  defaultUser,
  withSearchProvider,
  withUserProvider,
} from "./GenerativeAIToggle.test";
import { render, screen } from "@testing-library/react";

import GenerativeAIToggle from "./GenerativeAIToggle";
import React from "react";
import userEvent from "@testing-library/user-event";

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

    const generativeAIDialog = screen.getByText(
      "You must be logged in with a Northwestern NetID to use the Generative AI search feature."
    );
    const cancelButton = screen.getByText("Cancel");

    expect(generativeAIDialog).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    user.click(cancelButton);

    expect;
  });

  it("renders a toggled generative ai state when a query param is set", () => {});
});
