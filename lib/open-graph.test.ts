import * as og from "@/lib/open-graph";

import { sampleWork1 } from "@/mocks/sample-work1";

describe("open-graph.ts helper file", () => {
  it("should return openGraphData for a Work", () => {
    const response = og.buildWorkOpenGraphData(sampleWork1);

    expect(response).toMatchObject({
      "og:description":
        "Ima description - The images on this web site are from material in the collections of the University Archives of Northwestern University Libraries, are provided for use by its students, faculty and staff, and by other researchers visiting this site, for research consultation and scholarly purposes only. Further distribution and/or any commercial use of the images from this site is not permitted.",
      "og:image":
        "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/93d75ffe-20d8-48ea-9206-8db9114f2731/full/1200,630/0/default.jpg",
      "og:image:secure_url":
        "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/93d75ffe-20d8-48ea-9206-8db9114f2731/full/1200,630/0/default.jpg",
      "og:title":
        "Hawking dental products in outdoor market, Cuernavaca, Mexico",
      "og:type": "website",
      "og:url":
        "https://digitalcollections.library.northwestern.edu/items/c16029ff-d027-496a-98b7-6f259395a8f7",
    });
  });
});
