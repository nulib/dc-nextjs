import {
  FacetsGroup,
  FacetsList,
  FacetsListWorkType,
} from "@/types/components/facets";

export const ALL_FACETS: FacetsList = {
  facets: [
    {
      field: "descriptiveMetadata.contributor.displayFacet",
      id: "contributor",
      label: "Contributor",
    },
    {
      field: "descriptiveMetadata.creator.displayFacet",
      id: "creator",
      label: "Creator",
    },
    {
      field: "descriptiveMetadata.rightsStatement.label.keyword",
      id: "rightsStatement",
      label: "Rights Statement",
    },
    {
      field: "descriptiveMetadata.genre.displayFacet",
      id: "genre",
      label: "Genre",
    },
    {
      field: "descriptiveMetadata.language.displayFacet",
      id: "language",
      label: "Language",
    },
    {
      field: "descriptiveMetadata.location.displayFacet",
      id: "location",
      label: "Location",
    },
    {
      field: "descriptiveMetadata.stylePeriod.displayFacet",
      id: "stylePeriod",
      label: "Style Period",
    },
    {
      field: "descriptiveMetadata.subject.term.label.keyword",
      id: "subject",
      label: "Subject",
    },
    {
      field: "descriptiveMetadata.technique.displayFacet",
      id: "technique",
      label: "Technique",
    },
    {
      field: "workType.label.keyword",
      id: "workType",
      label: "Work Type",
    },
    {
      field: "administrativeMetadata.libraryUnit.label.keyword",
      id: "libraryDepartment",
      label: "Library Department",
    },
    {
      field: "collection.title.keyword",
      id: "collection",
      label: "Collection",
    },
    {
      field: "descriptiveMetadata.boxName.keyword",
      id: "boxName",
      label: "Box Name",
    },
    {
      field: "descriptiveMetadata.boxNumber.keyword",
      id: "boxNumber",
      label: "Box Number",
    },
    {
      field: "descriptiveMetadata.folderName.keyword",
      id: "folderName",
      label: "Folder Name",
    },
    {
      field: "descriptiveMetadata.folderNumber.keyword",
      id: "folderNumber",
      label: "Folder Number",
    },
    {
      field: "descriptiveMetadata.series.keyword",
      id: "series",
      label: "Series",
    },
  ],
};

export const FACETS_WORK_TYPE: FacetsListWorkType = {
  facets: [
    {
      field: "workType.label.keyword",
      id: "workType",
      label: "Work Type",
    },
  ],
  options: ["All", "Image", "Audio", "Video"],
};

const FACETS_CREATOR: FacetsGroup = {
  facets: [
    {
      field: "descriptiveMetadata.contributor.displayFacet",
      id: "contributor",
      label: "Contributor",
    },
    {
      field: "descriptiveMetadata.creator.displayFacet",
      id: "creator",
      label: "Creator",
    },
  ],
  label: "Creator and Contributor",
};

const FACETS_RIGHTS_USAGE: FacetsGroup = {
  facets: [
    {
      field: "descriptiveMetadata.rightsStatement.label.keyword",
      id: "rightsStatement",
      label: "Rights Statement",
    },
  ],
  label: "Rights and Usage",
};

const FACETS_DESCRIPTIVE: FacetsGroup = {
  facets: [
    {
      field: "descriptiveMetadata.genre.displayFacet",
      id: "genre",
      label: "Genre",
    },
    {
      field: "descriptiveMetadata.language.displayFacet",
      id: "language",
      label: "Language",
    },
    {
      field: "descriptiveMetadata.location.displayFacet",
      id: "location",
      label: "Location",
    },
    {
      field: "descriptiveMetadata.stylePeriod.displayFacet",
      id: "stylePeriod",
      label: "Style Period",
    },
    {
      field: "descriptiveMetadata.subject.term.label.keyword",
      id: "subject",
      label: "Subject",
    },
    {
      field: "descriptiveMetadata.technique.displayFacet",
      id: "technique",
      label: "Technique",
    },
    {
      field: "workType.label.keyword",
      id: "workType",
      label: "Work Type",
    },
  ],
  label: "Subjects and Descriptive",
};

const FACETS_LOCATION: FacetsGroup = {
  facets: [
    {
      field: "administrativeMetadata.libraryUnit.label.keyword",
      id: "libraryDepartment",
      label: "Library Department",
    },
    {
      field: "collection.title.keyword",
      id: "collection",
      label: "Collection",
    },
    {
      field: "descriptiveMetadata.boxName.keyword",
      id: "boxName",
      label: "Box Name",
    },
    {
      field: "descriptiveMetadata.boxNumber.keyword",
      id: "boxNumber",
      label: "Box Number",
    },
    {
      field: "descriptiveMetadata.folderName.keyword",
      id: "folderName",
      label: "Folder Name",
    },
    {
      field: "descriptiveMetadata.folderNumber.keyword",
      id: "folderNumber",
      label: "Folder Number",
    },
    {
      field: "descriptiveMetadata.series.keyword",
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
