import axios, { AxiosError } from "axios";
import { type ApiSearchRequestBody } from "@/types/api/request";

interface ApiGetRequestParams {
  url: string;
}

interface ApiPostRequestParams {
  body?: ApiSearchRequestBody;
  url: string;
}

async function apiGetRequest<R>(
  obj: ApiGetRequestParams
): Promise<R | undefined> {
  const { url } = obj;
  try {
    const response = await axios({
      url,
      withCredentials: true,
    });
    const data = response.data?.data as R;
    return data;
  } catch (err) {
    handleError(err);
  }
}

async function apiPostRequest<R>(
  obj: ApiPostRequestParams
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

async function getIIIFResource<R>(uri: string | null): Promise<R | undefined> {
  if (!uri) return Promise.resolve(undefined);
  try {
    const response = await axios({
      url: uri,
      withCredentials: true,
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
export { apiGetRequest, apiPostRequest, getIIIFResource };
