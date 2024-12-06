import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { URLSearchParams } from "url";
import { iiifSearchUri } from "@/lib/dc-api";

describe("iiifSearchUri", () => {
  it("returns the expected uri", () => {
    const query = { q: "Joan Baez" };
    const uri = new URL(iiifSearchUri(query));
    const params = new URLSearchParams(uri.search);

    // check that the URI has the expected origin and path
    expect(DC_API_SEARCH_URL).toContain(uri.origin);
    expect(DC_API_SEARCH_URL).toContain(uri.pathname);

    // check that the query string has the expected params
    expect(params.get("query")).toEqual("Joan Baez");
    expect(params.get("as")).toEqual("iiif");
  });

  it("returns the expected uri with a custom size", () => {
    const query = { q: "John Fahey" };
    const uri = new URL(iiifSearchUri(query, 100));
    const params = new URLSearchParams(uri.search);

    // check that the size param is set to 100
    expect(params.get("query")).toEqual("John Fahey");
    expect(params.get("as")).toEqual("iiif");
    expect(params.get("size")).toEqual("100");
  });

  it("returns the expected uri with appended facets as params", () => {
    const query = {
      q: "Muddy Waters",
      workType: "Image",
      genre: "photographs",
    };
    const uri = new URL(iiifSearchUri(query));
    const params = new URLSearchParams(uri.search);

    // check that the facets are appended as params
    expect(params.get("query")).toEqual("Muddy Waters");
    expect(params.get("as")).toEqual("iiif");
    expect(params.get("workType")).toEqual("Image");
    expect(params.get("genre")).toEqual("photographs");
  });
});
