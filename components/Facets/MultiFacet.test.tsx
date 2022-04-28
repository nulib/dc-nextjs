import { render, screen, within } from "@testing-library/react";
import MultiFacet from "./MultiFacet";
import React from "react";
import { mockAggregation } from "@/mocks/aggregation";

describe("MultiFacet UI component", () => {
  it("Renders a multi-select facet component.", () => {
    render(<MultiFacet {...mockAggregation} />);
    const facet = screen.getByTestId(`facet-multi-component`);
    expect(facet).toBeInTheDocument();
  });

  it("Renders the facet heading.", () => {
    render(<MultiFacet {...mockAggregation} />);
    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("foo");
  });

  it("Renders the find input.", () => {
    render(<MultiFacet {...mockAggregation} />);
    const find = screen.getByTestId(`facet-find`);
    const textInput = within(find).getByRole("textbox");
    expect(find).toBeInTheDocument();
    expect(textInput).toHaveAttribute("placeholder");
    expect(textInput.getAttribute("placeholder")).toBe("Find foo");
    expect(textInput).toHaveAttribute("aria-label");
    expect(textInput.getAttribute("aria-label")).toBe("Find foo");
  });

  it("Renders facet options as checkboxes.", () => {
    render(<MultiFacet {...mockAggregation} />);
    const options = screen.getByTestId(`facet-options`);
    const checkboxes = within(options).getAllByRole("checkbox");
    expect(options).toBeInTheDocument();
    checkboxes.forEach((checkbox) => {
      expect(checkbox.getAttribute("name")).toBe("facet--foo");
    });
  });
});
