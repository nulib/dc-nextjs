import { AllFacets, FacetsGroup } from "@/types/components/facets";

export const ALL_FACETS: AllFacets = {
  facets: [
    {
      id: "contributor",
      field: "descriptiveMetadata.contributor.displayFacet",
      label: "Contributor",
    },
    {
      id: "creator",
      field: "descriptiveMetadata.creator.displayFacet",
      label: "Creator",
    },
    {
      id: "rightsStatement",
      field: "descriptiveMetadata.rightsStatement.label.keyword",
      label: "Rights Statement",
    },
    {
      id: "genre",
      field: "descriptiveMetadata.genre.displayFacet",
      label: "Genre",
    },
    {
      id: "language",
      field: "descriptiveMetadata.language.displayFacet",
      label: "Language",
    },
    {
      id: "location",
      field: "descriptiveMetadata.location.displayFacet",
      label: "Location",
    },
    {
      id: "stylePeriod",
      field: "descriptiveMetadata.stylePeriod.displayFacet",
      label: "Style Period",
    },
    {
      id: "subject",
      field: "descriptiveMetadata.subject.term.label.keyword",
      label: "Subject",
    },
    {
      id: "technique",
      field: "descriptiveMetadata.technique.displayFacet",
      label: "Technique",
    },
    {
      id: "workType",
      field: "workType.label.keyword",
      label: "Work Type",
    },
    {
      id: "libraryDepartment",
      field: "administrativeMetadata.libraryUnit.label.keyword",
      label: "Library Department",
    },
    {
      id: "collection",
      field: "collection.title.keyword",
      label: "Collection",
    },
    {
      id: "boxName",
      field: "descriptiveMetadata.boxName.keyword",
      label: "Box Name",
    },
    {
      id: "boxNumber",
      field: "descriptiveMetadata.boxNumber.keyword",
      label: "Box Number",
    },
    {
      id: "folderName",
      field: "descriptiveMetadata.folderName.keyword",
      label: "Folder Name",
    },
    {
      id: "folderNumber",
      field: "descriptiveMetadata.folderNumber.keyword",
      label: "Folder Number",
    },
    {
      id: "series",
      field: "descriptiveMetadata.series.keyword",
      label: "Series",
    },
  ],
};

const FACETS_CREATOR: FacetsGroup = {
  label: "Creator and Contributor",
  facets: [
    {
      id: "contributor",
      field: "descriptiveMetadata.contributor.displayFacet",
      label: "Contributor",
    },
    {
      id: "creator",
      field: "descriptiveMetadata.creator.displayFacet",
      label: "Creator",
    },
  ],
};

const FACETS_RIGHTS_USAGE: FacetsGroup = {
  label: "Rights and Usage",
  facets: [
    {
      id: "rightsStatement",
      field: "descriptiveMetadata.rightsStatement.label.keyword",
      label: "Rights Statement",
    },
  ],
};

const FACETS_DESCRIPTIVE: FacetsGroup = {
  label: "Subjects and Descriptive",
  facets: [
    {
      id: "genre",
      field: "descriptiveMetadata.genre.displayFacet",
      label: "Genre",
    },
    {
      id: "language",
      field: "descriptiveMetadata.language.displayFacet",
      label: "Language",
    },
    {
      id: "location",
      field: "descriptiveMetadata.location.displayFacet",
      label: "Location",
    },
    {
      id: "stylePeriod",
      field: "descriptiveMetadata.stylePeriod.displayFacet",
      label: "Style Period",
    },
    {
      id: "subject",
      field: "descriptiveMetadata.subject.term.label.keyword",
      label: "Subject",
    },
    {
      id: "technique",
      field: "descriptiveMetadata.technique.displayFacet",
      label: "Technique",
    },
    {
      id: "workType",
      field: "workType.label.keyword",
      label: "Work Type",
    },
  ],
};

const FACETS_LOCATION: FacetsGroup = {
  label: "Location",
  facets: [
    {
      id: "libraryDepartment",
      field: "administrativeMetadata.libraryUnit.label.keyword",
      label: "Library Department",
    },
    {
      id: "collection",
      field: "collection.title.keyword",
      label: "Collection",
    },
    {
      id: "boxName",
      field: "descriptiveMetadata.boxName.keyword",
      label: "Box Name",
    },
    {
      id: "boxNumber",
      field: "descriptiveMetadata.boxNumber.keyword",
      label: "Box Number",
    },
    {
      id: "folderName",
      field: "descriptiveMetadata.folderName.keyword",
      label: "Folder Name",
    },
    {
      id: "folderNumber",
      field: "descriptiveMetadata.folderNumber.keyword",
      label: "Folder Number",
    },
    {
      id: "series",
      field: "descriptiveMetadata.series.keyword",
      label: "Series",
    },
  ],
};

export const FACETS: FacetsGroup[] = [
  FACETS_CREATOR,
  FACETS_DESCRIPTIVE,
  FACETS_LOCATION,
  FACETS_RIGHTS_USAGE,
];
