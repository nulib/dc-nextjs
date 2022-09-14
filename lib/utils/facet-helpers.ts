import { ALL_FACETS, FACETS } from "@/lib/constants/facets-model";
import { FacetsGroup, FacetsInstance } from "@/types/components/facets";
import { UrlFacets } from "@/types/context/filter-context";

export const getFacetById = (id: string): FacetsInstance | undefined => {
  return ALL_FACETS.facets.find((facet) => facet.id === id);
};

export const getFacetGroup = (id: string): FacetsGroup | undefined => {
  return FACETS.find((group) => group.facets.find((facet) => facet.id === id));
};

/**
 * Filter out "q" and "page" from the browser url query params
 * to get only facet query param data
 */
type NextJSRouterQuery = NodeJS.Dict<string[] | string>;
export const parseUrlFacets = (routerQuery: NextJSRouterQuery) => {
  if (!routerQuery) return {};
  const obj: UrlFacets = {};

  for (const [key, value] of Object.entries(routerQuery)) {
    if (!["q", "page"].includes(key)) {
      if (key && value) {
        obj[key] = Array.isArray(value) ? value : [value];
      }
    }
  }

  return obj;
};
