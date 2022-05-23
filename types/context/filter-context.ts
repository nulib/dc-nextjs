import { FacetsInstance } from "@/types/components/facets";
export interface FilterContextStore {
  recentFacet?: FacetsInstance;
  userFacetsUnsubmitted: UserFacetsUnsubmitted;
}

export interface UserFacetsUnsubmitted {
  [key: string]: string[];
}
