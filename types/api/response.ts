import { Collection } from "@nulib/dcapi-types";
import { Work } from "@nulib/dcapi-types";

export interface ApiResponse {
  data: ApiResponseData;
  info: {
    total: number;
  };
}

export interface ApiResponseAggregation {
  [key: string]: {
    buckets: ApiResponseBucket[];
  };
}

export interface ApiResponseFilteredAggregation {
  [key: string]: {
    [key: string]: {
      buckets: ApiResponseBucket[];
    };
  };
}

export type ApiResponseBucket = {
  doc_count: number;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type ApiResponseData = Collection | SearchShape[] | Work;

export interface ApiSearchResponse extends ApiResponse {
  aggregations?: ApiResponseAggregation | ApiResponseFilteredAggregation;
  data: SearchShape[];
  pagination: Pagination;
}

/**
 * Default shape for API response data property
 */
export type ApiResponseDataShape = Partial<Work>;

export interface Pagination {
  query_url: string;
  current_page: number;
  limit: number;
  offset: number;
  total_hits: number;
  total_pages: number;
  prev_url?: string;
  next_url?: string;
}

/**
 * Defined shapes for API response data property
 */
export type SearchShape = ApiResponseDataShape;
