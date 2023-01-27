import { useEffect, useState } from "react";
import { ApiSearchRequestBody } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { FacetsInstance } from "@/types/components/facets";
import { UrlFacets } from "@/types/context/filter-context";
import { apiPostRequest } from "@/lib/dc-api";
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
        setRequest((request) => ({
          ...request,
          error: null,
          loading: true,
        }));

        const body: ApiSearchRequestBody = buildQuery({
          aggs: activeFacets,
          aggsFilterValue,
          size,
          term: searchTerm,
          urlFacets,
        });

        const responseData = await apiPostRequest<ApiSearchResponse>({
          body,
          url: DC_API_SEARCH_URL,
        });
        setRequest((request) => ({
          ...request,
          data: responseData || null,
          loading: false,
        }));
      } catch (err) {
        setRequest((request) => ({
          ...request,
          error: "Error loading data from useFetchApi",
          loading: false,
        }));
        console.error("error fetching API data", err);
      }
    }

    doRequest();
  }, [aggsFilterValue, searchTerm, setRequest, size, urlFacets]);

  return { ...request };
};

export default useFetchApiData;
