import { useEffect, useState } from "react";
import { ApiSearchRequest } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import { DC_API_SEARCH_URL } from "@/lib/endpoints";
import { FacetsInstance } from "@/types/components/facets";
import { UserFacets } from "@/types/search-context";
import { buildQuery } from "@/lib/queries/builder";

type ApiData = ApiSearchResponse | null;
type ApiError = string | null;
type Response = {
  data: ApiData;
  error: ApiError;
  loading: boolean;
};

type HookArguments = {
  searchTerm: string;
  userFacets: UserFacets;
  activeFacets?: FacetsInstance[];
  size?: number;
};

const useFetchApiData = (obj: HookArguments): Response => {
  const { activeFacets, searchTerm, size, userFacets } = obj;
  const [data, setData] = useState<ApiData>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    // console.log(`userFacets useFetchApiData`, userFacets);

    const body: ApiSearchRequest = buildQuery(
      searchTerm,
      userFacets,
      activeFacets,
      size
    );

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
  }, [searchTerm, userFacets]);

  return { data, error, loading };
};

export default useFetchApiData;
