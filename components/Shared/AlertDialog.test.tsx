import { render, screen } from "@testing-library/react";

import React from "react";
import SharedAlertDialog from "./AlertDialog";

const defaultProps = {
  action: { label: "Login", onClick: jest.fn() },
  cancel: { label: "Cancel", onClick: jest.fn() },
  isOpen: true,
  title: "Title",
};

describe("SharedAlertDialog", () => {
  it("renders the primary components", () => {
    render(<SharedAlertDialog {...defaultProps}>Content</SharedAlertDialog>);

    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent(defaultProps.title);
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("calls the cancel and action callback functions", () => {
    render(<SharedAlertDialog {...defaultProps}>Content</SharedAlertDialog>);

    screen.getByRole("button", { name: "Cancel" }).click();
    expect(defaultProps.cancel.onClick).toHaveBeenCalled();

    screen.getByRole("button", { name: "Login" }).click();
    expect(defaultProps.action.onClick).toHaveBeenCalled();
  });
});
