import { fireEvent, render, screen } from "@/test-utils";
import Expand from "@/components/Shared/Expand/Expand";

describe("Expand component", () => {
  it("renders a wrapping Expand component with prescribed props", async () => {
    render(
      <Expand buttonText="Expand something" initialHeight={350}>
        <div>Some content</div>
      </Expand>,
    );

    const expand = screen.getByTestId("expand");
    const button = screen.getByRole("button");

    expect(expand).toBeInTheDocument();
    expect(expand).toContainHTML("<div>Some content</div>");
    expect(expand.style.getPropertyValue("--expand-height")).toBe("350px");
    Object.defineProperty(expand.firstElementChild, "offsetHeight", {
      value: 900,
    });

    expect(button).toHaveTextContent("Expand something");

    /**
     * expect the max-height to adjust on button click
     */
    fireEvent.click(button);
    expect(expand.style.getPropertyValue("--expand-height")).toBe("900px");
    expect(expand).toHaveAttribute("data-is-expanded", "true");
    expect(button).toBeDisabled();
  });

  it("renders a wrapping Expand component with default prop values", () => {
    render(
      <Expand>
        <div>Other content</div>
      </Expand>,
    );
    const expand = screen.getByTestId("expand");
    const button = screen.getByRole("button");

    expect(expand).toBeInTheDocument();
    expect(expand).toContainHTML("<div>Other content</div>");
    expect(expand.style.getPropertyValue("--expand-height")).toBe("500px");

    expect(button).toHaveTextContent("Show More");
  });
});
