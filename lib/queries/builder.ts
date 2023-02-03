import { buildSearchPart, querySearchTemplate } from "@/lib/queries/search";
import { ApiSearchRequestBody } from "@/types/api/request";
import { FacetsInstance } from "@/types/components/facets";
import { QueryDslQueryContainer } from "@elastic/elasticsearch/api/types";
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

  const must: QueryDslQueryContainer[] = [];
  if (term) must.push(buildSearchPart(term));
  if (Object.keys(urlFacets).length > 0) must.push(addFacetsToQuery(urlFacets));

  return {
    ...querySearchTemplate,
    ...(must.length > 0 && {
      query: {
        bool: {
          must: must,
        },
      },
    }),
    ...(aggs && { aggs: buildAggs(aggs, aggsFilterValue, urlFacets) }),
    ...(typeof size !== "undefined" && { size: size }),
  } as ApiSearchRequestBody;
}

export function addFacetsToQuery(urlFacets: UrlFacets) {
  return {
    bool: {
      filter: buildFacetFilters(urlFacets),
    },
  };
}
