import { render, screen, within } from "@/test-utils";
import GenericFacet from "./GenericFacet";
import React from "react";
import { mockAggregation } from "@/mocks/aggregation";

const filterProps = {
  filterValue: "",
  setAggsFilterValue: jest.fn(),
};

describe("GenericFacet UI component", () => {
  it("Renders a multi-select facet component.", () => {
    render(<GenericFacet {...filterProps} {...mockAggregation} />);
    const facet = screen.getByTestId(`facet-multi-component`);
    expect(facet).toBeInTheDocument();
  });

  it("Renders the facet heading.", () => {
    render(<GenericFacet {...filterProps} {...mockAggregation} />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("foo");
  });

  it("Renders the find input.", () => {
    render(<GenericFacet {...filterProps} {...mockAggregation} />);
    const find = screen.getByTestId(`facet-find`);
    const textInput = within(find).getByRole("textbox");
    expect(find).toBeInTheDocument();
    expect(textInput).toHaveAttribute("placeholder");
    expect(textInput.getAttribute("placeholder")).toBe("Find foo");
    expect(textInput).toHaveAttribute("aria-label");
    expect(textInput.getAttribute("aria-label")).toBe("Find foo");
  });

  it("Renders facet options as checkboxes.", () => {
    render(<GenericFacet {...filterProps} {...mockAggregation} />);
    const options = screen.getByTestId(`facet-options`);
    expect(options).toBeInTheDocument();
  });
});
