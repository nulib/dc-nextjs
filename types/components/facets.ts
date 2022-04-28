import { ApiResponseBucket } from "../api/response";

export interface FacetOption {
  bucket: ApiResponseBucket;
  facet: string;
  index: number;
  type: "checkbox" | "radio";
}
