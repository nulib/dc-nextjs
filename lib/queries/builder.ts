import { buildSearchPart, querySearchTemplate } from "@/lib/queries/search";
import { ApiSearchRequest } from "@/types/api/request";
import { FacetsInstance } from "@/types/components/facets";
import { UrlFacets } from "@/types/context/filter-context";
import { buildAggs } from "@/lib/queries/aggs";
import { buildFacetFilters } from "@/lib/queries/facet";

type BuildQueryProps = {
  aggs?: FacetsInstance[];
  aggsFilterValue?: string;
  size?: number;
  term: string;
  urlFacets: UrlFacets;
};

export function buildQuery(obj: BuildQueryProps) {
  const { aggs, aggsFilterValue, size, term, urlFacets } = obj;
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
  newQuery = addFacetsToQuery(newQuery, urlFacets);

  /**
   * Add aggregations to the API query
   */
  if (aggs) newQuery.aggs = buildAggs(aggs, aggsFilterValue, urlFacets);

  return newQuery;
}

export function addFacetsToQuery(
  query: ApiSearchRequest,
  urlFacets: UrlFacets
) {
  /** Verify at least one user facet has been activated */
  if (Object.keys(urlFacets).length > 0) {
    /** 
     * It should end up looking like this:
     * 
      "bool": {
        "filter": [
            { "term": { "subject.label": "Berkeley (Calif.)" } },
            { "term": {  "subject.label": "Baez, Joan" } },
            { "term": {  "genre.label": "Photographs" } }
        ]
      }
     */

    query.query.bool.must.push({
      bool: {
        filter: buildFacetFilters(urlFacets),
      },
    });
  }

  return query;
}

export function addSearchTermToQuery(query: ApiSearchRequest, term: string) {
  if (term) {
    query.query.bool.must.push(buildSearchPart(term));
  }
  return query;
}
