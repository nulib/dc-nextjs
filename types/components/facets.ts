import { ApiResponseBucket } from "../api/response";

export interface FacetsList {
  facets: FacetsInstance[];
}

export interface FacetsListWorkType extends FacetsList {
  facets: FacetsInstance[];
  options: string[];
}

export interface FacetsInstance {
  id: string;
  field: string;
  label: string;
}
export interface FacetsGroup {
  label: string;
  facets: FacetsInstance[];
}

export interface FacetOption {
  bucket: ApiResponseBucket;
  facet: string;
  index: number;
}

export type WorkTypeOptions = "All" | "Audio" | "Image" | "Video";
