import { render, screen } from "@/test-utils";
import { FacetOption } from "@/types/components/facets";
import Option from "./Option";
import React from "react";
import { mockAggregation } from "@/mocks/aggregation";

const mockOption: FacetOption = {
  bucket: mockAggregation.subject.buckets[0],
  facet: "subject",
  index: 0,
};

describe("Facet Option UI component", () => {
  it("Renders a facet option as a checkbox.", () => {
    render(<Option {...mockOption} />);
    const option = screen.getByRole(`checkbox`);
    expect(option).toBeInTheDocument();
  });

  it("Renders a facet option with correct name and id.", () => {
    render(<Option {...mockOption} />);
    const option = screen.getByRole(`checkbox`);
    expect(option.getAttribute("id")).toBe(`${mockOption.facet}-0`);
  });

  it("Renders a facet option with correct label.", () => {
    render(<Option {...mockOption} />);
    const label = screen.getByText(`Bar`);
    expect(label).toBeInTheDocument();
  });

  it("Renders a facet option with document count.", () => {
    render(<Option {...mockOption} />);
    const count = screen.getByText(`(2)`);
    expect(count).toBeInTheDocument();
  });
});
