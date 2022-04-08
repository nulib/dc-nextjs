import { Collection } from "types";
import { GetGetResult } from "@elastic/elasticsearch/api/types";
import { RequestInit } from "node-fetch";
import { SearchResponse } from "types/elasticsearch";

const ES_PROXY = `https://dcapi.stack.rdc-staging.library.northwestern.edu`;
const PAGE_SIZE = 500;

const queryCollections = {
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
};

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
async function search<T>(
  requestConfig: RequestInit | any
): Promise<SearchResponse<T>> {
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
    const response: SearchResponse<Collection> = await search({
      ...defaultRequestConfig,
      body: {
        size: numResults,
        query: queryCollections,
        sort: {
          "title.keyword": "asc",
        },
      },
    });
    return response.hits.hits.map((hit) => ({ ...hit._source, id: hit._id }));
  } catch (error) {
    console.error("Error in getAllCollections", error);
    return Promise.resolve([]);
  }
}

export async function getAllCollectionIds(): Promise<Array<string>> {
  try {
    const res = await search({
      ...defaultRequestConfig,
      body: {
        size: 10000,
        query: queryCollections,
      },
    });
    const ids = res.hits.hits.map((hit) => hit._id);
    return ids;
  } catch (error) {
    console.error("Error getting Collection Ids:", error);
  }
  return [];
}

export async function getCollectionData(id: string): Promise<Collection> {
  try {
    const response = await fetch(`${ES_PROXY}/search/meadow/_all/${id}`, {
      ...defaultRequestConfig,
      method: "GET",
    });
    const data = (await response.json()) as GetGetResult;
    return data._source as Collection;
  } catch (error) {
    console.error("Error in elasticsearch-api.js > getCollectionData", error);
    return Promise.reject(new Error(`No collection with id ${id}`));
  }
}

export async function getCollectionItems(
  id: string,
  numResults: number = PAGE_SIZE
) {
  try {
    const response = await search({
      ...defaultRequestConfig,
      body: {
        size: numResults,
        query: {
          function_score: {
            query: {
              bool: {
                must: [
                  { match: { "model.name": "Work" } },
                  { match: { "collection.id": id } },
                ],
              },
            },
            boost: "5",
            random_score: {},
            boost_mode: "multiply",
          },
        },
      },
    });
    return response.hits.hits.map((hit) => hit._source);
    return [];
  } catch (error) {
    console.error("Error in getCollectionItems()", error);
    return Promise.resolve([]);
  }
}

export async function getWork(id: string): Promise<any> {
  try {
    const response = await fetch(`${ES_PROXY}/search/meadow/_all/${id}`, {
      ...defaultRequestConfig,
      method: "GET",
    });
    const data = (await response.json()) as GetGetResult;
    return data._source;
  } catch (error) {
    console.error("Error in elasticsearch-api.js > getWork", error);
    return Promise.reject(new Error(`No work with id ${id}`));
  }
}

export async function getWorkIds(): Promise<Array<string>> {
  try {
    const res = await search({
      ...defaultRequestConfig,
      body: {
        size: 10000,
        query: {
          bool: {
            must: [
              {
                match: {
                  "model.name": "Work",
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
      },
    });
    const ids = res.hits.hits.map((hit) => hit._id);
    return ids;
  } catch (error) {
    console.error("Error getting Work Ids:", error);
  }
  return [];
}
