import { useEffect, useState } from "react";
import { ApiSearchRequest } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { FacetsInstance } from "@/types/components/facets";
import { UrlFacets } from "@/types/context/filter-context";
import axios from "axios";
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
  urlFacets: UrlFacets;
};

const useFetchApiData = (obj: HookArguments): UseFetchApiDataResponse => {
  const { activeFacets, aggsFilterValue, searchTerm, size, urlFacets } = obj;
  const [request, setRequest] = useState<{
    data: ApiData;
    error: ApiError;
    loading: boolean;
  }>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    async function doRequest() {
      try {
        setRequest({
          ...request,
          loading: true,
        });

        const body: ApiSearchRequest = buildQuery({
          aggs: activeFacets,
          aggsFilterValue,
          size,
          term: searchTerm,
          urlFacets,
        });

        const response = await axios.post(DC_API_SEARCH_URL, body);
        setRequest({
          ...request,
          data: response.data,
          loading: false,
        });
      } catch (err) {
        setRequest({
          ...request,
          error: "Error loading data from useFetchApi",
        });
        console.error("error fetching API data", err);
      }
    }

    doRequest();
  }, [aggsFilterValue, searchTerm, size, urlFacets]);

  return { ...request };
};

export default useFetchApiData;
