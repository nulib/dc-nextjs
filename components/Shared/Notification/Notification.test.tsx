import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Notification } from "./Notification";

describe("Notification", () => {
  it("forwards its status semantics, attributes, and ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Notification ref={ref} tone="warning" role="status" className="caller">
        Check access
      </Notification>,
    );
    const notification = screen.getByRole("status");
    expect(ref.current).toBe(notification);
    expect(notification).toHaveTextContent("Check access");
    expect(notification).toHaveClass("caller");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("dismisses without submitting an enclosing form", () => {
    const submit = jest.fn((event) => event.preventDefault());
    render(
      <form onSubmit={submit}>
        <Notification dismissible>Saved</Notification>
      </form>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
    expect(submit).not.toHaveBeenCalled();
  });
});
