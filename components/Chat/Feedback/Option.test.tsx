// test ChatFeedbackOption.tsx

import { render, screen } from "@testing-library/react";

import ChatFeedbackOption from "@/components/Chat/Feedback/Option";

describe("ChatFeedbackOption", () => {
  it("renders a checkbox input", () => {
    render(<ChatFeedbackOption name="test" label="This is a test." />);
    const checkbox = screen.getByTestId("chat-feedback-option-test");
    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(checkbox).toHaveAttribute("tabindex", "0");
    expect(checkbox).toBeInTheDocument();
  });

  it("renders a label", () => {
    render(<ChatFeedbackOption name="test" label="This is a test." />);
    const label = screen.getByText(/this is a test/i);
    expect(label).toBeInTheDocument();
  });
});
