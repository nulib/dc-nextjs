import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("defaults actions to a non-submitting button and forwards attributes and refs", () => {
    const submit = jest.fn((event) => event.preventDefault());
    const click = jest.fn();
    const ref = createRef<HTMLButtonElement>();
    render(
      <form onSubmit={submit}>
        <Button
          ref={ref}
          onClick={click}
          className="caller"
          aria-label="Open details"
        >
          Details
        </Button>
        <Button type="submit">Submit</Button>
      </form>,
    );
    const action = screen.getByRole("button", { name: "Open details" });
    expect(ref.current).toBe(action);
    expect(action).toHaveClass("caller");
    fireEvent.click(action);
    expect(click).toHaveBeenCalledTimes(1);
    expect(submit).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(submit).toHaveBeenCalledTimes(1);
  });

  it("uses link semantics for navigation and prevents disabled navigation", () => {
    const click = jest.fn();
    const ref = createRef<HTMLAnchorElement>();
    const { rerender } = render(
      <Button ref={ref} href="/about" onClick={click}>
        About
      </Button>,
    );
    const link = screen.getByRole("link", { name: "About" });
    expect(ref.current).toBe(link);
    expect(link).toHaveAttribute("href", "/about");
    rerender(
      <Button ref={ref} href="/about" disabled onClick={click}>
        About
      </Button>,
    );
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
    fireEvent.click(link);
    expect(click).not.toHaveBeenCalled();
  });

  it("preserves native disabled action behavior", () => {
    const click = jest.fn();
    render(
      <Button disabled onClick={click}>
        Unavailable
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(click).not.toHaveBeenCalled();
  });
});
