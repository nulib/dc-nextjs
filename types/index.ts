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
