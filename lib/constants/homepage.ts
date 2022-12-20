/* eslint sort-keys: 0 */

import {
  IIIFExternalWebResource,
  InternationalString,
} from "@iiif/presentation-3";
import { DC_URL } from "./endpoints";
import { SearchShape } from "@/types/api/response";

export interface HeroCollectionWebResource {
  id: string;
  type: "Text";
  format?: string;
  label?: InternationalString;
}

export interface HeroCollectionItem {
  id: string;
  type: "Collection" | "Manifest";
  label: InternationalString;
  summary?: InternationalString;
  thumbnail: IIIFExternalWebResource[];
  homepage: HeroCollectionWebResource[];
  seeAlso?: HeroCollectionWebResource[];
  nul_hero_region?: string;
}

export interface HeroCollection {
  "@context": "http://iiif.io/api/presentation/3/context.json";
  id: string;
  type: "Collection";
  label: InternationalString;
  items: HeroCollectionItem[];
}

export const defaultCollection: HeroCollection = {
  "@context": "http://iiif.io/api/presentation/3/context.json",
  id: "https://devbox.library.northwestern.edu:3000/homepage-hero.json",
  type: "Collection",
  label: {
    none: ["Commedia dell'Arte: The Masks of Antonio Fava"],
  },
  items: [
    {
      id: "https://iiif.stack.rdc.library.northwestern.edu/public/72/98/fd/ce/-a/dc/1-/45/01/-9/e1/4-/9e/8b/d9/85/e1/49-manifest.json",
      type: "Collection",
      label: { none: ["Edward S. Curtis's The North American Indian"] },
      summary: {
        none: ["Crossing the Pend d'Oreille - Kalispel"],
      },
      thumbnail: [
        {
          id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/440bcf10-a7ee-4824-a1fb-e505cad222df/210,210,2650,1720/1536,/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/440bcf10-a7ee-4824-a1fb-e505cad222df",
              profile: "http://iiif.io/api/image/2/level2.json",
              type: "ImageService2",
            },
          ],
          width: 1496,
          height: 995,
        },
      ],
      homepage: [
        {
          id: `${DC_URL}/collections/55ff2504-dd53-4943-b2cb-aeea46e77bc3`,
          type: "Text",
        },
      ],
      nul_hero_region: "210,210,2650,1720",
    },
    {
      id: "https://iiif.stack.rdc.library.northwestern.edu/public/72/98/fd/ce/-a/dc/1-/45/01/-9/e1/4-/9e/8b/d9/85/e1/49-manifest.json",
      type: "Collection",
      label: { none: ["Berkeley Folk Music Festival"] },
      summary: {
        none: ["Joan Baez"],
      },
      thumbnail: [
        {
          id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/6877a6d9-1580-421d-ba51-e44b97f746a2/full/2000,/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/6877a6d9-1580-421d-ba51-e44b97f746a2",
              profile: "http://iiif.io/api/image/2/level2.json",
              type: "ImageService2",
            },
          ],
          width: 1496,
          height: 995,
        },
      ],
      homepage: [
        {
          id: `${DC_URL}/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7`,
          type: "Text",
        },
      ],
    },
    {
      id: "https://iiif.stack.rdc.library.northwestern.edu/public/72/98/fd/ce/-a/dc/1-/45/01/-9/e1/4-/9e/8b/d9/85/e1/49-manifest.json",
      type: "Collection",
      label: {
        none: ["Athletic Department Football Films"],
      },
      summary: { none: ["Northwestern vs. California (Rose Bowl), 1949"] },
      thumbnail: [
        {
          duration: 30,
          format: "video/mp4",
          height: 480,
          id: "https://meadow-streaming.rdc.library.northwestern.edu/31/ea/94/58/-6/f1/4-/45/48/-9/30/b-/62/c3/db/19/2e/b6/1949_NU-Rosebowl-vs-Cal.m3u8#t=500,530",
          type: "Video",
          width: 630,
        },
      ],
      homepage: [
        {
          id: `${DC_URL}/collections/8cdf83c9-3831-4211-acd7-122bca9b89da`,
          type: "Text",
        },
      ],
    },
    {
      id: "https://iiif.stack.rdc.library.northwestern.edu/public/05/2b/b6/f0/-b/6f/5-/45/90/-9/51/b-/ff/df/49/ff/af/03-manifest.json",
      type: "Collection",
      label: { none: ["Commedia dell'Arte: The Masks of Antonio Fava"] },
      summary: { none: ['Pulcinella "Stronzo" o "Arcigno"'] },
      thumbnail: [
        {
          id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/0d3531f0-2d7f-4e53-bb07-8019f94e44da/full/1600,/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/0d3531f0-2d7f-4e53-bb07-8019f94e44da",
              profile: "http://iiif.io/api/image/2/level2.json",
              type: "ImageService2",
            },
          ],
          width: 1600,
          height: 1200,
        },
      ],
      homepage: [
        {
          id: `${DC_URL}/collections/c373ecd2-2c45-45f2-9f9e-52dc244870bd`,
          type: "Text",
        },
      ],
    },
    {
      id: "https://iiif.stack.rdc.library.northwestern.edu/public/72/98/fd/ce/-a/dc/1-/45/01/-9/e1/4-/9e/8b/d9/85/e1/49-manifest.json",
      type: "Collection",
      label: { none: ["Jim Roberts Photographs"] },
      summary: {
        none: ["Psychedelic Coke-bottle glasses"],
      },
      thumbnail: [
        {
          id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/175c24b7-a5b7-4dfc-b01e-92bb075e360c/full/1496,/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/175c24b7-a5b7-4dfc-b01e-92bb075e360c",
              profile: "http://iiif.io/api/image/2/level2.json",
              type: "ImageService2",
            },
          ],
          width: 1496,
          height: 995,
        },
      ],
      homepage: [
        {
          id: `${DC_URL}/collections/51d4475f-5a0a-42a4-8901-bde73a1fae99`,
          type: "Text",
        },
      ],
    },
    {
      id: "https://iiif.stack.rdc.library.northwestern.edu/public/05/2b/b6/f0/-b/6f/5-/45/90/-9/51/b-/ff/df/49/ff/af/03-manifest.json",
      type: "Collection",
      label: { none: ["World War II Poster Collection"] },
      summary: { none: ["A careless word-- a needless sinking"] },
      thumbnail: [
        {
          id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/b725ab5e-8bc1-4bcc-9f9c-7c90db4e7e69/100,450,1600,1200/800,/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/b725ab5e-8bc1-4bcc-9f9c-7c90db4e7e69",
              profile: "http://iiif.io/api/image/2/level2.json",
              type: "ImageService2",
            },
          ],
          width: 1600,
          height: 1200,
        },
      ],
      homepage: [
        {
          id: `${DC_URL}/collections/faf4f60e-78e0-4fbf-96ce-4ca8b4df597a`,
          type: "Text",
        },
      ],
      nul_hero_region: "100,450,1600,1200",
    },
  ],
};

export const overviewThumbnails: Array<IIIFExternalWebResource[]> = [
  [
    {
      id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/999a8522-aa7a-4c49-a4a1-25165be91b05/full/461,/0/default.jpg",
      type: "Image",
      format: "image/jpeg",
      service: [
        {
          id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/092b31cb-810a-4ab8-8d65-7cf9a61ca2fe",
          profile: "http://iiif.io/api/image/2/level2.json",
          type: "ImageService2",
        },
      ],
      width: 461,
      height: 641,
    },
  ],
  [
    {
      id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/acdaef88-f938-4b9c-b388-4748b85d8150//full/384,/0/default.jpg",
      type: "Image",
      format: "image/jpeg",
      service: [
        {
          id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/acdaef88-f938-4b9c-b388-4748b85d8150",
          profile: "http://iiif.io/api/image/2/level2.json",
          type: "ImageService2",
        },
      ],
      width: 494,
      height: 744,
    },
  ],
  [
    {
      id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/999a8522-aa7a-4c49-a4a1-25165be91b05/full/618,/0/default.jpg",
      type: "Image",
      format: "image/jpeg",
      service: [
        {
          id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/999a8522-aa7a-4c49-a4a1-25165be91b05",
          profile: "http://iiif.io/api/image/2/level2.json",
          type: "ImageService2",
        },
      ],
      width: 618,
      height: 382,
    },
  ],
  [
    {
      id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/70b391d0-51ef-429d-9c3c-3488e7a331fd/full/384,/0/default.jpg",
      type: "Image",
      format: "image/jpeg",
      service: [
        {
          id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/70b391d0-51ef-429d-9c3c-3488e7a331fd",
          profile: "http://iiif.io/api/image/2/level2.json",
          type: "ImageService2",
        },
      ],
      width: 384,
      height: 307,
    },
  ],
  [
    {
      duration: 15,
      format: "video/mp4",
      id: "https://meadow-streaming.rdc.library.northwestern.edu/3e/e5/e3/bb/-a/c7/b-/46/0f/-9/d1/3-/af/a4/bc/c6/54/1f/74-110-1.m3u8#t=152,167",
      type: "Video",
      width: 382,
      height: 382,
    },
  ],
  [
    {
      id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/83aa87d5-0e0a-4733-9133-a53fb00c3b5a/full/446,/0/default.jpg",
      type: "Image",
      format: "image/jpeg",
      service: [
        {
          id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/83aa87d5-0e0a-4733-9133-a53fb00c3b5a",
          profile: "http://iiif.io/api/image/2/level2.json",
          type: "ImageService2",
        },
      ],
      width: 446,
      height: 365,
    },
  ],
];

export const collectionData: SearchShape[] = [
  {
    api_model: "Collection",
    representative_file_set: {
      aspect_ratio: 1.618,
      id: "ad43c4c9-835f-461b-bae4-92eb62ced935",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/ca25ed3d-0d1b-41a4-95b3-c3a5790eb0a7",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7?as=iiif",
    work_type: "Image",
    id: "18ec4c6b-192a-4ab8-9903-ea0f393c35f7",
    title: "Berkeley Folk Music Festival",
  },
  {
    api_model: "Collection",
    representative_file_set: {
      aspect_ratio: 1.618,
      id: "ad43c4c9-835f-461b-bae4-92eb62ced935",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/ca25ed3d-0d1b-41a4-95b3-c3a5790eb0a7",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7?as=iiif",
    work_type: "Image",
    id: "18ec4c6b-192a-4ab8-9903-ea0f393c35f7",
    title: "Commedia dell'Arte: The Masks of Antonio Fava",
  },
  {
    api_model: "Collection",
    representative_file_set: {
      aspect_ratio: 1.618,
      id: "ad43c4c9-835f-461b-bae4-92eb62ced935",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/ca25ed3d-0d1b-41a4-95b3-c3a5790eb0a7",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7?as=iiif",
    work_type: "Image",
    id: "18ec4c6b-192a-4ab8-9903-ea0f393c35f7",
    title: "Jim Roberts Photographs, 1968-1972",
  },
  {
    api_model: "Collection",
    representative_file_set: {
      aspect_ratio: 1.618,
      id: "ad43c4c9-835f-461b-bae4-92eb62ced935",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/ca25ed3d-0d1b-41a4-95b3-c3a5790eb0a7",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7?as=iiif",
    work_type: "Image",
    id: "18ec4c6b-192a-4ab8-9903-ea0f393c35f7",
    title: "Pat Patrick Collection of Sun Ra Materials",
  },
  {
    api_model: "Collection",
    representative_file_set: {
      aspect_ratio: 1.618,
      id: "ad43c4c9-835f-461b-bae4-92eb62ced935",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/ca25ed3d-0d1b-41a4-95b3-c3a5790eb0a7",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7?as=iiif",
    work_type: "Image",
    id: "18ec4c6b-192a-4ab8-9903-ea0f393c35f7",
    title: "Records of the Bursar’s Office Takeover, May 1968",
  },
];

export const worksData: SearchShape[] = [
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.013,
      id: "435693a1-3969-42f0-a757-ec98c0042c4f",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/435693a1-3969-42f0-a757-ec98c0042c4f",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8e2d6bc5-3f00-45d1-880b-a458cddf0c1c/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8e2d6bc5-3f00-45d1-880b-a458cddf0c1c?as=iiif",
    work_type: "Image",
    id: "8e2d6bc5-3f00-45d1-880b-a458cddf0c1c",
    title: "Kathy, Carol, and Charles",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 0.6791,
      id: "97a8bea4-74d9-4227-91da-1b28f5207d83",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/97a8bea4-74d9-4227-91da-1b28f5207d83",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/419bd545-61ef-4532-90d3-623dd75d5e26/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/419bd545-61ef-4532-90d3-623dd75d5e26?as=iiif",
    work_type: "Image",
    id: "419bd545-61ef-4532-90d3-623dd75d5e26",
    title: "Jean Redpath",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.48565,
      id: "95b354c0-c03b-4e41-ab7f-429e654159fe",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/95b354c0-c03b-4e41-ab7f-429e654159fe",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/752cbc86-4b35-4a20-b06a-b87088c164cc/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/752cbc86-4b35-4a20-b06a-b87088c164cc?as=iiif",
    work_type: "Image",
    id: "752cbc86-4b35-4a20-b06a-b87088c164cc",
    title: "Sam Hinton, Richmond Festival of the Arts folk song concert",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.46623,
      id: "ac987e48-b6a5-4d34-b5e0-1d2006996a44",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/ac987e48-b6a5-4d34-b5e0-1d2006996a44",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8d710f86-ec54-43cf-9ec4-eb71b1c90c5d/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8d710f86-ec54-43cf-9ec4-eb71b1c90c5d?as=iiif",
    work_type: "Image",
    id: "8d710f86-ec54-43cf-9ec4-eb71b1c90c5d",
    title: "Mimi Farina",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.4691,
      id: "3dff9186-99a8-4836-9a08-9e1db0fede05",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/3dff9186-99a8-4836-9a08-9e1db0fede05",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/4389ed19-c21a-4670-88d8-8ed91972d98f/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/4389ed19-c21a-4670-88d8-8ed91972d98f?as=iiif",
    work_type: "Image",
    id: "4389ed19-c21a-4670-88d8-8ed91972d98f",
    title: "Kathy and Carol",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 0.67815,
      id: "66e2843d-5159-4948-b38b-4bac496562db",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/66e2843d-5159-4948-b38b-4bac496562db",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e804de37-f7d3-437d-ab17-5b535c6650ab/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e804de37-f7d3-437d-ab17-5b535c6650ab?as=iiif",
    work_type: "Image",
    id: "e804de37-f7d3-437d-ab17-5b535c6650ab",
    title: "Sam Hinton, UCLA Folk Festival",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.48565,
      id: "37d8b390-525d-4258-849e-009cddba33be",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/37d8b390-525d-4258-849e-009cddba33be",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/3244e1cb-de4b-4be3-a739-b3dd8f6c2a49/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/3244e1cb-de4b-4be3-a739-b3dd8f6c2a49?as=iiif",
    work_type: "Image",
    id: "3244e1cb-de4b-4be3-a739-b3dd8f6c2a49",
    title: "Clouds",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1,
      id: "2f409aa7-394d-479d-9520-d3ff5469cbda",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/2f409aa7-394d-479d-9520-d3ff5469cbda",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/75abc5d6-150a-47b6-bafc-d1e5761f9aea/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/75abc5d6-150a-47b6-bafc-d1e5761f9aea?as=iiif",
    work_type: "Image",
    id: "75abc5d6-150a-47b6-bafc-d1e5761f9aea",
    title: "Cleanliness and Godliness Skiffle Band",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1,
      id: "7cb8eeb2-875b-4c8c-80b5-bed21344a3d0",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/7cb8eeb2-875b-4c8c-80b5-bed21344a3d0",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/ce5c6267-6a76-4219-9920-d8932c76a6b7/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/ce5c6267-6a76-4219-9920-d8932c76a6b7?as=iiif",
    work_type: "Image",
    id: "ce5c6267-6a76-4219-9920-d8932c76a6b7",
    title: "Country Joe and the Fish",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.47622,
      id: "ac6a0450-509f-4b43-be7a-3c149de08f0a",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/ac6a0450-509f-4b43-be7a-3c149de08f0a",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/4003fe46-bc6a-40b2-acef-37f01ca3cead/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/4003fe46-bc6a-40b2-acef-37f01ca3cead?as=iiif",
    work_type: "Image",
    id: "4003fe46-bc6a-40b2-acef-37f01ca3cead",
    title: "Hedy West",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.48565,
      id: "73fad1b2-2858-4eea-80d6-4ccb3f42ad3b",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/73fad1b2-2858-4eea-80d6-4ccb3f42ad3b",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/450ef3a0-91df-4595-b548-febcb7abc504/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/450ef3a0-91df-4595-b548-febcb7abc504?as=iiif",
    work_type: "Image",
    id: "450ef3a0-91df-4595-b548-febcb7abc504",
    title: "Dev Singh, KPFA session",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.4691,
      id: "46ebd0cf-2cfa-441f-a1dc-2a0e0137d0a8",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/46ebd0cf-2cfa-441f-a1dc-2a0e0137d0a8",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/4370c384-e5f6-4a2a-b2ef-9f6eff1e72fe/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/4370c384-e5f6-4a2a-b2ef-9f6eff1e72fe?as=iiif",
    work_type: "Image",
    id: "4370c384-e5f6-4a2a-b2ef-9f6eff1e72fe",
    title: "Jefferson Airplane",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.47119,
      id: "c175a31d-691e-487f-aecc-5560ae5cb0e9",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/c175a31d-691e-487f-aecc-5560ae5cb0e9",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/21173d9d-1a41-4219-b053-b3e87a10497a/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/21173d9d-1a41-4219-b053-b3e87a10497a?as=iiif",
    work_type: "Image",
    id: "21173d9d-1a41-4219-b053-b3e87a10497a",
    title: "Guitar player at Northgate folk session",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.4828,
      id: "55c4ff8f-f3fe-46b5-a023-b78d919958de",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/55c4ff8f-f3fe-46b5-a023-b78d919958de",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/25014240-8cda-4bd1-8203-380bd195de38/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/25014240-8cda-4bd1-8203-380bd195de38?as=iiif",
    work_type: "Image",
    id: "25014240-8cda-4bd1-8203-380bd195de38",
    title: "J.E. Mainer's Mountaineers",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.48565,
      id: "450dc666-7258-4404-8860-f8e73c5690dd",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/450dc666-7258-4404-8860-f8e73c5690dd",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/ba34b5ed-80ac-4da5-85c9-61bd7c00d086/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/ba34b5ed-80ac-4da5-85c9-61bd7c00d086?as=iiif",
    work_type: "Image",
    id: "ba34b5ed-80ac-4da5-85c9-61bd7c00d086",
    title: "Ian and Sylvia, San Francisco State Folk Festival",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.47191,
      id: "205ca8c0-a1f1-4f3e-bc57-e10b969a8f16",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/205ca8c0-a1f1-4f3e-bc57-e10b969a8f16",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/c8b6cfcb-4a0f-458c-a02e-415f92d5da74/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/c8b6cfcb-4a0f-458c-a02e-415f92d5da74?as=iiif",
    work_type: "Image",
    id: "c8b6cfcb-4a0f-458c-a02e-415f92d5da74",
    title: "Ef and Slim Critchlow",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.48565,
      id: "af963349-1720-4672-8118-c22aa1b91353",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/af963349-1720-4672-8118-c22aa1b91353",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/9dee2bcc-f9df-4f04-b257-35630f2c2524/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/9dee2bcc-f9df-4f04-b257-35630f2c2524?as=iiif",
    work_type: "Image",
    id: "9dee2bcc-f9df-4f04-b257-35630f2c2524",
    title: "Doc Hopkins, UCLA Folk Festival",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.49036,
      id: "2436e13d-9c9a-4b78-9f6d-ab208ee2dd6b",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/2436e13d-9c9a-4b78-9f6d-ab208ee2dd6b",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/aa974591-d540-43a5-aff4-b8a1ff4e9c40/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/aa974591-d540-43a5-aff4-b8a1ff4e9c40?as=iiif",
    work_type: "Image",
    id: "aa974591-d540-43a5-aff4-b8a1ff4e9c40",
    title: "Altamont Festival - changed",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.48565,
      id: "7749c107-b483-4a73-9054-b1ed9f77d365",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/7749c107-b483-4a73-9054-b1ed9f77d365",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/6c95528b-b9b8-4e67-ac1c-344236d881e6/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/6c95528b-b9b8-4e67-ac1c-344236d881e6?as=iiif",
    work_type: "Image",
    id: "6c95528b-b9b8-4e67-ac1c-344236d881e6",
    title: "Jimmie Driftwood, San Francisco State Folk Festival",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.48565,
      id: "b92874a0-72b7-4479-979e-38860c412a13",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/b92874a0-72b7-4479-979e-38860c412a13",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/370f880c-9083-4d9b-9129-45a924522d11/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/370f880c-9083-4d9b-9129-45a924522d11?as=iiif",
    work_type: "Image",
    id: "370f880c-9083-4d9b-9129-45a924522d11",
    title:
      "Andrews Gospel Singers, Richmond Festival of the Arts folk song concert",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.03624,
      id: "9fec1fbd-6cb7-4fe1-946c-307fd60d93e0",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/9fec1fbd-6cb7-4fe1-946c-307fd60d93e0",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/ef26fea0-7469-411c-afe6-0afeb29f2688/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/ef26fea0-7469-411c-afe6-0afeb29f2688?as=iiif",
    work_type: "Image",
    id: "ef26fea0-7469-411c-afe6-0afeb29f2688",
    title: "Sam Hinton",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.48565,
      id: "b774c330-55c3-4028-ad75-4d6a72e476cf",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/b774c330-55c3-4028-ad75-4d6a72e476cf",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/4da9477e-0ca3-4021-ab96-80f6115965b2/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/4da9477e-0ca3-4021-ab96-80f6115965b2?as=iiif",
    work_type: "Image",
    id: "4da9477e-0ca3-4021-ab96-80f6115965b2",
    title: "Unexposed frame",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1,
      id: "ad9b41df-3c46-4b2b-9970-300dd4d3e5ce",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/ad9b41df-3c46-4b2b-9970-300dd4d3e5ce",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/a7dc2090-8bf3-4f4a-8fe4-c7c3c305429f/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/a7dc2090-8bf3-4f4a-8fe4-c7c3c305429f?as=iiif",
    work_type: "Image",
    id: "a7dc2090-8bf3-4f4a-8fe4-c7c3c305429f",
    title: "Robin Goodfellow",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 0.68095,
      id: "64a135a9-a730-435f-92d5-f02051ff03ad",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/64a135a9-a730-435f-92d5-f02051ff03ad",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/6b8ab27e-fd68-455d-96e8-18913c8a2ae8/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/6b8ab27e-fd68-455d-96e8-18913c8a2ae8?as=iiif",
    work_type: "Image",
    id: "6b8ab27e-fd68-455d-96e8-18913c8a2ae8",
    title: "David and Tina Meltzer note",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.4691,
      id: "4d0e065d-5dec-459f-8860-eee57f5f8d0d",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/4d0e065d-5dec-459f-8860-eee57f5f8d0d",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/4a7bb427-7f68-43a9-bb1f-221a6f593a87/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/4a7bb427-7f68-43a9-bb1f-221a6f593a87?as=iiif",
    work_type: "Image",
    id: "4a7bb427-7f68-43a9-bb1f-221a6f593a87",
    title: "Vera Johnson",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.48565,
      id: "a0124b65-c0aa-4818-ad7c-e7f17c7f4e31",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/a0124b65-c0aa-4818-ad7c-e7f17c7f4e31",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e2255168-057a-4b51-96f4-e2f0e6ea2f68/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e2255168-057a-4b51-96f4-e2f0e6ea2f68?as=iiif",
    work_type: "Image",
    id: "e2255168-057a-4b51-96f4-e2f0e6ea2f68",
    title: "Country Joe and the Fish, Monterey Pop Festival",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.46277,
      id: "4c55e7bb-a1e7-4fc3-9f39-4aaaabf85f8d",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/4c55e7bb-a1e7-4fc3-9f39-4aaaabf85f8d",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/9d520cea-fbcb-4f11-818b-cb15442166bb/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/9d520cea-fbcb-4f11-818b-cb15442166bb?as=iiif",
    work_type: "Image",
    id: "9d520cea-fbcb-4f11-818b-cb15442166bb",
    title: "Hedy West",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.46623,
      id: "3a98a7dc-3c30-441d-aad8-b73332307177",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/3a98a7dc-3c30-441d-aad8-b73332307177",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/f77fe8dd-f0fd-4bc1-bfce-bc30fedc5c02/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/f77fe8dd-f0fd-4bc1-bfce-bc30fedc5c02?as=iiif",
    work_type: "Image",
    id: "f77fe8dd-f0fd-4bc1-bfce-bc30fedc5c02",
    title: "Bob Dylan, KQED press conference",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.47191,
      id: "cbb22dec-0926-4ac3-8298-b9c33b25cca6",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/cbb22dec-0926-4ac3-8298-b9c33b25cca6",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/37914c51-d0a4-4e3d-aa17-e06a3b2f2b13/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/37914c51-d0a4-4e3d-aa17-e06a3b2f2b13?as=iiif",
    work_type: "Image",
    id: "37914c51-d0a4-4e3d-aa17-e06a3b2f2b13",
    title: "Joan Baez",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.47163,
      id: "42188e26-269f-483d-b7c1-aa6af5455b12",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/42188e26-269f-483d-b7c1-aa6af5455b12",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/ae38b26c-69ac-4c84-87d4-d698ffcbae6e/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/ae38b26c-69ac-4c84-87d4-d698ffcbae6e?as=iiif",
    work_type: "Image",
    id: "ae38b26c-69ac-4c84-87d4-d698ffcbae6e",
    title: "Paul Arnoldi",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.47253,
      id: "8289008b-9d7c-44c3-b72a-c1fb7767afd4",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/8289008b-9d7c-44c3-b72a-c1fb7767afd4",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/840bb441-dbd7-44b2-b474-bc985ccf45d8/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/840bb441-dbd7-44b2-b474-bc985ccf45d8?as=iiif",
    work_type: "Image",
    id: "840bb441-dbd7-44b2-b474-bc985ccf45d8",
    title: "Jean Redpath",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.48565,
      id: "ca25ed3d-0d1b-41a4-95b3-c3a5790eb0a7",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/ca25ed3d-0d1b-41a4-95b3-c3a5790eb0a7",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/ad43c4c9-835f-461b-bae4-92eb62ced935/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/ad43c4c9-835f-461b-bae4-92eb62ced935?as=iiif",
    work_type: "Image",
    id: "ad43c4c9-835f-461b-bae4-92eb62ced935",
    title: "Blues Project, San Francisco State Folk Festival",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.49635,
      id: "9acdc67b-718b-4415-8a33-720bd06bbebc",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/9acdc67b-718b-4415-8a33-720bd06bbebc",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/d82850a5-735e-4431-bdb2-70aade159c68/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/d82850a5-735e-4431-bdb2-70aade159c68?as=iiif",
    work_type: "Image",
    id: "d82850a5-735e-4431-bdb2-70aade159c68",
    title: "Guy Carawan, Asti Folk Music Festival",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 1.48565,
      id: "67ed3dee-5488-4489-8ef0-6898d43ee872",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/67ed3dee-5488-4489-8ef0-6898d43ee872",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/fb0edcb1-ef25-4760-b9ae-00a92b3981df/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/fb0edcb1-ef25-4760-b9ae-00a92b3981df?as=iiif",
    work_type: "Image",
    id: "fb0edcb1-ef25-4760-b9ae-00a92b3981df",
    title:
      "Jimmie Driftwood, Herb Pedersen, and Bookmiller Shannon, UCLA Folk Festival",
  },
  {
    api_model: "Work",
    representative_file_set: {
      aspect_ratio: 0.9631,
      id: "f60061bd-fafe-49be-a9cd-8a83df6e7d73",
      url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/f60061bd-fafe-49be-a9cd-8a83df6e7d73",
    },
    thumbnail:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e7cf42de-ee57-49ea-bf95-aa855a3e7129/thumbnail",
    visibility: "Public",
    iiif_manifest:
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e7cf42de-ee57-49ea-bf95-aa855a3e7129?as=iiif",
    work_type: "Image",
    id: "e7cf42de-ee57-49ea-bf95-aa855a3e7129",
    title:
      "Sam Hinton and Alice Stuart, Folk Song Jamboree at Stern Grove, 1964",
  },
];
