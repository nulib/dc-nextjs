import { Work } from "@nulib/dcapi-types";

export const samplePublicWork: Work = {
  abstract: [],
  accession_number: "Time01_5000_work_749",
  alternate_title: [],
  api_link:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6",
  api_model: "Work",
  ark: "ark:/99999/fk47m1vh3c",
  batch_ids: ["58e284d2-e16f-4954-90e6-8a9cd8d88c07"],
  box_name: [],
  box_number: [],
  //@ts-ignore
  canonical_link:
    "https://dc.rdc-staging.library.northwestern.edu/items/8163f95b-cd40-4210-a7ff-e25b7b39c8d6",
  caption: [],
  catalog_key: [],
  collection: null,
  contributor: [],
  create_date: "2023-04-20T19:40:59.209638Z",
  creator: [],
  csv_metadata_update_jobs: [
    "6d7e9d86-4922-407e-9ffb-d7888d7c8b76",
    "4e7c47d0-47ac-485f-878b-ba4fa21c6ab4",
  ],
  cultural_context: [],
  date_created: [],
  date_created_edtf: [],
  description: [],
  file_sets: [
    {
      accession_number: "Time01_5000_accn_1301",
      description: "This is a description of work the work",
      download_url: "http://download.me",
      duration: null,
      height: 4246,
      id: "1d2c2e79-8a6a-4b55-b06a-627cbf82ddd0",
      label: "label",
      mime_type: "image/tiff",
      original_filename: "BFMF_B17_F05_016a.tif",
      poster_offset: null,
      rank: 0,
      representative_image_url:
        "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/1d2c2e79-8a6a-4b55-b06a-627cbf82ddd0",
      role: "Access",
      streaming_url: null,
      webvtt: null,
      width: 3940,
    },
    {
      accession_number: "Time01_5000_accn_1302",
      description: "This is a description of work the work",
      download_url: "http://download.me",
      duration: null,
      height: 4212,
      id: "3a1562c9-e9d7-4311-a572-28e9ddf39745",
      label: "label",
      mime_type: "image/tiff",
      original_filename: "BFMF_B17_F05_016b.tif",
      poster_offset: null,
      rank: 1073741824,
      representative_image_url:
        "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/3a1562c9-e9d7-4311-a572-28e9ddf39745",
      role: "Access",
      streaming_url: null,
      webvtt: null,
      width: 3944,
    },
  ],
  folder_name: [],
  folder_number: [],
  genre: [],
  id: "8163f95b-cd40-4210-a7ff-e25b7b39c8d6",
  identifier: [],
  iiif_manifest:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif",
  indexed_at: "2023-05-24T22:11:52.680439",
  ingest_project: {
    id: "bc9d16dd-1434-4f7e-aa30-aefaca0f79db",
    title: "VRTestingProject",
  },
  ingest_sheet: {
    id: "83c68200-5c0e-4b2b-8ea5-5d7e218f93d3",
    title: "Test5000_Ingest_Time_01.csv",
  },
  keywords: [],
  language: [],
  legacy_identifier: [],
  library_unit: null,
  license: null,
  location: [],
  modified_date: "2023-05-24T21:57:57.586559Z",
  notes: [],
  physical_description_material: [],
  physical_description_size: [],
  preservation_level: null,
  project: {
    cycle: null,
    desc: null,
    manager: null,
    name: "Massive Project Update Name",
    proposer: null,
    task_number: null,
  },
  provenance: [],
  published: true,
  publisher: [],
  related_material: [],
  related_url: [],
  representative_file_set: {
    aspect_ratio: 0.92793,
    id: "1d2c2e79-8a6a-4b55-b06a-627cbf82ddd0",
    url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/1d2c2e79-8a6a-4b55-b06a-627cbf82ddd0",
  },
  rights_holder: [],
  rights_statement: null,
  scope_and_contents: [],
  series: [],
  source: [],
  status: null,
  style_period: [],
  subject: [],
  table_of_contents: [],
  technique: [],
  terms_of_use: null,
  thumbnail:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6/thumbnail",
  title: null,
  visibility: "Public",
  work_type: "Image",
};

export const samplePublicWorkManifest = {
  "@context": "http://iiif.io/api/presentation/3/context.json",
  homepage: [
    {
      format: "text/html",
      id: "https://dc.rdc-staging.library.northwestern.edu/items/8163f95b-cd40-4210-a7ff-e25b7b39c8d6",
      label: {
        none: [
          "Homepage at Northwestern University Libraries Digital Collections",
        ],
      },
      type: "Text",
    },
  ],
  id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif",
  items: [
    {
      height: 4246,
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/0",
      items: [
        {
          id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/0/annotation-page",
          items: [
            {
              body: {
                format: "image/tiff",
                height: 4246,
                id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/1d2c2e79-8a6a-4b55-b06a-627cbf82ddd0/full/600,/0/default.jpg",
                service: [
                  {
                    "@id":
                      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/1d2c2e79-8a6a-4b55-b06a-627cbf82ddd0",
                    "@type": "ImageService2",
                    profile: "http://iiif.io/api/image/2/level2.json",
                  },
                ],
                type: "Image",
                width: 3940,
              },
              id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/0/annotation/0",
              motivation: "painting",
              target:
                "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/0",
              type: "Annotation",
            },
          ],
          type: "AnnotationPage",
        },
      ],
      label: {
        none: ["label"],
      },
      placeholderCanvas: {
        height: 689,
        id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/0/placeholder",
        items: [
          {
            id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/0/placeholder/annotation-page/0",
            items: [
              {
                body: {
                  format: "image/tiff",
                  height: 689,
                  id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/1d2c2e79-8a6a-4b55-b06a-627cbf82ddd0/full/!640,689/0/default.jpg",
                  service: [
                    {
                      "@id":
                        "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/1d2c2e79-8a6a-4b55-b06a-627cbf82ddd0",
                      "@type": "ImageService2",
                      profile: "http://iiif.io/api/image/2/level2.json",
                    },
                  ],
                  type: "Image",
                  width: 640,
                },
                id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/0/placeholder/annotation/0",
                motivation: "painting",
                target:
                  "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/0/placeholder",
                type: "Annotation",
              },
            ],
            type: "AnnotationPage",
          },
        ],
        type: "Canvas",
        width: 640,
      },
      thumbnail: [
        {
          format: "image/jpeg",
          height: 300,
          id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/1d2c2e79-8a6a-4b55-b06a-627cbf82ddd0/full/!300,300/0/default.jpg",
          service: [
            {
              "@id":
                "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/1d2c2e79-8a6a-4b55-b06a-627cbf82ddd0",
              "@type": "ImageService2",
              profile: "http://iiif.io/api/image/2/level2.json",
            },
          ],
          type: "Image",
          width: 300,
        },
      ],
      type: "Canvas",
      width: 3940,
    },
    {
      height: 4212,
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/1",
      items: [
        {
          id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/1/annotation-page",
          items: [
            {
              body: {
                format: "image/tiff",
                height: 4212,
                id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/3a1562c9-e9d7-4311-a572-28e9ddf39745/full/600,/0/default.jpg",
                service: [
                  {
                    "@id":
                      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/3a1562c9-e9d7-4311-a572-28e9ddf39745",
                    "@type": "ImageService2",
                    profile: "http://iiif.io/api/image/2/level2.json",
                  },
                ],
                type: "Image",
                width: 3944,
              },
              id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/1/annotation/0",
              motivation: "painting",
              target:
                "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/1",
              type: "Annotation",
            },
          ],
          type: "AnnotationPage",
        },
      ],
      label: {
        none: ["label"],
      },
      placeholderCanvas: {
        height: 683,
        id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/1/placeholder",
        items: [
          {
            id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/1/placeholder/annotation-page/0",
            items: [
              {
                body: {
                  format: "image/tiff",
                  height: 683,
                  id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/3a1562c9-e9d7-4311-a572-28e9ddf39745/full/!640,683/0/default.jpg",
                  service: [
                    {
                      "@id":
                        "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/3a1562c9-e9d7-4311-a572-28e9ddf39745",
                      "@type": "ImageService2",
                      profile: "http://iiif.io/api/image/2/level2.json",
                    },
                  ],
                  type: "Image",
                  width: 640,
                },
                id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/1/placeholder/annotation/0",
                motivation: "painting",
                target:
                  "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif/canvas/access/1/placeholder",
                type: "Annotation",
              },
            ],
            type: "AnnotationPage",
          },
        ],
        type: "Canvas",
        width: 640,
      },
      thumbnail: [
        {
          format: "image/jpeg",
          height: 300,
          id: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/3a1562c9-e9d7-4311-a572-28e9ddf39745/full/!300,300/0/default.jpg",
          service: [
            {
              "@id":
                "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/3a1562c9-e9d7-4311-a572-28e9ddf39745",
              "@type": "ImageService2",
              profile: "http://iiif.io/api/image/2/level2.json",
            },
          ],
          type: "Image",
          width: 300,
        },
      ],
      type: "Canvas",
      width: 3944,
    },
  ],
  label: {
    none: [null],
  },
  metadata: [
    {
      label: {
        none: ["Last Modified"],
      },
      value: {
        none: ["2023-05-24T21:57:57.586559Z"],
      },
    },
  ],
  requiredStatement: {
    label: {
      none: ["Attribution"],
    },
    value: {
      none: ["Courtesy of Northwestern University Libraries"],
    },
  },
  seeAlso: [
    {
      format: "application/json",
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6",
      label: {
        none: ["Northwestern University Libraries Digital Collections API"],
      },
      type: "Dataset",
    },
  ],
  thumbnail: [
    {
      format: "image/jpeg",
      height: 300,
      id: "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6/thumbnail",
      type: "Image",
      width: 300,
    },
  ],
  type: "Manifest",
};
