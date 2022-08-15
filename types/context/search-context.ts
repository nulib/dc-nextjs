import { ApiResponseAggregation } from "../api/response";

export interface SearchContextStore {
  aggregations?: ApiResponseAggregation;
  q: string;
  userFacets: UserFacets;
  searchFixed: boolean;
}

export interface UserFacets {
  [key: string]: string[];
}
