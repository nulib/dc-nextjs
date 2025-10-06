import { ALL_FACETS } from "@/lib/constants/facets-model";
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

/**
 * { "subject.label": "Nigeria" } or
 * { "collection.title.keyword": "E. H. Duckworth Photograph Collection" }
 */
export type FacetKey = (typeof ALL_FACETS.facets)[number]["field"];
export type Facet = Partial<Record<FacetKey, string>>;

export interface Turn extends Article {
  aggregations: Omit<AggregationResultMessage, "type">["message"][];
  context?: ChatContext;
  renderedContent?: React.JSX.Element;
}

export interface SearchContextStore {
  conversation: {
    ref?: string;
    initialQuestion: string;
    stagedContext?: ChatContext;
    turns: Turn[];
  };
  panel: {
    interstitial?: string;
    open: boolean;
    query?: string;
  };
}

export interface UserFacets {
  [key: string]: string[] | undefined;
}
