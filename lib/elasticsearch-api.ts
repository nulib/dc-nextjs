import fetch from "node-fetch";
import { RequestInit } from "node-fetch";
import { Collection } from "types";
import { SearchResponse } from "types/elasticsearch";
import { GetGetResult } from "@elastic/elasticsearch/api/types";

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
async function search(
  requestConfig: RequestInit | any
): Promise<SearchResponse> {
  const url = `${ES_PROXY}/search/meadow/_search`;
  const body = JSON.stringify(requestConfig.body || {});

  try {
    const response = await fetch(url, {
      ...requestConfig,
      body,
    });
    const data: any = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Error in elasticsearch-api.js: ${err}`);
  }
}

export async function getAllCollections(
  numResults: number = PAGE_SIZE
): Promise<Array<Collection>> {
  try {
    const response = await search({
      ...defaultRequestConfig,
      body: {
        size: numResults,
        query: queryCollections,
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
