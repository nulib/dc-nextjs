import { buildSearchPart, querySearchTemplate } from "@/lib/queries/search";

import { ApiSearchRequestBody } from "@/types/api/request";
import { FacetsInstance } from "@/types/components/facets";
import { QueryDslQueryContainer } from "@elastic/elasticsearch/api/types";
import { UrlFacets } from "@/types/context/filter-context";
import { buildAggs } from "@/lib/queries/aggs";
import { buildFacetFilters } from "@/lib/queries/facet";
import { isAiChatActive } from "../utils/get-url-search-params";

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
  let queryValue;

  const isAiChat = isAiChatActive();

  // Build the "must" part of the query
  if (term) must.push(buildSearchPart(term));

  if (Object.keys(urlFacets).length > 0) {
    must.push(addFacetsToQuery(urlFacets));

    if (Object.hasOwn(urlFacets, "similar")) {
      must.push(addMoreLikeThis(urlFacets));
    }
  }

  // User facets exist and we are not in AI chat mode
  if (must.length > 0 && !isAiChat) {
    queryValue = {
      bool: {
        must,
      },
    };
  }

  // We are in AI chat mode and a search term exists
  if (isAiChat && term) {
    queryValue = {
      hybrid: {
        queries: [
          {
            query_string: {
              /**
               * Reference available index keys/vars:
               * https://github.com/nulib/meadow/blob/deploy/staging/app/priv/elasticsearch/v2/settings/work.json
               */
              default_operator: "AND",
              fields: [
                "title^5",
                // "all_text", // we feel like neural should handle the all_text part
                "all_controlled_labels",
                "all_ids^5", // boost the all_ids field
              ],
              query: term,
            },
          },
          {
            neural: {
              embedding: {
                filter: {
                  bool: {
                    filter: buildFacetFilters(urlFacets),
                  },
                },
                k: size || 20,
                model_id: process.env.NEXT_PUBLIC_OPENSEARCH_MODEL_ID,
                query_text: term, // if term has no value, the API returns a 400 error
              },
            },
          },
        ],
      },
    };
  }

  return {
    ...querySearchTemplate,
    ...(queryValue && {
      query: queryValue,
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
