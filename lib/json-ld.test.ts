import {
  loadCollectionStructuredData,
  loadDefaultStructuredData,
  loadItemStructuredData,
} from "@/lib/json-ld";

import { type Collection } from "dcapi-types";
import { sampleWork2 } from "@/mocks/sample-work2";


const collectionMock = {
  admin_email: null,
  api_link:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/bfeeb065-5b12-4b10-9883-f32b133c7cd1",
  api_model: "Collection",
  create_date: "2021-03-12T02:11:32.342977Z",
  description:
    "These images were from the Slide Library which was once in the Visual Media Center under the Department of Art History at Northwestern University.",
  featured: null,
  finding_aid_url: null,
  id: "bfeeb065-5b12-4b10-9883-f32b133c7cd1",
  indexed_at: "2022-10-03T23:44:19.807482",
  keywords: [],
  modified_date: "2022-02-24T23:51:16.111583Z",
  published: true,
  representative_image: {
    url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/1ceaa647-1b1b-4e9d-8e3f-2a1539af3410",
    work_id: "ff520ae7-1621-4b59-9da7-6cf10450b717",
  },
  thumbnail: "http://test.com",
  title: "Department of Art History || Slide Collection",
  visibility: "Institution",
};
const pathName = "/ima/path";

it("returns the expected default structured data ", () => {
  const obj = loadDefaultStructuredData();
  expect(Object.keys(obj).length).toBeGreaterThan(0);
  expect(obj["@type"]).toEqual("WebSite");
  expect(obj).toHaveProperty("@context");
  expect(obj).toHaveProperty("name");
  expect(obj).toHaveProperty("description");
  expect(obj).toHaveProperty("url");
});

describe("collection structured data", () => {
  it("returns the expected collection structured data ", () => {
    const obj = loadCollectionStructuredData(
      collectionMock as Collection,
      pathName
    );
    expect(obj["@type"]).toEqual("Collection");
    expect(obj).toHaveProperty("@context");
    expect(obj).toHaveProperty("name");
    expect(obj).toHaveProperty("description");
    expect(obj).toHaveProperty("url");
  });

  it("does not add empty values", () => {
    const anotherMock = { ...collectionMock };
    anotherMock.description = "";
    const obj = loadCollectionStructuredData(
      anotherMock as Collection,
      pathName
    );
    expect(obj).not.toHaveProperty("description");
  });
});

describe("work structured data", () => {
  it("returns the expected work structured data ", () => {
    const obj = loadItemStructuredData(sampleWork2, pathName);

    expect(obj["@type"]).toEqual("ImageObject");
    expect(obj).toHaveProperty("@context");
    expect(obj.about).toEqual(["Mexico--Cuernavaca", "Mexicans"]);
    expect(obj.contentLocation).toEqual("");
    expect(obj.contentUrl).toEqual(
      "https://iiif.stack.rdc-staging.library.northwestern.edu/public/c1/60/29/ff/-d/02/7-/49/6a/-9/8b/7-/6f/25/93/95/a8/f7-manifest.json"
    );
    expect(obj.contributor).toEqual('"Roberts, James S."');
    expect(obj.dateCreated).toEqual("2021-03-16T15:52:00.377715Z");
    expect(obj.description).toBeUndefined();
    expect(obj.genre![0]).toEqual("Ima Genre1");
    expect(obj.image).toEqual(
      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/93d75ffe-20d8-48ea-9206-8db9114f2731"
    );
    expect(obj.license).toEqual(
      "http://rightsstatements.org/vocab/InC-EDU/1.0/"
    );
    expect(obj.name).toEqual(
      "Hawking dental products in outdoor market, Cuernavaca, Mexico"
    );
    expect(obj.thumbnail).toEqual(
      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/93d75ffe-20d8-48ea-9206-8db9114f2731/full/!300,300/0/default.jpg"
    );
    expect(obj.url).toEqual(
      "https://digitalcollections.library.northwestern.edu/ima/path"
    );
  });
});
