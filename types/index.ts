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

export type ObjectLiteral =
  | {
      [key: string]: never;
    }
  | {
      [key: string]: string[];
    };

export type OpenGraphData = {
  "og:description": string;
  "og:image"?: string;
  "og:image:secure_url"?: string;
  "og:site_name": string;
  "og:title": string;
  "og:type": string;
  "og:url": string;
};

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

export interface WorkType {
  label: "Audio" | "Image" | "Video";
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
