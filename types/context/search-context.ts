import { Work } from "@nulib/dcapi-types";
import type { AggregationResultMessage } from "types/components/chat";

export type ActiveTab = "stream" | "results";

export interface Article {
  question: string;
  answer: string;
}

export interface Turn extends Article {
  aggregations: Omit<AggregationResultMessage, "type">["message"][];
  works: Work[][];
  renderedContent?: React.JSX.Element;
}

export interface SearchContextStore {
  conversation: {
    ref?: string;
    /** the question that kickstarts a conversation */
    initialQuestion: string;
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
