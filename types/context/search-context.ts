import { Work } from "@nulib/dcapi-types";
import type { AggregationResultMessage } from "types/components/chat";

export type ActiveTab = "stream" | "results";

export interface Article {
  question: string;
  answer: string;
}

export interface ChatContext {
  works: Work[];
  query: string;
  facets: UserFacets;
}

export interface Turn extends Article {
  aggregations: Omit<AggregationResultMessage, "type">["message"][];
  works: Work[][];
  /** Docs users can send along in addition to a question */
  context?: ChatContext;
  renderedContent?: React.JSX.Element;
}

export interface SearchContextStore {
  conversation: {
    ref?: string;
    /** the question that kickstarts a conversation */
    initialQuestion: string;
    context?: ChatContext;
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
