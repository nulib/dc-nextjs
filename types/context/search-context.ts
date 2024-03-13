import { ApiResponseAggregation } from "@/types/api/response";

export interface SearchContextStore {
  aggregations?: ApiResponseAggregation;
  searchFixed: boolean;
}

export interface UserFacets {
  [key: string]: string[] | undefined;
}
