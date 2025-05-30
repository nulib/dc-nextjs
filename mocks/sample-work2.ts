import type { Work } from "@nulib/dcapi-types";

export const sampleWork2: Work = {
  abstract: [],
  accession_number: "Accession:JR_049_12",
  alternate_title: [],
  api_link:
    "https://dcapi.stack.rdc-staging.library.northwestern.edu/api/v2/works/c16029ff-d027-496a-98b7-6f259395a8f7",
  api_model: "Work",
  ark: "ark:/81985/n2kw57t1n",
  batch_ids: [],
  box_name: [],
  box_number: [],
  caption: [],
  catalog_key: [],
  collection: {
    description: null,
    id: "51d4475f-5a0a-42a4-8901-bde73a1fae99",
    title: "Jim Roberts Photographs, 1968-1972",
  },
  contributor: [
    {
      facet: "",
      id: "http://id.loc.gov/authorities/names/n83209441",
      label: "Roberts, James S.",
      label_with_role: "Roberts, James S. (Photographer)",
      role: "Photographer",
      variants: [],
    },
  ],
  create_date: "2021-03-16T15:52:00.377715Z",
  creator: [],
  csv_metadata_update_jobs: [],
  cultural_context: [],
  date_created: ["circa 1960 to circa 1969"],
  description: ["Ima cool description"],
  embedding: [2345, 2345],
  embedding_model:
    "huggingface/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2-stack-p-indexing-embedding",
  embedding_text_length: "0",
  file_sets: [
    {
      accession_number: "inu-dil-50575a78-a47a-4a07-939f-6e1d6a9d7065",
      description: "Something",
      download_url: "http://download.me",
      duration: null,
      group_with: null,
      height: 1000,
      id: "93d75ffe-20d8-48ea-9206-8db9114f2731",
      label: "inu-dil-50575a78-a47a-4a07-939f-6e1d6a9d7065.tif",
      mime_type: "audio",
      original_filename: "hey hey",
      poster_offset: 1000,
      rank: 10,
      representative_image_url: "http://foo.bar",
      role: "Access",
      streaming_url: null,
      webvtt: null,
      width: 1000,
    },
  ],
  folder_name: [],
  folder_number: [],
  genre: [
    {
      facet: "genre.label",
      id: "1",
      label: "Ima Genre1",
      variants: [],
    },
    {
      facet: "genre.label",
      id: "2",
      label: "Ima Genre2",
      variants: [],
    },
  ],
  id: "c16029ff-d027-496a-98b7-6f259395a8f8",
  identifier: ["MS 63"],
  iiif_manifest:
    "https://iiif.stack.rdc-staging.library.northwestern.edu/public/c1/60/29/ff/-d/02/7-/49/6a/-9/8b/7-/6f/25/93/95/a8/f7-manifest.json",
  indexed_at: "2022-07-28T15:46:19.209799",
  ingest_project: null,
  ingest_sheet: null,
  keywords: [],
  language: [],
  legacy_identifier: ["inu:dil-50575a78-a47a-4a07-939f-6e1d6a9d7065"],
  library_unit: "University Archives",
  license: {
    id: "foo",
    label: "bar",
  },
  location: [],
  modified_date: "2022-02-24T23:51:12.736078Z",

  notes: [],
  physical_description_material: ["black-and-white photographs"],
  physical_description_size: [],
  preservation_level: "Level 1",
  project: {
    cycle: "Test",
    desc: "NEH grant project to digitize Berkeley Folk Festival Collection",
    manager: "Nicole Finzer",
    name: "Test",
    proposer: "Scott Krafft",
    task_number: "P0123",
  },
  provenance: [],
  published: true,
  publisher: [],
  related_url: [],
  representative_file_set: {
    aspect_ratio: 1.6,
    id: "93d75ffe-20d8-48ea-9206-8db9114f2731",
    url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/93d75ffe-20d8-48ea-9206-8db9114f2731",
  },
  rights_holder: [],
  rights_statement: {
    id: "http://rightsstatements.org/vocab/InC-EDU/1.0/",
    label: "In Copyright - Educational Use Permitted",
  },
  scope_and_contents: [],
  series: [
    "Jim Roberts Photographs, 1968-1972 -- Cuernavaca",
    "Jim Roberts Photographs, 1968-1972 -- Mexico",
  ],
  source: [],
  status: "Done",
  style_period: [],
  subject: [
    {
      facet: "",
      id: "http://id.worldcat.org/fast/1209593",
      label: "Mexico--Cuernavaca",
      label_with_role: "Mexico--Cuernavaca (Geographical)",
      role: "Geographical",
      variants: [],
    },
    {
      facet: "",
      id: "http://id.worldcat.org/fast/1019244",
      label: "Mexicans",
      label_with_role: "Mexicans (Topical)",
      role: "Topical",
      variants: [],
    },
  ],
  table_of_contents: [],
  technique: [],
  terms_of_use:
    "The images on this web site are from material in the collections of the University Archives of Northwestern University Libraries, are provided for use by its students, faculty and staff, and by other researchers visiting this site, for research consultation and scholarly purposes only. Further distribution and/or any commercial use of the images from this site is not permitted.",
  thumbnail:
    "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/93d75ffe-20d8-48ea-9206-8db9114f2731/full/!300,300/0/default.jpg",
  title: "Hawking dental products in outdoor market, Cuernavaca, Mexico",
  visibility: "Public",
  work_type: "Image",
};
