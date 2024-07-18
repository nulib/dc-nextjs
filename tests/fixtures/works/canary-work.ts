/* eslint-disable sort-keys */

import { Work } from "@nulib/dcapi-types";

type WorkExtended = Work & {
  canonical_link: string;
  related_material: string[];
};

export const canaryWork: WorkExtended = {
  abstract: ["Updated description!!!"],
  accession_number: "TEST_canary_002",
  alternate_title: ["This is an alternative title"],
  api_link:
    "https://dc-test-api.rdc-staging.library.northwestern.edu/api/v2/works/cb8a19a7-3dec-47f3-80c0-12872ae61f8f",
  api_model: "Work",
  ark: "ark:/81985/n2x34qh35",
  batch_ids: [
    "20ebb42e-93a5-4e47-bfcb-f3491f319b48",
    "512ae70f-13db-46cb-ad5b-bd768302d919",
    "59c46d06-a2be-4b25-9dc5-ceb1671bf1b8",
  ],
  box_name: ["The name of a box"],
  box_number: ["88"],
  canonical_link:
    "https://dc.library.northwestern.edu/items/cb8a19a7-3dec-47f3-80c0-12872ae61f8f",
  caption: ["Beebo"],
  catalog_key: ["MS-1984-1982-1989"],
  collection: {
    description: "A private collection for Meadow test records",
    id: "820fc328-a333-430b-a974-ac6218a1ffcd",
    title: "TEST Canary Records",
  },
  contributor: [
    {
      facet:
        "http://id.loc.gov/authorities/names/n91114928|ctg|Metallica (Musical group) (Cartographer)",
      id: "http://id.loc.gov/authorities/names/n91114928",
      label: "Metallica (Musical group)",
      label_with_role: "Metallica (Musical group) (Cartographer)",
      role: "Cartographer",
      variants: [],
    },
    {
      facet:
        "http://id.worldcat.org/fast/1717972|act|Schober, Franz von, 1796-1882 (Actor)",
      id: "http://id.worldcat.org/fast/1717972",
      label: "Schober, Franz von, 1796-1882",
      label_with_role: "Schober, Franz von, 1796-1882 (Actor)",
      role: "Actor",
      variants: [],
    },
  ],
  create_date: "2022-08-02T18:52:31.503448Z",
  creator: [
    {
      facet:
        "http://id.loc.gov/authorities/names/no2011059409||Dessa (Vocalist)",
      id: "http://id.loc.gov/authorities/names/no2011059409",
      label: "Dessa (Vocalist)",
      variants: [
        "Dessa, 1981-",
        "Wander, Dessa, 1981-",
        "Dessa Darling",
        "Wander, Margret",
      ],
    },
  ],
  csv_metadata_update_jobs: ["6eef2d27-dc36-4470-b461-820ae199b835"],
  cultural_context: ["Test Context"],
  date_created: ["August 1906 to December 1910", "1958"],
  description: [
    "This is a private record for RepoDev testing on production",
    "Test",
  ],
  embedding: [123, 1234],
  embedding_model: "embed model here",
  file_sets: [
    {
      accession_number: "TEST_canary_002_001",
      description: "access tif",
      download_url: "https://northwestern.com/download/ABC123",
      duration: null,
      height: 3024,
      id: "39a418a3-1ec7-4ef6-ae0c-0227c5aa2355",
      label: "access tif",
      mime_type: "image/tiff",
      original_filename: "Squirrel.tif",
      poster_offset: null,
      rank: 0,
      representative_image_url:
        "https://dc-test-iiif.rdc-staging.library.northwestern.edu/iiif/2/39a418a3-1ec7-4ef6-ae0c-0227c5aa2355",
      role: "Access",
      streaming_url: null,
      webvtt: null,
      width: 4032,
    },
    {
      accession_number: "TEST_canary_002_006",
      description: "access jpg",
      download_url: "https://northwestern.com/download/ABC123",
      duration: null,
      height: 4032,
      id: "a59dc417-d313-4286-88d4-1c80916b82c6",
      label: "access jpg",
      mime_type: "image/jpeg",
      original_filename: "PXL_20211213_211133857.jpg",
      poster_offset: null,
      rank: 1073741824,
      representative_image_url:
        "https://dc-test-iiif.rdc-staging.library.northwestern.edu/iiif/2/a59dc417-d313-4286-88d4-1c80916b82c6",
      role: "Access",
      streaming_url: null,
      webvtt: null,
      width: 3024,
    },
    {
      accession_number: "KETCHUM_CCC",
      description: "Ketchum, 1974",
      download_url: "https://northwestern.com/download/ABC123",
      duration: null,
      height: 4438,
      id: "c285fdc6-d7ee-4a94-a548-2c80e22584da",
      label: "Cocktail Construction Chart",
      mime_type: "image/jpeg",
      original_filename: "cocktail_construction_chart_1974.jpg",
      poster_offset: null,
      rank: 1610612736,
      representative_image_url:
        "https://dc-test-iiif.rdc-staging.library.northwestern.edu/iiif/2/c285fdc6-d7ee-4a94-a548-2c80e22584da",
      role: "Access",
      streaming_url: null,
      webvtt: null,
      width: 6494,
    },
    {
      accession_number: "TEST_canary_002_002",
      description: "preservation bmp",
      download_url: "https://northwestern.com/download/ABC123",
      duration: null,
      height: 862,
      id: "b60fc7a7-8f13-407e-8b69-9a030b01daae",
      label: "preservation bmp",
      mime_type: "image/bmp",
      original_filename: "Angela_and_Lisa_Redd.bmp",
      poster_offset: null,
      rank: 0,
      representative_image_url: null,
      role: "Preservation",
      streaming_url: null,
      webvtt: null,
      width: 640,
    },
    {
      accession_number: "TEST_canary_002_004",
      description: "preservation tif",
      download_url: "https://northwestern.com/download/ABC123",
      duration: null,
      height: 4032,
      id: "258f7218-2f42-4293-8a18-a0aa5e1484f0",
      label: "preservation tif",
      mime_type: "image/tiff",
      original_filename: "distillery.tif",
      poster_offset: null,
      rank: 1073741824,
      representative_image_url: null,
      role: "Preservation",
      streaming_url: null,
      webvtt: null,
      width: 3024,
    },
    {
      accession_number: "TEST_canary_002_005",
      description: "preservation jpg",
      download_url: "https://northwestern.com/download/ABC123",
      duration: null,
      height: 4032,
      id: "4c7b9949-9cb1-4da2-83bd-04d9dd6d0c4f",
      label: "preservation jpg",
      mime_type: "image/jpeg",
      original_filename: "PXL_20211213_211133857.jpg",
      poster_offset: null,
      rank: 1610612736,
      representative_image_url: null,
      role: "Preservation",
      streaming_url: null,
      webvtt: null,
      width: 3024,
    },
    {
      accession_number: "TEST_canary_002_003",
      description: "auxiliary png",
      download_url: "https://northwestern.com/download/ABC123",
      duration: null,
      height: 4000,
      id: "e2dfbed2-b125-486a-b33f-ddeff349f887",
      label: "auxiliary png",
      mime_type: "image/jpeg",
      original_filename: "CoopersHawk.png",
      poster_offset: null,
      rank: 0,
      representative_image_url:
        "https://dc-test-iiif.rdc-staging.library.northwestern.edu/iiif/2/e2dfbed2-b125-486a-b33f-ddeff349f887",
      role: "Auxiliary",
      streaming_url: null,
      webvtt: null,
      width: 6000,
    },
  ],
  folder_name: ["Blue folder"],
  folder_number: ["88"],
  genre: [
    {
      facet: "http://vocab.getty.edu/aat/300435283||stencil prints",
      id: "http://vocab.getty.edu/aat/300435283",
      label: "stencil prints",
      variants: [],
    },
  ],
  id: "cb8a19a7-3dec-47f3-80c0-12872ae61f8f",
  identifier: ["555"],
  iiif_manifest:
    "https://dc-test-api.rdc-staging.library.northwestern.edu/api/v2/works/cb8a19a7-3dec-47f3-80c0-12872ae61f8f?as=iiif",
  indexed_at: "2023-03-15T21:45:34.246257",
  ingest_project: {
    id: "e98ca38d-7677-43f8-bc30-f36f92eded0a",
    title: "golive_smoketest",
  },
  ingest_sheet: {
    id: "3999f185-ec7a-4cd9-a219-02aa4cb54ceb",
    title: "TEST_CanaryRecords_prod.csv",
  },
  keywords: ["leaves"],
  language: [
    {
      facet: "http://id.loc.gov/vocabulary/languages/crh||Crimean Tatar",
      id: "http://id.loc.gov/vocabulary/languages/crh",
      label: "Crimean Tatar",
      variants: [],
    },
  ],
  legacy_identifier: ["555"],
  library_unit: "University Main Library",
  license: {
    id: "http://www.europeana.eu/portal/rights/rr-r.html",
    label: "All rights reserved",
  },
  location: [
    {
      facet: "https://sws.geonames.org/4999069/||Leland Township",
      id: "https://sws.geonames.org/4999069/",
      label: "Leland Township",
      variants: [],
    },
  ],
  modified_date: "2022-12-05T15:52:58.347463Z",
  notes: [
    {
      note: "Here are some notes",
      type: "General Note",
    },
    {
      note: "Awards type",
      type: "Awards",
    },
    {
      note: "Biographical note",
      type: "Bibliographical/Historical Note",
    },
    {
      note: "creation production credits",
      type: "Creation/Production Credits",
    },
    {
      note: "Language note",
      type: "Lanugage Note",
    },
    {
      note: "Local Note",
      type: "Local Note",
    },
    {
      note: "Performers",
      type: "Performers",
    },
    {
      note: "Statement of Responsibility",
      type: "Statement of Responsibility",
    },
    {
      note: "Venue/event date",
      type: "Venue/Event Date",
    },
  ],
  physical_description_material: ["Acrylic paint on cement block"],
  physical_description_size: ["16 x 24 inches"],
  preservation_level: "Level 1",
  project: {
    cycle: "2022",
    desc: "This is a description",
    manager: "Nicole Finzer",
    name: "Test",
    proposer: "Carolyn Caizzi",
    task_number: "P0000",
  },
  provenance: [
    "Artist; sold to Mr. Blank in 1955; sold to Lancelot in 2017; gifted to Northwestern University in 2019",
  ],
  published: true,
  publisher: ["Northwestern University Press"],
  related_material: ["See Also: related material"],
  related_url: [
    {
      label: "Finding Aid",
      url: "https://findingaids.library.northwestern.edu/",
    },
    {
      label: "Resource Guide",
      url: "https://www.wbez.org/",
    },
    {
      label: "Related Information",
      url: "https://www.nationalgeographic.com/animals/mammals/facts/squirrels",
    },
    {
      label: "Hathi Trust",
      url: "https://www.hathitrust.org/",
    },
  ],
  representative_file_set: {
    aspect_ratio: 0.75,
    id: "a59dc417-d313-4286-88d4-1c80916b82c6",
    url: "https://dc-test-iiif.rdc-staging.library.northwestern.edu/iiif/2/a59dc417-d313-4286-88d4-1c80916b82c6",
  },
  rights_holder: ["Artist"],
  rights_statement: {
    id: "http://rightsstatements.org/vocab/InC-EDU/1.0/",
    label: "In Copyright - Educational Use Permitted",
  },
  scope_and_contents: ["I promise there is scope and content"],
  series: ["Canaries and How to Care for Them"],
  source: ["Mars"],
  status: "Done",
  style_period: [
    {
      facet:
        "http://vocab.getty.edu/aat/300018478||Qing (dynastic styles and periods)",
      id: "http://vocab.getty.edu/aat/300018478",
      label: "Qing (dynastic styles and periods)",
      variants: [],
    },
  ],
  subject: [
    {
      facet:
        "http://id.worldcat.org/fast/1902713|TOPICAL|Cats on postage stamps (Topical)",
      id: "http://id.worldcat.org/fast/1902713",
      label: "Cats on postage stamps",
      label_with_role: "Cats on postage stamps (Topical)",
      role: "Topical",
      variants: [],
    },
    {
      facet:
        "info:nul/6cba23b5-a91a-4c13-8398-54967b329d48|TOPICAL|Test Record Canary (Topical)",
      id: "info:nul/6cba23b5-a91a-4c13-8398-54967b329d48",
      label: "Test Record Canary",
      label_with_role: "Test Record Canary (Topical)",
      role: "Topical",
      variants: [],
    },
    {
      facet:
        "http://vocab.getty.edu/tgn/2000971|GEOGRAPHICAL|Leelanau (Geographical)",
      id: "http://vocab.getty.edu/tgn/2000971",
      label: "Leelanau",
      label_with_role: "Leelanau (Geographical)",
      role: "Geographical",
      variants: [],
    },
    {
      facet:
        "http://id.worldcat.org/fast/1204587|GEOGRAPHICAL|Michigan--Ann Arbor (Geographical)",
      id: "http://id.worldcat.org/fast/1204587",
      label: "Michigan--Ann Arbor",
      label_with_role: "Michigan--Ann Arbor (Geographical)",
      role: "Geographical",
      variants: [],
    },
  ],
  table_of_contents: ["1. cats; 2. dogs"],
  technique: [
    {
      facet:
        "http://vocab.getty.edu/aat/300053228||drypoint (printing process)",
      id: "http://vocab.getty.edu/aat/300053228",
      label: "drypoint (printing process)",
      variants: [],
    },
  ],
  terms_of_use: "Terms ",
  thumbnail:
    "https://dc-test-api.rdc-staging.library.northwestern.edu/api/v2/works/cb8a19a7-3dec-47f3-80c0-12872ae61f8f/thumbnail",
  title: "Canary Record TEST 3",
  visibility: "Public",
  work_type: "Image",
};
