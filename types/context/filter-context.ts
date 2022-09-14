import { FacetsInstance } from "@/types/components/facets";
export interface FilterContextStore {
  recentFacet?: FacetsInstance;
  userFacetsUnsubmitted: UrlFacets;
}

export type UrlFacets =
  | {
      [key: string]: never;
    }
  | {
      [key: string]: string[];
    };
