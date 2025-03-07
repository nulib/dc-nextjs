import {
  ApiResponseAggregation,
  ApiResponseFilteredAggregation,
} from "@/types/api/response";
import { Work } from "@nulib/dcapi-types";

export type ActiveTab = "stream" | "results";

export interface Article {
  question: string;
  answer: string;
}

export interface Turn extends Article {
  aggregations: (ApiResponseAggregation | ApiResponseFilteredAggregation)[];
  works: Work[];
}

export interface SearchContextStore {
  conversation: {
    ref?: string;
    turns: Turn[];
  };
  panel: {
    interstitial?: string;
    open: boolean;
    query?: string;
  };
  searchFixed: boolean;
}

export interface UserFacets {
  [key: string]: string[] | undefined;
}
