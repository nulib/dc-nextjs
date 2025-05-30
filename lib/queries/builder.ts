import { buildSearchPart, querySearchTemplate } from "@/lib/queries/search";

import { AI_K_VALUE } from "@/lib/constants/common";
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

const searchPipeline = {
  phase_results_processors: [
    {
      "normalization-processor": {
        combination: {
          parameters: {
            weights: [0.25, 0.75],
          },
          technique: "arithmetic_mean",
        },
        normalization: {
          technique: "l2",
        },
      },
    },
  ],
};

export function buildQuery(obj: BuildQueryProps, isAI: boolean) {
  const { aggs, aggsFilterValue, size, term, urlFacets } = obj;
  const must: QueryDslQueryContainer[] = [];
  let queryValue;

  // Build the "must" part of the query
  if (term) must.push(buildSearchPart(term));

  if (Object.keys(urlFacets).length > 0) {
    must.push(addFacetsToQuery(urlFacets));

    if (Object.hasOwn(urlFacets, "similar")) {
      must.push(addMoreLikeThis(urlFacets));
    }
  }

  // User facets exist and we are not in AI chat mode
  if (must.length > 0 && !isAI) {
    queryValue = {
      bool: {
        must,
      },
    };
  }

  // We are in AI chat mode and a search term exists
  if (isAI && term) {
    queryValue = {
      hybrid: {
        queries: [
          {
            bool: {
              must: [
                {
                  query_string: {
                    default_operator: "OR",
                    fields: [
                      "title^10",
                      "collection.title^5",
                      "all_controlled_labels",
                      "all_ids^10",
                    ],
                    query: term,
                  },
                },
              ],
            },
          },
          {
            neural: {
              embedding: {
                filter: {
                  bool: !aggs
                    ? {
                        filter: buildFacetFilters(urlFacets),
                      }
                    : {},
                },
                k: AI_K_VALUE,
                model_id: process.env.NEXT_PUBLIC_OPENSEARCH_MODEL_ID,
                query_text: term, // if term has no value, the API returns a 400 error
              },
            },
          },
        ],
      },
    };
  }

  const requestBody = {
    ...querySearchTemplate,
    ...(queryValue && {
      query: queryValue,
    }),
    ...(isAI && {
      search_pipeline: searchPipeline,
    }),
    ...(aggs && { aggs: buildAggs(aggs, aggsFilterValue, urlFacets) }),
    ...(typeof size !== "undefined" && { size: size }),
    post_filter: {
      bool: {
        must: buildFacetFilters(urlFacets),
      },
    },
  } as ApiSearchRequestBody;

  return requestBody;
}

export function addFacetsToQuery(urlFacets: UrlFacets) {
  return {
    bool: {
      filter: buildFacetFilters(urlFacets),
    },
  };
}

function addMoreLikeThis(urlFacets: UrlFacets) {
  return {
    more_like_this: {
      fields: [
        "title",
        "description",
        "subject.label",
        "genre.label",
        "contributor.label",
        "creator.label",
      ],
      like: [
        {
          _id: urlFacets.similar[0],
        },
      ],
      max_query_terms: 10,
      min_doc_freq: 1,
      min_term_freq: 1,
    },
  };
}
