/* eslint sort-keys: 0 */

import {
  IIIFExternalWebResource,
  InternationalString,
} from "@iiif/presentation-3";
import { DC_URL } from "./endpoints";

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
      id: "https://iiif.dc.library.northwestern.edu/public/72/98/fd/ce/-a/dc/1-/45/01/-9/e1/4-/9e/8b/d9/85/e1/49-manifest.json",
      type: "Collection",
      label: { none: ["Edward S. Curtis's The North American Indian"] },
      summary: {
        none: ["Crossing the Pend d'Oreille - Kalispel"],
      },
      thumbnail: [
        {
          id: `https://iiif.dc.library.northwestern.edu/iiif/2/440bcf10-a7ee-4824-a1fb-e505cad222df/210,210,2650,1720/1536,/0/default.jpg`,
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.dc.library.northwestern.edu/iiif/2/440bcf10-a7ee-4824-a1fb-e505cad222df",
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
      id: "https://iiif.dc.library.northwestern.edu/public/72/98/fd/ce/-a/dc/1-/45/01/-9/e1/4-/9e/8b/d9/85/e1/49-manifest2.json",
      type: "Collection",
      label: { none: ["Berkeley Folk Music Festival"] },
      summary: {
        none: ["Joan Baez"],
      },
      thumbnail: [
        {
          id: "https://iiif.dc.library.northwestern.edu/iiif/2/6877a6d9-1580-421d-ba51-e44b97f746a2/full/2000,/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.dc.library.northwestern.edu/iiif/2/6877a6d9-1580-421d-ba51-e44b97f746a2",
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
      id: "https://iiif.dc.library.northwestern.edu/public/72/98/fd/ce/-a/dc/1-/45/01/-9/e1/4-/9e/8b/d9/85/e1/49-manifest3.json",
      type: "Collection",
      label: {
        none: ["Athletic Department Football Films"],
      },
      summary: {
        none: ["Northwestern vs. California (Rose Bowl), 1949"],
      },
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
      id: "https://iiif.dc.library.northwestern.edu/public/05/2b/b6/f0/-b/6f/5-/45/90/-9/51/b-/ff/df/49/ff/af/03-manifest.json",
      type: "Collection",
      label: { none: ["Commedia dell'Arte: The Masks of Antonio Fava"] },
      summary: { none: ['Pulcinella "Stronzo" o "Arcigno"'] },
      thumbnail: [
        {
          id: "https://iiif.dc.library.northwestern.edu/iiif/2/0d3531f0-2d7f-4e53-bb07-8019f94e44da/full/1600,/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.dc.library.northwestern.edu/iiif/2/0d3531f0-2d7f-4e53-bb07-8019f94e44da",
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
      id: "https://iiif.dc.library.northwestern.edu/public/72/98/fd/ce/-a/dc/1-/45/01/-9/e1/4-/9e/8b/d9/85/e1/49-manifest4.json",
      type: "Collection",
      label: { none: ["Jim Roberts Photographs"] },
      summary: {
        none: ["Psychedelic Coke-bottle glasses"],
      },
      thumbnail: [
        {
          id: "https://iiif.dc.library.northwestern.edu/iiif/2/175c24b7-a5b7-4dfc-b01e-92bb075e360c/full/1496,/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.dc.library.northwestern.edu/iiif/2/175c24b7-a5b7-4dfc-b01e-92bb075e360c",
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
      id: "https://iiif.dc.library.northwestern.edu/public/05/2b/b6/f0/-b/6f/5-/45/90/-9/51/b-/ff/df/49/ff/af/03-manifest2.json",
      type: "Collection",
      label: { none: ["World War II Poster Collection"] },
      summary: { none: ["A careless word-- a needless sinking"] },
      thumbnail: [
        {
          id: "https://iiif.dc.library.northwestern.edu/iiif/2/b725ab5e-8bc1-4bcc-9f9c-7c90db4e7e69/100,450,1600,1200/800,/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.dc.library.northwestern.edu/iiif/2/b725ab5e-8bc1-4bcc-9f9c-7c90db4e7e69",
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
    {
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/0ba3a256-4952-44ea-b0d9-0772835ff137?as=iiif",
      type: "Collection",
      label: { none: ["Ronald J. Sullivan Photograph Collection"] },
      summary: {
        none: ["4603/74, Brickyard"],
      },
      thumbnail: [
        {
          id: "https://iiif-test.rdc-staging.library.northwestern.edu/iiif/2/37a27b1d-ea5a-4bbe-b38a-fcd2f5904f25/750,950,1600,1200/800,/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.dc.library.northwestern.edu/iiif/2/37a27b1d-ea5a-4bbe-b38a-fcd2f5904f25",
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
          id: `${DC_URL}/collections/0ba3a256-4952-44ea-b0d9-0772835ff137`,
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
      id: "https://iiif.dc.library.northwestern.edu/iiif/2/999a8522-aa7a-4c49-a4a1-25165be91b05/full/461,/0/default.jpg",
      type: "Image",
      format: "image/jpeg",
      service: [
        {
          id: "https://iiif.dc.library.northwestern.edu/iiif/2/092b31cb-810a-4ab8-8d65-7cf9a61ca2fe",
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
      id: "https://iiif.dc.library.northwestern.edu/iiif/2/acdaef88-f938-4b9c-b388-4748b85d8150//full/384,/0/default.jpg",
      type: "Image",
      format: "image/jpeg",
      service: [
        {
          id: "https://iiif.dc.library.northwestern.edu/iiif/2/acdaef88-f938-4b9c-b388-4748b85d8150",
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
      id: "https://iiif.dc.library.northwestern.edu/iiif/2/999a8522-aa7a-4c49-a4a1-25165be91b05/full/618,/0/default.jpg",
      type: "Image",
      format: "image/jpeg",
      service: [
        {
          id: "https://iiif.dc.library.northwestern.edu/iiif/2/999a8522-aa7a-4c49-a4a1-25165be91b05",
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
      id: "https://iiif.dc.library.northwestern.edu/iiif/2/70b391d0-51ef-429d-9c3c-3488e7a331fd/full/384,/0/default.jpg",
      type: "Image",
      format: "image/jpeg",
      service: [
        {
          id: "https://iiif.dc.library.northwestern.edu/iiif/2/70b391d0-51ef-429d-9c3c-3488e7a331fd",
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
      id: "https://iiif.dc.library.northwestern.edu/iiif/2/83aa87d5-0e0a-4733-9133-a53fb00c3b5a/full/446,/0/default.jpg",
      type: "Image",
      format: "image/jpeg",
      service: [
        {
          id: "https://iiif.dc.library.northwestern.edu/iiif/2/83aa87d5-0e0a-4733-9133-a53fb00c3b5a",
          profile: "http://iiif.io/api/image/2/level2.json",
          type: "ImageService2",
        },
      ],
      width: 446,
      height: 365,
    },
  ],
];

export const featuredCollections = [
  "d3a8e587-cc58-4cb0-aea2-65465d42ec3e",
  "ecacd539-fe38-40ec-bbc0-590acee3d4f2",
  "4ed2338d-c715-4a86-8ac6-6b4030a42be5",
  "3121f8ee-5265-4b19-bae3-59f96e9ac01a",
  "8eb442ee-c545-430b-a489-53befaafa9b7",
];
