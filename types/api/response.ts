import { CollectionShape } from "@/types/components/collections";
import { ModelName } from "@/types/api/generic";
import { WorkShape } from "@/types/components/works";

export interface ApiCollectionResponse {
  data: CollectionShape | null;
}

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

export type ApiResponseBucket = {
  doc_count: number;
  key: string;
};

export type ApiResponseData = CollectionShape | SearchShape[] | WorkShape;

export interface ApiSearchResponse extends ApiResponse {
  aggregations?: ApiResponseAggregation;
  data: SearchShape[];
  pagination: Pagination;
}

/**
 * Default shape for API response data property
 */
export interface ApiResponseDataShape {
  accession_number: string;
  api_model: ModelName;
  id: string;
  iiif_manifest?: string;
  thumbnail: string;
  title: string;
}

/**
 * Response shape coming back from [API URL GOES HERE]/items/{id}
 */
export interface ApiWorkResponse {
  data: WorkShape | undefined;
}

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
export interface SearchShape extends ApiResponseDataShape {
  work_type: string;
}
