import { addFacetsToQuery, addSearchTermToQuery } from "@/lib/queries/builder";
import { ALL_FACETS } from "@/lib/facets-model";
import { FacetsInstance } from "@/types/components/facets";
import { UserFacets } from "@/types/search-context";
import { queryModelPart } from "@/lib/queries/search";

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const facetFilter = (facets: Array<FacetsInstance>, facetLabel: string) => {
  return facets.find(({ id }) => id === facetLabel)?.field;
};

export const facetFilterQuery = (
  searchTerm: string,
  facetLabel: string,
  term: string,
  userFacets: UserFacets
) => {
  const facetFilterKey = facetFilter(ALL_FACETS.facets, facetLabel);
  const newQuery = {
    ...buildFacetFilterQuery(
      searchTerm,
      facetFilterKey,
      facetLabel,
      term,
      userFacets
    ),
  };
  return newQuery;
};

export const buildFacetFilterQuery = (
  searchTerm: string,
  facetField: any,
  facetLabel: string,
  term: any,
  userFacets: UserFacets
) => {
  const regexp = userFacets[facetLabel];
  const excludes = regexp
    ? regexp.map((string) => escapeRegExp(string)).join("|")
    : null;

  let newQuery = JSON.parse(
    JSON.stringify(baseQuery(facetField, term, excludes))
  );

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

const baseQuery = (facetField: any, term: any, excludes: any) => {
  return {
    aggs: {
      facetFilter: {
        terms: {
          field: `${facetField}`,
          include: `.*${term}.*`,
          size: 20,
        },
      },
    },
    query: queryModelPart,
    size: 0,
  };
};
