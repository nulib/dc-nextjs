import { addFacetsToQuery, addSearchTermToQuery } from "@/lib/queries/builder";
import { ALL_FACETS } from "@/lib/facets-model";
import { FacetsInstance } from "@/types/components/facets";
import { UserFacets } from "@/types/search-context";
import { queryModelPart } from "@/lib/queries/search";

type FacetFilterKey = string | undefined;

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const facetFilter = (
  facets: Array<FacetsInstance>,
  facetId: string
): FacetFilterKey => {
  return facets.find(({ id }) => id === facetId)?.field;
};

export const buildFacetFilterQuery = (
  searchTerm: string,
  facetId: string,
  term: string,
  userFacets: UserFacets
) => {
  const facetFilterKey = facetFilter(ALL_FACETS.facets, facetId);
  const regexp = userFacets[facetId];
  const excludes = regexp
    ? regexp.map((string) => escapeRegExp(string)).join("|")
    : null;

  let newQuery = JSON.parse(JSON.stringify(baseQuery(facetFilterKey, term)));

  /**
   * Add search term to the API query
   */
  newQuery = addSearchTermToQuery(newQuery, searchTerm);

  /**
   * Add facets to the API query
   */
  newQuery = addFacetsToQuery(newQuery, userFacets);

  /**
   * Add excludes to the API query
   */
  if (excludes) {
    newQuery.aggs.facetFilter.terms.exclude = excludes;
  }

  return newQuery;
};

const baseQuery = (facetFilterKey: FacetFilterKey, term: string) => {
  return {
    aggs: {
      facetFilter: {
        terms: {
          field: `${facetFilterKey}`,
          include: `.*${term}.*`,
          size: 20,
        },
      },
    },
    query: queryModelPart,
    size: 0,
  };
};
