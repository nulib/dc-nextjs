import { ApiResponseAggregation } from "@/types/api/response";

export type ActiveTab = "stream" | "results";

export interface Article {
  question: string;
  answer: string;
}

export interface SearchContextStore {
  aggregations?: ApiResponseAggregation;
  conversation: {
    body: Article[];
    ref?: string;
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
