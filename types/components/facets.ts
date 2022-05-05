import { ApiResponseBucket } from "../api/response";

export interface AllFacets {
  facets: FacetsInstance[];
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
  type: "checkbox" | "radio";
}
