import { ApiResponseAggregation } from "@/types/api/response";
import { Work } from "@nulib/dcapi-types";

export type ActiveTab = "stream" | "results";

export interface SearchContextStore {
  aggregations?: ApiResponseAggregation;
  chat: {
    answer: string;
    documents: Work[];
    question: string;
  };
  searchFixed: boolean;
}

export interface UserFacets {
  [key: string]: string[] | undefined;
}
