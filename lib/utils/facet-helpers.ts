import { ALL_FACETS, FACETS } from "@/lib/constants/facets-model";
import { FacetsGroup, FacetsInstance } from "@/types/components/facets";

import { Facet } from "@/types/context/search-context";
import { UrlFacets } from "@/types/context/filter-context";

/**
 * Helper function which returns a regex pattern which
 * OpenSearch will make case insensitive queries against
 *
 * ie facetRegex("Berk") returns '.*(B|b)(E|e)(R|r)(K|k).*'
 */
export function facetRegex(str?: string) {
  if (!str) return "";

  const upper = str.toUpperCase().split("");
  const lower = str.toLowerCase().split("");
  const pattern = upper
    .map((char: string, index: number) => {
      const unique = [...new Set([char, lower[index]])];
      if (unique.length == 1) {
        return unique[0];
      } else {
        return `(${unique.join("|")})`;
      }
    })
    .join("");
  return `.*${pattern}.*`;
}

export const getAllFacetIds = () => {
  return ALL_FACETS.facets.map((facet) => facet.id);
};

export const getContextFacets = (urlFacets: UrlFacets): Facet[] => {
  return Object.entries(urlFacets).map(([key, value]) => ({
    field: key,
    value: Array.isArray(value) ? value.join(", ") : value,
  }));
};

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
  const urlFacets: UrlFacets = {};

  const allFacetIds = getAllFacetIds();

  for (const [key, value] of Object.entries(routerQuery)) {
    if (allFacetIds.includes(key) || key === "similar") {
      if (key && value) {
        urlFacets[key] = Array.isArray(value) ? value : [value];
      }
    }
  }

  return urlFacets;
};
