import { useEffect, useState } from "react";
import { ApiSearchRequest } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";

type ApiData = ApiSearchResponse | null;
type ApiError = string | null;
type Response = {
  data: ApiData;
  error: ApiError;
  loading: boolean;
};

type HookArguments = {
  body?: ApiSearchRequest;
  url: string;
};

const useFetch = (obj: HookArguments): Response => {
  const { body, url } = obj;
  const [data, setData] = useState<ApiData>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetch(DC_API_SEARCH_URL, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setData(json);
      })
      .catch((err) => {
        setLoading(false);
        setError("Error fetching API data");

        console.error("error fetching API data", err);
      });
  }, [body, url]);

  return { data, error, loading };
};

export default useFetch;
