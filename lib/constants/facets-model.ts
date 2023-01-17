import {
  FacetsGroup,
  FacetsInstance,
  FacetsList,
  FacetsListWorkType,
} from "@/types/components/facets";

export const ALL_FACETS: FacetsList = {
  facets: [
    {
      field: "collection.title.keyword",
      id: "collection",
      label: "Collection",
    },
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
      field: "genre.label",
      id: "genre",
      label: "Genre",
    },
    {
      field: "library_unit",
      id: "libraryDepartment",
      label: "Library Department",
    },
    {
      field: "language.label",
      id: "language",
      label: "Language",
    },
    {
      field: "rights_statement.label",
      id: "rightsStatement",
      label: "Rights Statement",
    },
    {
      field: "series",
      id: "series",
      label: "Series",
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
      field: "visibility",
      id: "visibility",
      label: "Visibility",
    },
    {
      field: "work_type",
      id: "workType",
      label: "Work Type",
    },
  ],
};

export const DEFAULT_FACET: FacetsInstance = {
  field: "subject.label",
  id: "subject",
  label: "Subject",
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

export const FACETS_CREATOR: FacetsGroup = {
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

export const FACETS_RIGHTS_USAGE: FacetsGroup = {
  facets: [
    {
      field: "rights_statement.label",
      id: "rightsStatement",
      label: "Rights Statement",
    },
    {
      field: "visibility",
      id: "visibility",
      label: "Visibility",
    },
  ],
  label: "Rights and Usage",
};

export const FACETS_DESCRIPTIVE: FacetsGroup = {
  facets: [
    {
      field: "genre.label",
      id: "genre",
      label: "Genre",
    },
    {
      field: "language.label",
      id: "language",
      label: "Language",
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

export const FACETS_LOCATION: FacetsGroup = {
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
      field: "series",
      id: "series",
      label: "Series",
    },
  ],
  label: "Location",
};

export const FACETS: FacetsGroup[] = [
  FACETS_DESCRIPTIVE,
  FACETS_CREATOR,
  FACETS_LOCATION,
  FACETS_RIGHTS_USAGE,
];
