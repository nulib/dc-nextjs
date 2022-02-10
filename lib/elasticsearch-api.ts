import fetch from "node-fetch";
import { RequestInit } from "node-fetch";
import { Collection } from "types";

const ES_PROXY = `https://dcapi.stack.rdc-staging.library.northwestern.edu`;
const PAGE_SIZE = 500;

// More info here at: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/typescript.html
// Complete definition of the Search response
interface ShardsResponse {
  total: number;
  successful: number;
  failed: number;
  skipped: number;
}

interface Explanation {
  value: number;
  description: string;
  details: Explanation[];
}
interface SearchResponse {
  took: number;
  timed_out: boolean;
  _scroll_id?: string;
  _shards: ShardsResponse;
  hits: {
    total: number;
    max_score: number;
    hits: Array<{
      _index: string;
      _type: string;
      _id: string;
      _score: number;
      _source: Collection;
      _version?: number;
      _explanation?: Explanation;
      fields?: any;
      highlight?: any;
      inner_hits?: any;
      matched_queries?: string[];
      sort?: string[];
    }>;
  };
  aggregations?: any;
}

/**
 * API Network request default config
 */
const defaultRequestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Wrapper for Elasticsearch API /search network requests
 */
async function search(
  requestConfig: RequestInit
): Promise<Array<SearchResponse>> {
  const url = `${ES_PROXY}/search/meadow/_search`;
  const body = JSON.stringify(requestConfig.body || {});

  try {
    const response = await fetch(url, {
      ...requestConfig,
      body,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Error in elasticsearch-api.js: ${err}`);
  }
}

export async function getAllCollections(
  numResults: number = PAGE_SIZE
): Promise<Array<Collection>> {
  try {
    const response: SearchResponse = await search({
      ...defaultRequestConfig,
      body: {
        size: numResults,
        query: {
          bool: {
            must: [
              {
                match: {
                  "model.name": "Collection",
                },
              },
              {
                match: {
                  "model.application": "Meadow",
                },
              },
            ],
          },
        },
        sort: {
          "title.keyword": "asc",
        },
      },
    });
    return response.hits.hits.map((hit) => ({ id: hit._id, ...hit._source }));
  } catch (error) {
    console.error("Error in getAllCollections", error);
    return Promise.resolve([]);
  }
}
