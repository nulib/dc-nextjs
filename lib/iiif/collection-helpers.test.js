import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { getRelatedCollections } from "@/lib/iiif/collection-helpers";
import { sampleWork2 } from "@/mocks/sample-work2";

describe("Function to generate IIIF collection URIs", () => {
  it("successfully builds an array of IIIF collection endpoints", () => {
    const related = getRelatedCollections(sampleWork2);
    expect(related[0]).toBe(
      `${DC_API_SEARCH_URL}?query=collection.title.keyword:"Jim Roberts Photographs, 1968-1972" AND NOT id:"c16029ff-d027-496a-98b7-6f259395a8f7"&collectionLabel=Jim Roberts Photographs, 1968-1972&collectionSummary=Collection&as=iiif`
    );
    expect(related).toEqual(
      expect.arrayContaining([
        `${DC_API_SEARCH_URL}?query=workType.label.keyword:\"Image\" AND NOT id:\"c16029ff-d027-496a-98b7-6f259395a8f7\"&collectionLabel=Image&collectionSummary=Work Type&as=iiif`,
      ])
    );
    expect(related.length).toBe(4);
  });
});
