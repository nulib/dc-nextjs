/* eslint sort-keys: 0 */

import { Manifest } from "@iiif/presentation-3";
import { Work } from "@nulib/dcapi-types";

export const mockPrivateUnpublishedWorkManifest: Manifest = {
  "@context": "http://iiif.io/api/presentation/3/context.json",
  id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5?as=iiif",
  type: "Manifest",
  label: {
    none: ["Adam Test Work"],
  },
  metadata: [
    {
      label: {
        none: ["Alternate Title"],
      },
      value: {
        none: ["asdf"],
      },
    },
    {
      label: {
        none: ["Abstract"],
      },
      value: {
        none: ["asdf"],
      },
    },
    {
      label: {
        none: ["Caption"],
      },
      value: {
        none: ["sdfg"],
      },
    },
    {
      label: {
        none: ["Contributor"],
      },
      value: {
        none: ["Academic theses (Actor)"],
      },
    },
    {
      label: {
        none: ["Creator"],
      },
      value: {
        none: ["Ghana"],
      },
    },
    {
      label: {
        none: ["Cultural Context"],
      },
      value: {
        none: ["sdfg"],
      },
    },
    {
      label: {
        none: ["Department"],
      },
      value: {
        none: ["Faculty Collections"],
      },
    },
    {
      label: {
        none: ["Dimensions"],
      },
      value: {
        none: ["asdf"],
      },
    },
    {
      label: {
        none: ["Genre"],
      },
      value: {
        none: ["Academic theses"],
      },
    },
    {
      label: {
        none: ["Last Modified"],
      },
      value: {
        none: ["2023-04-19T18:54:44.764526Z"],
      },
    },
    {
      label: {
        none: ["Language"],
      },
      value: {
        none: ["Cheng (Chinese philosophy)"],
      },
    },
    {
      label: {
        none: ["Location"],
      },
      value: {
        none: ["Academic theses"],
      },
    },
    {
      label: {
        none: ["Materials"],
      },
      value: {
        none: ["asdf"],
      },
    },
    {
      label: {
        none: ["Notes"],
      },
      value: {
        none: ["dfgh (Awards)"],
      },
    },
    {
      label: {
        none: ["Provenance"],
      },
      value: {
        none: ["asdf"],
      },
    },
    {
      label: {
        none: ["Publisher"],
      },
      value: {
        none: ["asdf"],
      },
    },
    {
      label: {
        none: ["Related Material"],
      },
      value: {
        none: ["asdf"],
      },
    },
    {
      label: {
        none: ["Related URL"],
      },
      value: {
        none: [
          "<span><a href=https://adam.dev.rdc.library.northwestern.edu:3001/search>Finding Aid</a></span>",
        ],
      },
    },
    {
      label: {
        none: ["Rights Holder"],
      },
      value: {
        none: ["asdf"],
      },
    },
    {
      label: {
        none: ["Rights Statement"],
      },
      value: {
        none: ["In Copyright"],
      },
    },
    {
      label: {
        none: ["Scope and Contents"],
      },
      value: {
        none: ["asdf"],
      },
    },
    {
      label: {
        none: ["Series"],
      },
      value: {
        none: ["asdf"],
      },
    },
    {
      label: {
        none: ["Source"],
      },
      value: {
        none: ["asdf"],
      },
    },
    {
      label: {
        none: ["Style Period"],
      },
      value: {
        none: ["Academic theses"],
      },
    },
    {
      label: {
        none: ["Subject"],
      },
      value: {
        none: ["Bible. Gospels"],
      },
    },
    {
      label: {
        none: ["Table of Contents"],
      },
      value: {
        none: ["hsdfg"],
      },
    },
    {
      label: {
        none: ["Technique"],
      },
      value: {
        none: ["Simenon, Georges, 1903-1989"],
      },
    },
  ],
  summary: {
    none: ["ima description"],
  },
  requiredStatement: {
    label: {
      none: ["Attribution"],
    },
    value: {
      none: ["Courtesy of Northwestern University Libraries", "asdf"],
    },
  },
  rights: "http://rightsstatements.org/vocab/InC/1.0/",
  thumbnail: [
    {
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5/thumbnail",
      type: "Image",
      format: "image/jpeg",
      height: 300,
      width: 300,
    },
  ],
  seeAlso: [
    {
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5",
      type: "Dataset",
      format: "application/json",
      // @ts-ignore
      label: {
        none: ["Northwestern University Libraries Digital Collections API"],
      },
    },
  ],
  homepage: [
    {
      id: "https://dc.rdc-staging.library.northwestern.edu/items/e676c8cb-fee4-4c10-8a69-53506a714bd5",
      type: "Text",
      format: "text/html",
      // @ts-ignore
      label: {
        none: [
          "Homepage at Northwestern University Libraries Digital Collections",
        ],
      },
    },
  ],
  partOf: [
    {
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/ecacd539-fe38-40ec-bbc0-590acee3d4f2?as=iiif",
      type: "Collection",
      label: {
        none: ["Africa Embraces Obama"],
      },
      summary: {
        none: ["Africa Embraces Obama"],
      },
    },
  ],
  items: [
    {
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5?as=iiif/canvas/access/0",
      type: "Canvas",
      height: 1308,
      width: 2400,
      label: {
        none: ["Midnight"],
      },
      thumbnail: [
        {
          id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/62adb94b-36d9-4f6f-bd18-ae4e7f3e7ba0/full/!300,300/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          height: 300,
          width: 300,
          service: [
            // @ts-ignore
            {
              "@id":
                "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/62adb94b-36d9-4f6f-bd18-ae4e7f3e7ba0",
              "@type": "ImageService2",
              profile: "http://iiif.io/api/image/2/level2.json",
            },
          ],
        },
      ],
      items: [
        {
          id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5?as=iiif/canvas/access/0/annotation-page",
          type: "AnnotationPage",
          items: [
            {
              id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5?as=iiif/canvas/access/0/annotation/0",
              type: "Annotation",
              motivation: "painting",
              target:
                "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5?as=iiif/canvas/access/0",
              // @ts-ignore
              body: {
                id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/62adb94b-36d9-4f6f-bd18-ae4e7f3e7ba0/full/600,/0/default.jpg",
                type: "Image",
                format: "image/jpeg",
                height: 1308,
                width: 2400,
                service: [
                  {
                    "@id":
                      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/62adb94b-36d9-4f6f-bd18-ae4e7f3e7ba0",
                    "@type": "ImageService2",
                    profile: "http://iiif.io/api/image/2/level2.json",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5?as=iiif/canvas/access/1",
      type: "Canvas",
      height: 1538,
      width: 1538,
      label: {
        none: ["Album"],
      },
      thumbnail: [
        {
          id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/592022f6-3dc1-4f17-a412-42c025ceae93/full/!300,300/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          height: 300,
          width: 300,
          service: [
            // @ts-ignore
            {
              "@id":
                "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/592022f6-3dc1-4f17-a412-42c025ceae93",
              "@type": "ImageService2",
              profile: "http://iiif.io/api/image/2/level2.json",
            },
          ],
        },
      ],
      items: [
        {
          id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5?as=iiif/canvas/access/1/annotation-page",
          type: "AnnotationPage",
          items: [
            {
              id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5?as=iiif/canvas/access/1/annotation/0",
              type: "Annotation",
              motivation: "painting",
              target:
                "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5?as=iiif/canvas/access/1",
              // @ts-ignore
              body: {
                id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/592022f6-3dc1-4f17-a412-42c025ceae93/full/600,/0/default.jpg",
                type: "Image",
                format: "image/png",
                height: 1538,
                width: 1538,
                service: [
                  {
                    "@id":
                      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/592022f6-3dc1-4f17-a412-42c025ceae93",
                    "@type": "ImageService2",
                    profile: "http://iiif.io/api/image/2/level2.json",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};

export const mockPrivateUnpublishedWork: Work = {
  contributor: [
    {
      facet: "http://id.worldcat.org/fast/1726453|act|Academic theses (Actor)",
      id: "http://id.worldcat.org/fast/1726453",
      label: "Academic theses",
      label_with_role: "Academic theses (Actor)",
      role: "Actor",
      variants: [],
    },
  ],
  //   related_material: ["asdf"],
  api_model: "Work",
  genre: [
    {
      facet: "http://id.worldcat.org/fast/1726453||Academic theses",
      id: "http://id.worldcat.org/fast/1726453",
      label: "Academic theses",
      variants: [],
    },
  ],
  subject: [
    {
      facet:
        "http://id.worldcat.org/fast/1808065|GEOGRAPHICAL|Bible. Gospels (Geographical)",
      id: "http://id.worldcat.org/fast/1808065",
      label: "Bible. Gospels",
      label_with_role: "Bible. Gospels (Geographical)",
      role: "Geographical",
      variants: [],
    },
  ],
  work_type: "Image",
  technique: [
    {
      facet: "http://id.worldcat.org/fast/35242||Simenon, Georges, 1903-1989",
      id: "http://id.worldcat.org/fast/35242",
      label: "Simenon, Georges, 1903-1989",
      variants: [],
    },
  ],
  folder_number: ["asdf"],
  box_number: ["asdf"],
  file_sets: [
    {
      accession_number: "asdfsdfgh",
      description: "asdf asdf",
      duration: null,
      height: 1308,
      id: "62adb94b-36d9-4f6f-bd18-ae4e7f3e7ba0",
      label: "Midnight",
      mime_type: "image/jpeg",
      original_filename: "alexandru-vicol-D9FQYwAclwQ-unsplash.jpeg",
      poster_offset: null,
      rank: 1073741824,
      representative_image_url:
        "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/62adb94b-36d9-4f6f-bd18-ae4e7f3e7ba0",
      role: "Access",
      streaming_url: null,
      webvtt: null,
      width: 2400,
    },
    {
      accession_number: "bbkkasdf",
      description: "asdfasdf asdfasdf",
      duration: null,
      height: 1538,
      id: "592022f6-3dc1-4f17-a412-42c025ceae93",
      label: "Album",
      mime_type: "image/png",
      original_filename: "cover-mock1.png",
      poster_offset: null,
      rank: 1610612736,
      representative_image_url:
        "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/592022f6-3dc1-4f17-a412-42c025ceae93",
      role: "Access",
      streaming_url: null,
      webvtt: null,
      width: 1538,
    },
  ],
  related_url: [
    {
      label: "Finding Aid",
      url: "https://adam.dev.rdc.library.northwestern.edu:3001/search",
    },
  ],
  date_created: [],
  physical_description_material: ["asdf"],
  license: {
    id: "http://www.europeana.eu/portal/rights/rr-r.html",
    label: "All rights reserved",
  },
  ingest_project: null,
  visibility: "Private",
  representative_file_set: {
    aspect_ratio: 1.83486,
    id: "62adb94b-36d9-4f6f-bd18-ae4e7f3e7ba0",
    url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/62adb94b-36d9-4f6f-bd18-ae4e7f3e7ba0",
  },
  project: {
    cycle: "asdf",
    desc: null,
    manager: "asdf",
    name: "sdfg",
    proposer: "asdf",
    task_number: "asdf",
  },
  published: false,
  language: [
    {
      facet:
        "http://id.loc.gov/authorities/subjects/sh85023051||Cheng (Chinese philosophy)",
      id: "http://id.loc.gov/authorities/subjects/sh85023051",
      label: "Cheng (Chinese philosophy)",
      variants: ["Chʻeng"],
    },
  ],
  // @ts-ignore
  canonical_link:
    "https://dc.rdc-staging.library.northwestern.edu/items/e676c8cb-fee4-4c10-8a69-53506a714bd5",
  publisher: ["asdf"],
  batch_ids: [],
  box_name: ["asdf"],
  catalog_key: ["asdf"],
  preservation_level: "Level 1",
  provenance: ["asdf"],
  title: "Adam Test Work",
  abstract: ["asdf"],
  table_of_contents: ["hsdfg"],
  alternate_title: ["asdf"],
  scope_and_contents: ["asdf"],
  create_date: "2022-11-16T21:26:14.389256Z",
  cultural_context: ["sdfg"],
  location: [
    {
      facet: "http://id.worldcat.org/fast/1726453||Academic theses",
      id: "http://id.worldcat.org/fast/1726453",
      label: "Academic theses",
      variants: [],
    },
  ],
  physical_description_size: ["asdf"],
  legacy_identifier: ["asdf"],
  rights_holder: ["asdf"],
  keywords: ["sdf"],
  modified_date: "2023-04-19T18:54:44.764526Z",
  series: ["asdf"],
  source: ["asdf"],
  collection: {
    description: "Africa Embraces Obama",
    id: "ecacd539-fe38-40ec-bbc0-590acee3d4f2",
    title: "Africa Embraces Obama",
  },
  thumbnail:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5/thumbnail",
  caption: ["sdfg"],
  indexed_at: "2023-04-19T18:55:37.522732",
  rights_statement: {
    id: "http://rightsstatements.org/vocab/InC/1.0/",
    label: "In Copyright",
  },
  csv_metadata_update_jobs: ["6d7e9d86-4922-407e-9ffb-d7888d7c8b76"],
  id: "e676c8cb-fee4-4c10-8a69-53506a714bd5",
  identifier: ["asdf"],
  ingest_sheet: null,
  ark: "ark:/99999/fk4835cg70",
  iiif_manifest:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5?as=iiif",
  status: "In Progress",
  library_unit: "Faculty Collections",
  notes: [
    {
      note: "dfgh",
      type: "Awards",
    },
  ],
  style_period: [
    {
      facet: "http://id.worldcat.org/fast/1726453||Academic theses",
      id: "http://id.worldcat.org/fast/1726453",
      label: "Academic theses",
      variants: [],
    },
  ],
  api_link:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/e676c8cb-fee4-4c10-8a69-53506a714bd5",
  description: ["ima description"],
  folder_name: ["asdf"],
  accession_number: "aa3452345234",
  creator: [
    {
      facet: "http://id.worldcat.org/fast/1208741||Ghana",
      id: "http://id.worldcat.org/fast/1208741",
      label: "Ghana",
      variants: [],
    },
  ],
  terms_of_use: "asdf",
};
