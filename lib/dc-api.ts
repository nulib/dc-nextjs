import axios, { AxiosError, AxiosHeaders } from "axios";

import type { ApiSearchRequestBody } from "@/types/api/request";

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
  headers?: AxiosHeaders,
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

function handleError(err: unknown) {
  const error = err as AxiosError;
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
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
  apiGetRequest,
  apiGetStatus,
  apiPostRequest,
  getIIIFResource,
  handleError,
};
