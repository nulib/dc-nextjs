export interface Contributor {
  id: string;
  label: string;
  label_with_role: string;
  role: string;
}

export interface FileSet {
  duration?: number | null;
  height: number | null;
  id: string;
  label: string;
  mime_type: string;
  original_filename: string;
  poster_offset: number | null;
  rank: number;
  representative_image_url: string;
  role: string;
  streaming_url: string | null;
  webvtt: string | null;
  width: number | null;
}

type GenericIdLabel = {
  id: string;
  label: string;
};

type IdLabelScheme = {
  id: string;
  label: string;
  scheme: string;
};

export interface Note {
  note: string;
  type: string;
}

export interface RelatedUrl {
  label: IdLabelScheme;
  url: string;
}

export interface Subject {
  id: string;
  label: string;
  label_with_role: string;
  role: string;
}

export interface FacetsWorkLink {
  label: string;
  param: string;
}

export type PreservationLevelStatus = "Level 1" | "Level 2" | "Level 3";

export type StatusValues = "Done" | "In Progress" | "Not Started";

export type VisibilityStatus = "Institution" | "Private" | "Public";
export interface WorkShape {
  id: string;
  abstract: Array<string>;
  accession_number: string;
  alternate_title: Array<string>;
  api_model: string;
  api_link: string;
  ark: string;
  box_name: Array<string>;
  box_number: Array<string>;
  caption: Array<string>;
  catalog_key: Array<string>;
  collection: {
    id: string;
    title: string;
  };
  contributor: Array<Contributor>;
  create_date: string;
  creator: Array<GenericIdLabel>;
  cultural_context: Array<string>;
  description: Array<string>;
  file_sets: Array<FileSet>;
  folder_names: Array<string>;
  folder_numbers: Array<string>;
  genre: Array<GenericIdLabel>;
  identifier: Array<string>;
  iiif_manifest: string;
  indexed_at: string;
  keywords: Array<string>;
  legacy_identifier: Array<string>;
  library_unit: string;
  license: IdLabelScheme | null;
  modified_date: string;
  notes: Array<Note>;
  physical_description_material: Array<string>;
  physical_description_size: Array<string>;
  preservation_level: PreservationLevelStatus;
  provenance: Array<string>;
  published: boolean;
  publisher: Array<string>;
  reading_room?: boolean;
  related_material: Array<string>;
  related_url: Array<RelatedUrl>;
  representative_file_set: {
    id: string;
    url: string;
  };
  rights_holder: Array<string>;
  rights_statement: GenericIdLabel;
  scope_and_contents: Array<string>;
  series: Array<string>;
  source: Array<string>;
  subject: Array<Subject>;
  status: StatusValues;
  style_period: Array<GenericIdLabel>;
  table_of_contents: Array<string>;
  technique: Array<GenericIdLabel>;
  terms_of_use: string;
  thumbnail: string;
  title: string;
  visibility: VisibilityStatus;
  work_type: WorkTypeStatus;
}

export type WorkTypeStatus = "Audio" | "Image" | "Video";
