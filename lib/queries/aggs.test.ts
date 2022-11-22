import * as aggs from "@/lib/queries/aggs";

describe("buildAggs function", () => {
  it("returns expected aggs with default values", () => {
    const facets = [
      {
        field: "genre.label",
        id: "genre",
        label: "Genre",
      },
    ];
    const facetFilterValue = "";
    const userFacets = {
      genre: ["paintings (visual works)"],
      subject: ["Painting", "19th century"],
    };

    const response = aggs.buildAggs(facets, facetFilterValue, userFacets);

    expect(response).toEqual({
      genre: {
        terms: {
          field: "genre.label",
          order: {
            _count: "desc",
          },
          size: 20,
        },
      },
      userFacets: {
        terms: {
          field: "genre.label",
          include: ["paintings (visual works)"],
          order: {
            _count: "desc",
          },
          size: 20,
        },
      },
    });
  });

  it("returns a case insensitive facet filter value by default on user filter text input", () => {
    const facets = [
      {
        field: "subject.label",
        id: "subject",
        label: "Subject",
      },
    ];
    const facetFilterValue = `Architec`;
    const userFacets = {};

    const response = aggs.buildAggs(facets, facetFilterValue, userFacets);
    expect(response).toEqual({
      subject: {
        terms: {
          field: "subject.label",
          include: ".*(A|a)(R|r)(C|c)(H|h)(I|i)(T|t)(E|e)(C|c).*",
          order: {
            _count: "desc",
          },
          size: 20,
        },
      },
    });
  });

  it("handles exact quote matching in facet filter text input", () => {
    const facets = [
      {
        field: "subject.label",
        id: "subject",
        label: "Subject",
      },
    ];
    const facetFilterValue = `"Art"`;
    const userFacets = {};

    const response = aggs.buildAggs(facets, facetFilterValue, userFacets);
    expect(response).toEqual({
      subject: {
        terms: {
          field: "subject.label",
          include: '.*"Art".*',
          order: {
            _count: "desc",
          },
          size: 20,
        },
      },
    });

    /** Handles case of only one quote entered */
    const singleQuoteResponse = aggs.buildAggs(facets, `"`, userFacets);
    expect(singleQuoteResponse).toEqual({
      subject: {
        terms: {
          field: "subject.label",
          include: " ",
          order: {
            _count: "desc",
          },
          size: 20,
        },
      },
    });
  });
});
