import { render, screen } from "@testing-library/react";

import ResponseAggregations from "@/components/Chat/Response/Aggregations";

describe("ResponseAggregations", () => {
  test("renders the aggregation results", () => {
    const message = {
      buckets: [
        { key: "Berkeley, California", doc_count: 5 },
        { key: "Joan Baez", doc_count: 17 },
      ],
      doc_count_error_upper_bound: 0,
      sum_other_doc_count: 10,
    };

    // @ts-ignore
    render(<ResponseAggregations message={message} />);

    const interstitial = screen.getByTestId("response-aggregations");
    expect(interstitial).toBeInTheDocument();

    expect(interstitial).toHaveTextContent("Aggregation Results");

    // content displays the aggregation result message

    const results = screen.getByRole("table");
    expect(results).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(2);

    rows.forEach((row, index) => {
      expect(row.querySelector("td")).toHaveTextContent(
        ["Berkeley, California", "Joan Baez"][index],
      );
      expect(row.querySelector("td:last-child")).toHaveTextContent(
        ["5", "17"][index],
      );
    });
  });
});
