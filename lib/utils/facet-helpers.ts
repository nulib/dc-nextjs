import { ALL_FACETS, FACETS } from "@/lib/constants/facets-model";
import { FacetsGroup, FacetsInstance } from "@/types/components/facets";

export const getFacetById = (id: string): FacetsInstance | undefined => {
  return ALL_FACETS.facets.find((facet) => facet.id === id);
};

export const getFacetGroup = (id: string): FacetsGroup | undefined => {
  return FACETS.find((group) => group.facets.find((facet) => facet.id === id));
};
