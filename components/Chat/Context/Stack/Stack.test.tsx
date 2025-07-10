import { fireEvent, render, screen } from "@testing-library/react";

import React from "react";
import Stack from "./Stack";
import { sampleWork1 } from "@/mocks/sample-work1";
import { sampleWork2 } from "@/mocks/sample-work2";

describe("Stack", () => {
  it("renders stack with no dismiss button", () => {
    const mockContext = {
      query: "Dogs",
      facets: { subject: ["Spaniel"] },
      works: [sampleWork1, sampleWork2],
    };
    render(<Stack context={mockContext} isDismissable={false} />);

    expect(screen.queryByTestId("stack-dismiss")).not.toBeInTheDocument();
  });

  it("dismisses the stack when dismiss button is clicked", () => {
    const mockContext = {
      query: "Dogs",
      facets: { subject: ["Spaniel"] },
      works: [sampleWork1, sampleWork2],
    };
    render(<Stack context={mockContext} isDismissable />);

    const stack = screen.getByTestId("stack");
    expect(stack).toHaveAttribute("data-isdismissed", "false");

    const dismissButton = screen.getByTestId("stack-dismiss");
    expect(dismissButton).toBeInTheDocument();

    fireEvent.click(dismissButton);

    expect(stack).toHaveAttribute("data-isdismissed", "true");
  });

  it("calls the dismissCallback when dismiss button is clicked", () => {
    const mockDismissCallback = jest.fn();
    const mockContext = {
      query: "Dogs",
      facets: { subject: ["Spaniel"] },
      works: [sampleWork1, sampleWork2],
    };

    render(
      <Stack
        context={mockContext}
        isDismissable
        dismissCallback={mockDismissCallback}
      />,
    );

    const dismissButton = screen.getByTestId("stack-dismiss");
    fireEvent.click(dismissButton);

    expect(mockDismissCallback).toHaveBeenCalledTimes(1);
  });
});
