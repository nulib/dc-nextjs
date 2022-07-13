import { ApiResponseAggregation } from "../api/response";

export interface SearchContextStore {
  aggregations?: ApiResponseAggregation[] | undefined;
  q: string;
  userFacets: UserFacets;
  searchFixed: boolean;
}

export interface UserFacets {
  [key: string]: string[];
}
