/* eslint sort-keys: 0 */

import {
  IIIFExternalWebResource,
  InternationalString,
} from "@iiif/presentation-3";

export interface HeroCollectionHomepage {
  id: string;
  type: "Text";
  format: string;
  label: InternationalString;
}

export interface HeroCollectionItem {
  id: string;
  type: "Collection" | "Manifest";
  label: InternationalString;
  summary: InternationalString;
  thumbnail: IIIFExternalWebResource[];
  homepage: HeroCollectionHomepage[];
  nul_hero_region?: string;
}

export interface HeroCollection {
  "@context": "http://iiif.io/api/presentation/3/context.json";
  id: string;
  type: "Collection";
  label: InternationalString;
  items: HeroCollectionItem[];
}

export const heroCollection: HeroCollection = {
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
          id: "https://dc.library.northwestern.edu/items/7298fdce-adc1-4501-9e14-9e8bd985e149",
          type: "Text",
          label: { none: ["Pantalone classico"] },
          format: "text/html",
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
          id: "https://dc.library.northwestern.edu/items/7298fdce-adc1-4501-9e14-9e8bd985e149",
          type: "Text",
          label: { none: ["Pantalone classico"] },
          format: "text/html",
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
          id: "https://dc.library.northwestern.edu/items/7298fdce-adc1-4501-9e14-9e8bd985e149",
          type: "Text",
          label: { none: ["Pantalone classico"] },
          format: "text/html",
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
          id: "https://dc.library.northwestern.edu/items/052bb6f0-b6f5-4590-951b-ffdf49ffaf03",
          type: "Text",
          label: { none: ['Pulcinella "Stronzo" o "Arcigno"'] },
          format: "text/html",
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
          id: "https://dc.library.northwestern.edu/items/7298fdce-adc1-4501-9e14-9e8bd985e149",
          type: "Text",
          label: { none: ["Pantalone classico"] },
          format: "text/html",
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
          id: "https://dc.library.northwestern.edu/items/052bb6f0-b6f5-4590-951b-ffdf49ffaf03",
          type: "Text",
          label: { none: ['Pulcinella "Stronzo" o "Arcigno"'] },
          format: "text/html",
        },
      ],
      nul_hero_region: "100,450,1600,1200",
    },
  ],
};
