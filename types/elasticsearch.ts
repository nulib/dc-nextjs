import {
  Client,
  // Object that contains the type definitions of every API method
  RequestParams,
  // Interface of the generic API response
  ApiResponse,
} from "@elastic/elasticsearch";
import { Collection, WorkType } from "./index";

// More info here at: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/typescript.html
// Complete definition of the Search response
export interface ShardsResponse {
  total: number;
  successful: number;
  failed: number;
  skipped: number;
}

export interface Explanation {
  value: number;
  description: string;
  details: Explanation[];
}

export interface SearchResponse<T> {
  took: number;
  timed_out: boolean;
  _scroll_id?: string;
  _shards: ShardsResponse;
  hits: HitsResponse;
  aggregations?: any;
}

export interface HitsResponse {
  total: number;
  max_score: number;
  hits: Hit[];
}

export interface Hit {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: Source;
  _version?: number;
  _explanation?: Explanation;
  fields?: any;
  highlight?: any;
  inner_hits?: any;
  matched_queries?: string[];
  sort?: string[];
}

export interface Source {
  accessionNumber: string;
  id: string;
  iiifManifest: string;
  thumbnail: string;
  title: string;
  workType: WorkType;
}
