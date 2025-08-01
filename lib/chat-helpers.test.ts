import { createResultsMessageFromContext } from "@/lib/chat-helpers";

describe("createResultsMessageFromContext", () => {
  it("should create a results message with facets and query", () => {
    const context = {
      query: "test query",
      facets: [
        { field: "author", value: "John Doe" },
        { field: "year", value: "2021" },
      ],
      works: [],
    };

    const result = createResultsMessageFromContext(context);
    expect(result).toBe(
      "Results for <strong>“test query”</strong> filtered by <em>author</em> for <strong>John Doe</strong>, <em>year</em> for <strong>2021</strong>",
    );
  });

  it("should create a results message without facets", () => {
    const context = {
      query: "dogs",
      facets: [],
      works: [],
    };

    const result = createResultsMessageFromContext(context);
    expect(result).toBe("Results for <strong>“dogs”</strong>");
  });

  it("should return just the results text if no context is provided", () => {
    const result = createResultsMessageFromContext(undefined);
    expect(result).toBe("Results");
  });

  it("should return just the results text with counts if totalResults is provided", () => {
    const context = {
      query: "dogs",
      facets: [],
      works: [],
    };
    const totalResults = 100;

    const result = createResultsMessageFromContext(context, totalResults);
    expect(result).toBe("100 results for <strong>“dogs”</strong>");
  });
});
