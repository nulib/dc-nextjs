import {
  FacetsGroup,
  FacetsList,
  FacetsListWorkType,
} from "@/types/components/facets";

export const ALL_FACETS: FacetsList = {
  facets: [
    {
      field: "contributor.label_with_role",
      id: "contributor",
      label: "Contributor",
    },
    {
      field: "creator.label",
      id: "creator",
      label: "Creator",
    },
    {
      field: "rights_statement.label",
      id: "rightsStatement",
      label: "Rights Statement",
    },
    {
      field: "genre.label",
      id: "genre",
      label: "Genre",
    },
    {
      field: "style_period.label",
      id: "stylePeriod",
      label: "Style Period",
    },
    {
      field: "subject.label",
      id: "subject",
      label: "Subject",
    },
    {
      field: "technique.label",
      id: "technique",
      label: "Technique",
    },
    {
      field: "workType",
      id: "workType",
      label: "Work Type",
    },
    {
      field: "library_unit",
      id: "libraryDepartment",
      label: "Library Department",
    },
    {
      field: "collection.title",
      id: "collection",
      label: "Collection",
    },
    {
      field: "box_name",
      id: "boxName",
      label: "Box Name",
    },
    {
      field: "box_number",
      id: "boxNumber",
      label: "Box Number",
    },
    {
      field: "folder_name",
      id: "folderName",
      label: "Folder Name",
    },
    {
      field: "folder_number",
      id: "folderNumber",
      label: "Folder Number",
    },
    {
      field: "series",
      id: "series",
      label: "Series",
    },
  ],
};

export const FACETS_WORK_TYPE: FacetsListWorkType = {
  facets: [
    {
      field: "work_type",
      id: "workType",
      label: "Work Type",
    },
  ],
  options: ["All", "Image", "Audio", "Video"],
};

const FACETS_CREATOR: FacetsGroup = {
  facets: [
    {
      field: "contributor.label",
      id: "contributor",
      label: "Contributor",
    },
    {
      field: "creator.label",
      id: "creator",
      label: "Creator",
    },
  ],
  label: "Creator and Contributor",
};

const FACETS_RIGHTS_USAGE: FacetsGroup = {
  facets: [
    {
      field: "rights_statement.label",
      id: "rightsStatement",
      label: "Rights Statement",
    },
  ],
  label: "Rights and Usage",
};

const FACETS_DESCRIPTIVE: FacetsGroup = {
  facets: [
    {
      field: "genre.label",
      id: "genre",
      label: "Genre",
    },
    {
      field: "style_period.label",
      id: "stylePeriod",
      label: "Style Period",
    },
    {
      field: "subject.label",
      id: "subject",
      label: "Subject",
    },
    {
      field: "technique.label",
      id: "technique",
      label: "Technique",
    },
    {
      field: "work_type",
      id: "workType",
      label: "Work Type",
    },
  ],
  label: "Subjects and Descriptive",
};

const FACETS_LOCATION: FacetsGroup = {
  facets: [
    {
      field: "library_unit",
      id: "libraryDepartment",
      label: "Library Department",
    },
    {
      field: "collection.title",
      id: "collection",
      label: "Collection",
    },
    {
      field: "box_name",
      id: "boxName",
      label: "Box Name",
    },
    {
      field: "box_number",
      id: "boxNumber",
      label: "Box Number",
    },
    {
      field: "folder_names",
      id: "folderName",
      label: "Folder Name",
    },
    {
      field: "folder_numbers",
      id: "folderNumber",
      label: "Folder Number",
    },
    {
      field: "series",
      id: "series",
      label: "Series",
    },
  ],
  label: "Location",
};

export const FACETS: FacetsGroup[] = [
  FACETS_CREATOR,
  FACETS_DESCRIPTIVE,
  FACETS_LOCATION,
  FACETS_RIGHTS_USAGE,
];
