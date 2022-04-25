export interface ApiResponse {
  data: ApiResponseData;
  info: {
    total: number;
  };
}

interface ApiResponseAggregation {
  buckets: Bucket[];
  id: string;
}

export type ApiResponseData = CollectionShape[] | WorkShape[];

export interface ApiResponseDataShape {
  accession_number: string;
  id: string;
  thumbnail: string;
  title: string;
}

export interface ApiSearchResponse extends ApiResponse {
  aggregations?: ApiResponseAggregation[];
}

type Bucket = {
  doc_count: number;
  key: string;
};

export interface CollectionShape extends ApiResponseDataShape {
  foo?: string;
}

export interface WorkShape extends ApiResponseDataShape {
  foo?: string;
}
