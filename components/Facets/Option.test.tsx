import { render, screen } from "@/test-utils";
import { FacetOption } from "@/types/components/facets";
import Option from "./Option";
import React from "react";
import { mockAggregation } from "@/mocks/aggregation";

const mockOption: FacetOption = {
  bucket: mockAggregation.buckets[0],
  facet: mockAggregation.id,
  index: 0,
  type: "checkbox",
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
    expect(option.getAttribute("id")).toBe("foo-0");
  });

  it("Renders a facet option with correct label.", () => {
    render(<Option {...mockOption} />);
    const label = screen.getByLabelText(`Bar`);
    expect(label).toBeInTheDocument();
  });

  it("Renders a facet option with document count.", () => {
    render(<Option {...mockOption} />);
    const count = screen.getByText(`2`);
    expect(count).toBeInTheDocument();
  });
});
