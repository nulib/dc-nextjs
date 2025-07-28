import * as facetFns from "./facet";

describe("buildFacetFilters fn()", () => {
  it("returns an empty array if no url facets exist", () => {
    const result = facetFns.buildFacetFilters({});
    expect(result).toEqual([]);
  });

  it("returns an empty array if somehow bad data (which isnt a facet)  gets passed in", () => {
    const result = facetFns.buildFacetFilters({ foo: ["bar"] });
    expect(result).toEqual([]);
  });

  it("handles single facet values", () => {
    const result = facetFns.buildFacetFilters({ subject: ["bar"] });
    expect(result).toMatchObject([
      {
        term: {
          "subject.label": "bar",
        },
      },
    ]);
  });

  it("handles facet multiple values", () => {
    const result = facetFns.buildFacetFilters({ subject: ["bar", "baz"] });
    expect(result).toMatchObject([
      {
        term: {
          "subject.label": "bar",
        },
      },
      {
        term: {
          "subject.label": "baz",
        },
      },
    ]);
  });

  it("handles multiple facets multiple values", () => {
    const result = facetFns.buildFacetFilters({
      genre: ["ima genre"],
      subject: ["bar", "baz"],
    });
    expect(result).toMatchObject([
      {
        term: {
          "genre.label": "ima genre",
        },
      },
      {
        term: {
          "subject.label": "bar",
        },
      },
      {
        term: {
          "subject.label": "baz",
        },
      },
    ]);
  });
});

describe("getFacetIdByField fn()", () => {
  it("returns null if no facet is found", () => {
    const result = facetFns.getFacetIdByField("foo");
    expect(result).toBeNull();
  });

  it("returns the correct facet ID for subject.label", () => {
    const result = facetFns.getFacetIdByField("subject.label");
    expect(result).toEqual("subject");
  });

  it("returns the correct facet ID for creator.label", () => {
    const result = facetFns.getFacetIdByField("creator.label");
    expect(result).toEqual("creator");
  });

  it("returns the correct facet ID for collection.title.keyword", () => {
    const result = facetFns.getFacetIdByField("collection.title.keyword");
    expect(result).toEqual("collection");
  });
});
