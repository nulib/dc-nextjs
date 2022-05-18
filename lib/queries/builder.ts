import { buildSearchPart, querySearchTemplate } from "@/lib/queries/search";
import { ApiSearchRequest } from "@/types/api/request";
import { FacetsInstance } from "@/types/components/facets";
import { UserFacets } from "@/types/search-context";
import { buildAggs } from "@/lib/queries/aggs";
import { buildFacetPart } from "@/lib/queries/facet";

type BuildQueryProps = {
  aggs?: FacetsInstance[];
  aggsFilterValue?: string;
  size?: number;
  term: string;
  userFacets: UserFacets;
};

export function buildQuery(obj: BuildQueryProps) {
  const { aggs, aggsFilterValue, size, term, userFacets } = obj;
  let newQuery: ApiSearchRequest = JSON.parse(
    JSON.stringify(querySearchTemplate)
  );

  if (typeof size !== undefined) newQuery.size = size as number;

  /**
   * Add search term to the API query
   */
  newQuery = addSearchTermToQuery(newQuery, term);

  /**
   * Add facets to the API query
   */
  newQuery = addFacetsToQuery(newQuery, userFacets);

  /**
   * Add aggregations to the API query
   */
  if (aggs) newQuery.aggs = buildAggs(aggs, aggsFilterValue, userFacets);

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
