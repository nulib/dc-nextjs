import { DC_URL } from "./endpoints";
import { HeroCollection } from "./homepage";

/* eslint sort-keys: 0 */

export const pageNotFoundCollection: HeroCollection = {
  "@context": "http://iiif.io/api/presentation/3/context.json",
  id: "https://devbox.library.northwestern.edu:3000/homepage-hero.json",
  type: "Collection",
  label: {
    none: ["Page Not Found"],
  },
  items: [
    {
      id: "https://api.dc.library.northwestern.edu/api/v2/works/f880a614-6e75-4cd0-9af6-8b86af34f370?as=iiif",
      type: "Collection",
      label: { none: ["Page Not Found"] },
      summary: {
        none: [
          "Sorry, the page you are looking for does not exist here. Please try again.",
        ],
      },
      thumbnail: [
        {
          id: `/full/3000,/0/default.jpg`,
          type: "Image",
          format: "image/jpeg",
          service: [
            {
              id: "https://iiif.dc.library.northwestern.edu/iiif/2/2b1e0758-122f-4f45-b37b-393f2ab0427e",
              profile: "http://iiif.io/api/image/2/level2.json",
              type: "ImageService2",
            },
          ],
          width: 1650,
          height: 1309,
        },
      ],
      homepage: [
        {
          id: `${DC_URL}`,
          type: "Text",
        },
      ],
      seeAlso: [
        {
          id: `${DC_URL}`,
          type: "Text",
          label: { none: ["To Homepage"] },
        },
        {
          id: `${DC_URL}/search`,
          type: "Text",
          label: { none: ["Search Works"] },
        },
      ],
      nul_hero_region: "350,200,5000,4000",
    },
  ],
};
