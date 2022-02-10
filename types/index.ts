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
