import {
  Collection,
  PaginationInfo,
  RepresentativeFileSet,
  Visibility,
  Work,
} from "dcapi-types";

import { ModelName } from "@/types/api/generic";

export interface ApiCollectionResponse {
  data: Collection | null;
}

export interface ApiCollectionListResponse {
  data: Collection[] | null;
  pagination: PaginationInfo;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type ApiResponseData = Collection | SearchShape[] | Work;

export interface ApiSearchResponse extends ApiResponse {
  aggregations?: ApiResponseAggregation;
  data: SearchShape[];
  pagination: PaginationInfo;
}

/**
 * Default shape for API response data property
 */
export interface ApiResponseDataShape {
  api_model: ModelName;
  id: string;
  iiif_manifest?: string;
  representative_file_set: RepresentativeFileSet;
  thumbnail: string;
  title: string;
  visibility: Visibility;
}

/**
 * Response shape coming back from [API URL GOES HERE]/items/{id}
 */
export interface ApiWorkResponse {
  data: Work | undefined;
}
/**
 * Defined shapes for API response data property
 */
export interface SearchShape extends ApiResponseDataShape {
  work_type: string;
}
