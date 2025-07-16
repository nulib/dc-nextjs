import type { AggregationResultMessage } from "types/components/chat";
import { Work } from "@nulib/dcapi-types";

export type ActiveTab = "stream" | "results";

export interface Article {
  question: string;
  answer: string;
}

export interface ChatContext {
  works: Work[];
  query: string;
  facets: Facet[];
}

// a facet looks { "subject.label": "Nigeria" } or { "collection.title.keyword": "E. H. Duckworth Photograph Collection" }

export interface Facet {
  [key: string]: string;
}

export interface Turn extends Article {
  aggregations: Omit<AggregationResultMessage, "type">["message"][];
  context?: ChatContext;
  /** Docs users can send along in addition to a question */
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
  searchCollection?: string;
  searchFixed: boolean;
}

export interface UserFacets {
  [key: string]: string[] | undefined;
}
