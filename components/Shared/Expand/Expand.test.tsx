import { fireEvent, render, screen } from "@/test-utils";
import Expand from "@/components/Shared/Expand/Expand";

describe("Expand component", () => {
  it("renders a wrapping Expand component with prescribed props", async () => {
    render(
      <Expand buttonText="Expand something" initialHeight={350}>
        <div>Some content</div>
      </Expand>
    );

    const expand = screen.getByTestId("expand");
    const button = screen.getByRole("button");

    expect(expand).toBeInTheDocument;
    expect(expand).toContainHTML("<div>Some content</div>");
    expect(expand.getAttribute("style")).toBe("max-height: 350px;");

    expect(button).toHaveTextContent("Expand something");

    /**
     * expect the max-height to adjust on button click
     */
    fireEvent.click(button);
    expect(expand.getAttribute("style")).toBe("max-height: 0px;");
  });

  it("renders a wrapping Expand component with default prop values", () => {
    render(
      <Expand>
        <div>Other content</div>
      </Expand>
    );
    const expand = screen.getByTestId("expand");
    const button = screen.getByRole("button");

    expect(expand).toBeInTheDocument;
    expect(expand).toContainHTML("<div>Other content</div>");
    expect(expand.getAttribute("style")).toBe("max-height: 500px;");

    expect(button).toHaveTextContent("Show More");
  });
});
