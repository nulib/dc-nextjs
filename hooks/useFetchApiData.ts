import { useEffect, useState } from "react";
import { ApiSearchRequest } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import { DC_API_SEARCH_URL } from "@/lib/endpoints";

// WIP: Messing with this
const useFetchApiData = (body: ApiSearchRequest, url = DC_API_SEARCH_URL) => {
  const [data, setData] = useState<ApiSearchResponse | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setLoading(true);
    setData(null);
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
        return Promise.reject();
      });
  }, [body, url]);

  return [data, error, loading];
};

export default useFetchApiData;
