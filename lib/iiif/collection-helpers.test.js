import { getRelatedCollections } from "@/lib/iiif/collection-helpers";
import { sampleWork1 } from "@/mocks/sample-work1";

describe("Function to generate IIIF collection URIs", () => {
  it("successfully builds an array of IIIF collection endpoints", () => {
    const related = getRelatedCollections(sampleWork1);
    expect(related[0]).toBe(
      `https://po7domtjl7iairyivuzuzpysrm0lcphj.lambda-url.us-east-1.on.aws/?query=collection.title.keyword:"Jim Roberts Photographs, 1968-1972" AND NOT id:"c16029ff-d027-496a-98b7-6f259395a8f7"&collectionLabel=Jim Roberts Photographs, 1968-1972&collectionSummary=Collection`
    );
    expect(related).toEqual(
      expect.arrayContaining([
        `https://po7domtjl7iairyivuzuzpysrm0lcphj.lambda-url.us-east-1.on.aws/?query=workType.label.keyword:\"Image\" AND NOT id:\"c16029ff-d027-496a-98b7-6f259395a8f7\"&collectionLabel=Image&collectionSummary=Work Type`,
      ])
    );
    expect(related.length).toBe(5);
  });
});
