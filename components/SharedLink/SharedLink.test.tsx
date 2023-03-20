import type {
  PreservationLevel,
  Status,
  Visibility,
  Work,
  WorkType,
} from "@nulib/dcapi-types";
import { render, screen } from "@/test-utils";

import { Manifest } from "@iiif/presentation-3";
import SharedLink from "./SharedLink";

describe("SharedLink component", () => {
  it("renders error announcment when no work or manifest passed in", () => {
    render(<SharedLink manifest={null} work={work} />);
    expect(screen.getByTestId("shared-link-wrapper"));
    expect(screen.getByTestId("error-announcement"));
  });

  it("renders regular shared links announcement when both a work and manifest are passed in", async () => {
    render(<SharedLink manifest={manifest} work={work} />);
    expect(screen.getByTestId("announcement"));
  });

  it("renders viewer wrapper and related collections slider", async () => {
    render(<SharedLink manifest={manifest} work={work} />);
    expect(screen.getByTestId("work-viewer-wrapper"));
    expect(screen.getByTestId("related-items"));
  });
});

/* eslint sort-keys: 0 */

const work: Work = {
  provenance: ["France ; Avignon"],
  thumbnail:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/263625cc-6fd7-47ae-a725-394a483d28d2/thumbnail",
  contributor: [],
  publisher: [],
  subject: [
    {
      facet:
        "info:nul/428b6673-f08d-4d29-8021-a4078a3b6849|TOPICAL|Castles (Topical)",
      id: "info:nul/428b6673-f08d-4d29-8021-a4078a3b6849",
      label: "Castles",
      label_with_role: "Castles (Topical)",
      role: "Topical",
      variants: [],
    },
    {
      facet:
        "info:nul/0a3a77ff-70f8-4cc1-9184-d5932ea9bbd7|TOPICAL|Courtyards (Topical)",
      id: "info:nul/0a3a77ff-70f8-4cc1-9184-d5932ea9bbd7",
      label: "Courtyards",
      label_with_role: "Courtyards (Topical)",
      role: "Topical",
      variants: [],
    },
    {
      facet:
        "info:nul/c6468035-54ec-4c70-a1b4-732e7da1d9b5|TOPICAL|Architecture--14th century--France (Topical)",
      id: "info:nul/c6468035-54ec-4c70-a1b4-732e7da1d9b5",
      label: "Architecture--14th century--France",
      label_with_role: "Architecture--14th century--France (Topical)",
      role: "Topical",
      variants: [],
    },
  ],
  scope_and_contents: [],
  notes: [
    {
      note: "massive add to all pages/check",
      type: "General Note",
    },
  ],
  accession_number: "Voyager:168504",
  create_date: "2021-03-15T17:54:56.302906Z",
  csv_metadata_update_jobs: [],
  series: [],
  api_model: "Work",
  id: "263625cc-6fd7-47ae-a725-394a483d28d2",
  collection: {
    description:
      "These images were from the Architecture files of the Slide Library which was once in the Visual Media Center under the Department of Art History at Northwestern University.",
    id: "c7f1196d-fcb0-4398-86c0-fa836dbd2880",
    title: "Department of Art History || Architecture Collection",
  },
  creator: [
    {
      facet:
        "info:nul/e1bb3881-564d-475b-b5ee-d1d2d2408a88||unknown French (French artist)",
      id: "info:nul/e1bb3881-564d-475b-b5ee-d1d2d2408a88",
      label: "unknown French (French artist)",
      variants: [],
    },
    {
      facet:
        "http://id.worldcat.org/fast/1717972||Schober, Franz von, 1796-1882",
      id: "http://id.worldcat.org/fast/1717972",
      label: "Schober, Franz von, 1796-1882",
      variants: [],
    },
  ],
  language: [],
  rights_holder: [],
  box_number: [],
  physical_description_size: [],
  description: [],
  keywords: [],
  indexed_at: "2022-11-03T15:36:58.665450",
  folder_name: [],
  abstract: [],
  genre: [
    {
      facet:
        "http://vocab.getty.edu/aat/300263552||architecture (object genre)",
      id: "http://vocab.getty.edu/aat/300263552",
      label: "architecture (object genre)",
      variants: [],
    },
    {
      facet: "http://vocab.getty.edu/aat/300054156||architecture (discipline)",
      id: "http://vocab.getty.edu/aat/300054156",
      label: "architecture (discipline)",
      variants: [],
    },
  ],
  date_created: ["1335 to 1364"],
  physical_description_material: [],
  batch_ids: ["80a15dc2-92d5-48a4-9aa4-73ecdcb1d130"],
  ark: "ark:/81985/n2mp4wt8r",
  caption: [],
  status: "Done" as Status,
  title: "Palace of Popes. Exterior: courtyard",
  iiif_manifest:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/263625cc-6fd7-47ae-a725-394a483d28d2?as=iiif",
  style_period: [
    {
      facet: "http://vocab.getty.edu/aat/300020775||Gothic (Medieval)",
      id: "http://vocab.getty.edu/aat/300020775",
      label: "Gothic (Medieval)",
      variants: [],
    },
  ],
  api_link:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/263625cc-6fd7-47ae-a725-394a483d28d2",
  ingest_project: null,
  ingest_sheet: null,
  catalog_key: [],
  cultural_context: [],
  rights_statement: {
    id: "http://rightsstatements.org/vocab/CNE/1.0/",
    label: "Copyright Not Evaluated",
  },
  file_sets: [
    {
      accession_number: "inu-dil-12b39039-68af-4a31-8b04-1b025d95a0b8",
      description: "Something",
      duration: null,
      height: 4050,
      id: "7ad42e60-a8b6-444d-b4cf-f53f9c2756f6",
      label: "inu-dil-12b39039-68af-4a31-8b04-1b025d95a0b8.tif",
      mime_type: "image/tiff",
      original_filename: "inu-dil-12b39039-68af-4a31-8b04-1b025d95a0b8.tif",
      poster_offset: null,
      rank: 0,
      representative_image_url:
        "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/7ad42e60-a8b6-444d-b4cf-f53f9c2756f6",
      role: "Access",
      streaming_url: null,
      webvtt: null,
      width: 6079,
    },
  ],
  library_unit: "University Archives",
  technique: [],
  table_of_contents: [],
  representative_file_set: {
    aspect_ratio: 1,
    id: "7ad42e60-a8b6-444d-b4cf-f53f9c2756f6",
    url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/7ad42e60-a8b6-444d-b4cf-f53f9c2756f6",
  },
  related_url: [],
  terms_of_use:
    "The images on this web site, from material in the collections of Northwestern University Libraries, are provided for use by its students, faculty and staff, and by other researchers visiting this site, for research consultation and scholarly purposes only. Further distribution and/or any commercial use of the images from this site is not permitted.",
  visibility: "Institution" as Visibility,
  license: {
    id: "asdfasdf",
    label: "Ima license label",
  },
  alternate_title: [],
  project: {
    cycle: null,
    desc: null,
    manager: null,
    name: null,
    proposer: null,
    task_number: null,
  },
  preservation_level: "Level 1" as PreservationLevel,
  location: [],
  published: true,
  source: [],
  folder_number: [],
  legacy_identifier: ["inu:dil-12b39039-68af-4a31-8b04-1b025d95a0b8"],
  work_type: "Image" as WorkType,
  modified_date: "2022-10-13T20:56:27.629306Z",
  identifier: [],
  box_name: [],
};

const manifest = {
  "@context": "http://iiif.io/api/presentation/3/context.json",
  id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/263625cc-6fd7-47ae-a725-394a483d28d2?as=iiif",
  type: "Manifest",
  label: {
    none: ["Palace of Popes. Exterior: courtyard"],
  },
  metadata: [
    {
      label: {
        none: ["Creator"],
      },
      value: {
        none: [
          "unknown French (French artist)",
          "Schober, Franz von, 1796-1882",
        ],
      },
    },
    {
      label: {
        none: ["Date"],
      },
      value: {
        none: ["1335 to 1364"],
      },
    },
    {
      label: {
        none: ["Department"],
      },
      value: {
        none: ["University Archives"],
      },
    },
    {
      label: {
        none: ["Genre"],
      },
      value: {
        none: ["architecture (object genre)", "architecture (discipline)"],
      },
    },
    {
      label: {
        none: ["Last Modified"],
      },
      value: {
        none: ["2022-10-13T20:56:27.629306Z"],
      },
    },
    {
      label: {
        none: ["Notes"],
      },
      value: {
        none: ["massive add to all pages/check (General Note)"],
      },
    },
    {
      label: {
        none: ["Provenance"],
      },
      value: {
        none: ["France ; Avignon"],
      },
    },
    {
      label: {
        none: ["Style Period"],
      },
      value: {
        none: ["Gothic (Medieval)"],
      },
    },
    {
      label: {
        none: ["Subject"],
      },
      value: {
        none: [
          "Castles (Topical)",
          "Courtyards (Topical)",
          "Architecture--14th century--France (Topical)",
        ],
      },
    },
  ],
  requiredStatement: {
    label: {
      none: ["Attribution"],
    },
    value: {
      none: [
        "Courtesy of Northwestern University Libraries",
        "The images on this web site, from material in the collections of Northwestern University Libraries, are provided for use by its students, faculty and staff, and by other researchers visiting this site, for research consultation and scholarly purposes only. Further distribution and/or any commercial use of the images from this site is not permitted.",
      ],
    },
  },
  rights: "http://rightsstatements.org/vocab/CNE/1.0/",
  thumbnail: [
    {
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/263625cc-6fd7-47ae-a725-394a483d28d2/thumbnail",
      type: "Image",
      format: "image/jpeg",
      height: 300,
      width: 300,
    },
  ],
  seeAlso: [
    {
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/263625cc-6fd7-47ae-a725-394a483d28d2",
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
      id: "https://dc-next.rdc-staging.library.northwestern.edu/items/263625cc-6fd7-47ae-a725-394a483d28d2",
      type: "Text",
      format: "text/html",
      label: {
        none: [
          "Homepage at Northwestern University Libraries Digital Collections",
        ],
      },
    },
  ],
  partOf: [
    {
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/collections/c7f1196d-fcb0-4398-86c0-fa836dbd2880?as=iiif",
      type: "Collection",
      label: {
        none: ["Department of Art History || Architecture Collection"],
      },
      summary: {
        none: [
          "These images were from the Architecture files of the Slide Library which was once in the Visual Media Center under the Department of Art History at Northwestern University.",
        ],
      },
    },
  ],
  items: [
    {
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/263625cc-6fd7-47ae-a725-394a483d28d2?as=iiif/canvas/access/0",
      type: "Canvas",
      height: 4050,
      width: 6079,
      label: {
        none: ["inu-dil-12b39039-68af-4a31-8b04-1b025d95a0b8.tif"],
      },
      thumbnail: [
        {
          id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/7ad42e60-a8b6-444d-b4cf-f53f9c2756f6/full/!300,300/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          height: 300,
          width: 300,
          service: [
            {
              id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/7ad42e60-a8b6-444d-b4cf-f53f9c2756f6",
              "@type": "ImageService2",
              profile: "http://iiif.io/api/image/2/level2.json",
            },
          ],
        },
      ],
      items: [
        {
          id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/263625cc-6fd7-47ae-a725-394a483d28d2?as=iiif/canvas/access/0/annotation-page",
          type: "AnnotationPage",
          items: [
            {
              id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/263625cc-6fd7-47ae-a725-394a483d28d2?as=iiif/canvas/access/0/annotation/0",
              type: "Annotation",
              motivation: "painting",
              target:
                "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/263625cc-6fd7-47ae-a725-394a483d28d2?as=iiif/canvas/access/0",
              body: {
                id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/7ad42e60-a8b6-444d-b4cf-f53f9c2756f6/full/600,/0/default.jpg",
                type: "Image",
                format: "image/tiff",
                height: 4050,
                width: 6079,
                service: [
                  {
                    id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/7ad42e60-a8b6-444d-b4cf-f53f9c2756f6",
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
} as Manifest;
