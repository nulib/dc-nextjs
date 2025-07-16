import { DCAPI_ENDPOINT, DC_API_SEARCH_URL } from "./constants/endpoints";
import axios, {
  AxiosError,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";

import type { ApiSearchRequestBody } from "@/types/api/request";
import { NextRouter } from "next/router";
import { getFacetById } from "@/lib/utils/facet-helpers";

interface ApiGetRequestParams {
  url: string;
}

interface ApiPostRequestParams {
  body?: ApiSearchRequestBody;
  url: string;
}

async function apiGetStatus(url: string) {
  return axios
    .head(url, { withCredentials: true })
    .then((response) => response.status)
    .catch((error) => error.response.status);
}

async function apiGetRawRequest<T>(
  obj: ApiGetRequestParams,
): Promise<AxiosResponse<T>> {
  const { url } = obj;

  return await axios({
    url,
    withCredentials: true,
  });
}

async function apiGetRequest<R>(
  obj: ApiGetRequestParams,
  rawResponse?: boolean,
): Promise<R | undefined> {
  const { url } = obj;

  try {
    const response = await axios({
      url,
      withCredentials: true,
    });
    const work = response.data?.data as R;
    // @ts-ignore
    return rawResponse ? (response as unknown) : work;
  } catch (err) {
    handleError(err);
    throw err;
  }
}

async function apiPostRequest<R>(
  obj: ApiPostRequestParams,
): Promise<R | undefined> {
  const { body, url } = obj;
  try {
    const response = await axios({
      data: body,
      method: "post",
      url,
      withCredentials: true,
    });
    const data = response.data as R;
    return data;
  } catch (err) {
    handleError(err);
  }
}

async function getIIIFResource<R>(
  uri: string | null,
  headers?: RawAxiosRequestHeaders,
): Promise<R | undefined> {
  if (!uri) return Promise.resolve(undefined);
  try {
    const response = await axios({
      url: uri,
      headers,
      withCredentials: Boolean(headers) ? false : true,
    });
    return response.data;
  } catch (err) {
    handleError(err);
  }
}

function iiifSearchUri(query: NextRouter["query"], size?: number): string {
  const url = new URL(DC_API_SEARCH_URL);

  const queries = Object.keys(query).map((key) => {
    if (key === "q") {
      return `(${query[key]})`;
    }

    const facet = getFacetById(key);
    const value = query[key];

    if (!facet || !value) {
      return "";
    }

    if (Array.isArray(value)) {
      return value.map((v) => `${facet.field}:"${v}"`).join(" AND ");
    }

    return `${facet.field}:"${value}"`;
  });

  if (queries.length) {
    url.searchParams.append("query", queries.join(" AND "));
  }

  if (size) url.searchParams.append("size", size.toString());
  url.searchParams.append("as", "iiif");

  return url.toString();
}

function iiifCollectionUri(id?: string, size?: number): string | undefined {
  if (!id) return;

  const url = new URL(`${DCAPI_ENDPOINT}/collections/${id}`);

  if (size) url.searchParams.append("size", size.toString());
  url.searchParams.append("as", "iiif");

  return url.toString();
}

function handleError(err: unknown) {
  const error = err as AxiosError;
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
}
export {
  apiGetRawRequest,
  apiGetRequest,
  apiGetStatus,
  apiPostRequest,
  getIIIFResource,
  handleError,
  iiifCollectionUri,
  iiifSearchUri,
};
