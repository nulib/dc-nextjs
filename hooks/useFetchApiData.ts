import { useEffect, useState } from "react";
import { ApiSearchRequest } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { FacetsInstance } from "@/types/components/facets";
import { UserFacets } from "@/types/context/search-context";
import { buildQuery } from "@/lib/queries/builder";

type ApiData = ApiSearchResponse | null;
type ApiError = string | null;
export type UseFetchApiDataResponse = {
  data: ApiData;
  error: ApiError;
  loading: boolean;
};

type HookArguments = {
  activeFacets?: FacetsInstance[];
  aggsFilterValue?: string;
  searchTerm: string;
  size?: number;
  userFacets: UserFacets;
};

const useFetchApiData = (obj: HookArguments): UseFetchApiDataResponse => {
  const { activeFacets, aggsFilterValue, searchTerm, size, userFacets } = obj;
  const [data, setData] = useState<ApiData>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    const body: ApiSearchRequest = buildQuery({
      aggs: activeFacets,
      aggsFilterValue,
      size,
      term: searchTerm,
      userFacets,
    });

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
  }, [aggsFilterValue, searchTerm, userFacets]);

  return { data, error, loading };
};

export default useFetchApiData;
