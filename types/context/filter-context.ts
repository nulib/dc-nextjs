import { FacetsInstance } from "@/types/components/facets";
export interface FilterContextStore {
  lastFacetViewed?: FacetsInstance;
  userFacetsUnsubmitted: UserFacetsUnsubmitted;
}

export interface UserFacetsUnsubmitted {
  [key: string]: string[];
}
