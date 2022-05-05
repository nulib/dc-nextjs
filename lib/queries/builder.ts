import { buildSearchPart, querySearchTemplate } from "@/lib/queries/search";
import { ApiSearchRequest } from "@/types/api/request";
import { UserFacets } from "@/types/search-context";
import { buildFacetPart } from "@/lib/queries/facet";

export function buildQuery(term: string, userFacets: UserFacets) {
  let newQuery: ApiSearchRequest = JSON.parse(
    JSON.stringify(querySearchTemplate)
  );

  /**
   * Add search term to the API query
   */
  newQuery = addSearchTermToQuery(newQuery, term);

  /**
   * Add facets to the API query
   */
  newQuery = addFacetsToQuery(newQuery, userFacets);

  return newQuery;
}

export function addFacetsToQuery(
  query: ApiSearchRequest,
  userFacets: UserFacets
) {
  for (const [key, value] of Object.entries(userFacets)) {
    if (value?.length > 0) {
      query.query.bool.must.push(buildFacetPart(key, value));
    }
  }
  return query;
}

export function addSearchTermToQuery(query: ApiSearchRequest, term: string) {
  if (term) {
    query.query.bool.must.push(buildSearchPart(term));
  }
  return query;
}
