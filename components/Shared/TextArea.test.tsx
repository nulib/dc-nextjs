import { render, screen } from "@testing-library/react";

import SharedTextArea from "./TextArea";
import userEvent from "@testing-library/user-event";

describe("SharedTextArea", () => {
  it("renders the textarea with respective element attributes", () => {
    render(
      <SharedTextArea
        placeholder="Enter text here"
        value="Test value"
        rows={5}
        cols={30}
        name="test"
        id="test"
      />,
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("placeholder", "Enter text here");
    expect(textarea).toHaveAttribute("rows", "5");
    expect(textarea).toHaveAttribute("cols", "30");
    expect(textarea).toHaveAttribute("name", "test");
    expect(textarea).toHaveAttribute("id", "test");
  });

  it("does not render the character length span if maxLength is undefined", async () => {
    render(<SharedTextArea />);
    expect(
      screen.queryByTestId("shared-textarea-character-count"),
    ).not.toBeInTheDocument();
  });

  it("renders limits the character length according maxLength attribute", async () => {
    render(<SharedTextArea maxLength={25} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("maxLength", "25");

    const user = userEvent.setup();

    // User begins typing...
    await user.type(textarea, "This is a test");
    await expect(textarea).toHaveValue("This is a test");
    await expect(
      screen.getByTestId("shared-textarea-character count"),
    ).toHaveTextContent("14/25 characters");

    // User continues typing...
    await user.type(textarea, " and this should be truncated.");
    await expect(textarea).toHaveValue("This is a test and this s");
    await expect(
      screen.getByTestId("shared-textarea-character count"),
    ).toHaveTextContent("25/25 characters");
  });
});
