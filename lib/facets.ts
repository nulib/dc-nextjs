const FACETS_CREATOR = [
  {
    componentId: "contributor",
    field: "descriptiveMetadata.contributor.displayFacet",
    title: "Contributor",
  },
  {
    componentId: "creator",
    field: "descriptiveMetadata.creator.displayFacet",
    title: "Creator",
  },
];

const FACETS_RIGHTS_USAGE = [
  {
    componentId: "rightsStatement",
    field: "descriptiveMetadata.rightsStatement.label.keyword",
    title: "Rights Statement",
  },
];

const FACETS_DESCRIPTIVE = [
  {
    componentId: "genre",
    field: "descriptiveMetadata.genre.displayFacet",
    title: "Genre",
  },
  {
    componentId: "language",
    field: "descriptiveMetadata.language.displayFacet",
    title: "Language",
  },
  {
    componentId: "Location",
    field: "descriptiveMetadata.location.displayFacet",
    title: "Location",
  },
  {
    componentId: "stylePeriod",
    field: "descriptiveMetadata.stylePeriod.displayFacet",
    title: "Style Period",
  },
  {
    componentId: "subject",
    field: "descriptiveMetadata.subject.term.label.keyword",
    title: "Subject",
  },
  {
    componentId: "technique",
    field: "descriptiveMetadata.technique.displayFacet",
    title: "Technique",
  },
  {
    componentId: "workType",
    field: "workType.label.keyword",
    title: "Work Type",
  },
];

const FACETS_LOCATION = [
  {
    componentId: "libraryDepartment",
    field: "administrativeMetadata.libraryUnit.label.keyword",
    title: "Library Department",
  },
  {
    componentId: "collection",
    field: "collection.title.keyword",
    title: "Collection",
  },
  {
    componentId: "boxName",
    field: "descriptiveMetadata.boxName.keyword",
    title: "Box Name",
  },
  {
    componentId: "boxNumber",
    field: "descriptiveMetadata.boxNumber.keyword",
    title: "Box Number",
  },
  {
    componentId: "folderName",
    field: "descriptiveMetadata.folderName.keyword",
    title: "Folder Name",
  },
  {
    componentId: "folderNumber",
    field: "descriptiveMetadata.folderNumber.keyword",
    title: "Folder Number",
  },
  {
    componentId: "series",
    field: "descriptiveMetadata.series.keyword",
    title: "Series",
  },
];

export const FACETS = [
  ...FACETS_CREATOR,
  ...FACETS_DESCRIPTIVE,
  ...FACETS_LOCATION,
  ...FACETS_RIGHTS_USAGE,
];
