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

export const convertUrlFacetsToContextFacets = (
  urlFacets: UrlFacets,
): Facet[] => {
  // url facets may look like [{ "collection": [ "Aldridge Collection" ] }]
  // we need to lookup the field by its and return field
  return Object.entries(urlFacets).map(([key, value]) => {
    const facet = getFacetById(key);
    if (!facet) return {};

    return { [facet?.field]: Array.isArray(value) ? value.join(", ") : value };
  });
};

export const convertContextFacetsToUrlFacets = (
  contextFacets: Facet[],
): UrlFacets => {
  return contextFacets.reduce((acc: UrlFacets, facet) => {
    const field = getFacetByField(Object.keys(facet)[0]);
    if (!field) return acc;

    const value = facet[field?.field];
    if (!value) return acc;

    acc[field.id] = Array.isArray(value) ? value : [value];
    return acc;
  }, {});
};

export const getFacetByField = (field: string): FacetsInstance | undefined => {
  return ALL_FACETS.facets.find((facet) => facet.field === field);
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
