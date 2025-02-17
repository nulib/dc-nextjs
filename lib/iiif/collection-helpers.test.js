import { DCAPI_ENDPOINT, DC_API_SEARCH_URL } from "@/lib/constants/endpoints";

import { getRelatedCollections } from "@/lib/iiif/collection-helpers";
import { sampleWork2 } from "@/mocks/sample-work2";

describe("Function to generate IIIF collection URIs", () => {
  it("successfully builds an array of IIIF collection endpoints", () => {
    const related = getRelatedCollections(sampleWork2);
    expect(related[0]).toBe(
      `${DCAPI_ENDPOINT}/works/c16029ff-d027-496a-98b7-6f259395a8f8/similar?collectionLabel=More Like This&collectionSummary=Similar to Hawking dental products in outdoor market, Cuernavaca, Mexico&as=iiif`,
    );
    expect(related[1]).toBe(
      `${DC_API_SEARCH_URL}?query=collection.title.keyword:"Jim Roberts Photographs, 1968-1972"&collectionLabel=Jim Roberts Photographs, 1968-1972&collectionSummary=Collection&as=iiif`,
    );
    expect(related.length).toBe(5);
  });
});
