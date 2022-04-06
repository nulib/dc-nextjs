export interface AdministrativeMetadata {
  libraryUnit: any;
  preservationLevel: any;
  projectCycle: string;
  projectDesc: Array<string>;
  projectManager: Array<string>;
  projectName: Array<string>;
  projectProposer: Array<string>;
  projectTaskNumber: Array<string>;
  status: any;
}

export interface Collection {
  adminEmail: string | null;
  createDate: Date;
  description: string;
  featured: boolean | null;
  findingAidUrl: boolean | null;
  id: string;
  keywords: Array<string>;
  model: Model;
  modifiedDate: Date;
  published: boolean;
  representativeImage: RepresentativeImage;
  title: string;
  visibility: Visibility;
}

export interface Model {
  application: string;
  name: string;
}

export interface RepresentativeImage {
  url: string;
  workId: string;
}

export interface UserFacets {
  [key: string]: string[];
}

enum VisibilityID {
  Authenticated = "AUTHENTICATED",
  Open = "OPEN",
  Restricted = "RESTRICTED",
}

// Equivalent to "AUTHENTICATED" | "OPEN" | "RESTRICTED"
type VisibilityIDStrings = keyof typeof VisibilityID;

export interface Visibility {
  id: VisibilityIDStrings;
  label: string;
  scheme: string;
}

export interface Work {
  accessionNumber: string;
  administrativeMetadata: AdministrativeMetadata;
  alternateTitle: Array<string>;
  batches: Array<string>;
  collection: {
    id: string;
    title: string;
  };
  collectionTitle: string;
  contributor: Array<string>;
  createDate: string;
  creator: Array<string>;
  dateCreated: Array<string>;
  description: Array<string>;
  descriptiveMetadata: any;
  // Do we really need this?
}

export interface WorkType {
  label: "Image" | "Audio" | "Video";
}

export interface FacetBucketAgg {
  key: string;
  doc_count: number;
}
export interface FilteredFacets {
  [key: string]: [FacetBucketAgg];
}
export interface FilteredFacet {
  facetId: string;
  buckets: Array<FacetBucketAgg>;
}

export interface FacetFilterValues {
  [key: string]: string;
}
