import React, { useEffect, useState } from "react";
import { ApiSearchRequest } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import Container from "@/components/Shared/Container";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import Facets from "@/components/Facets/Facets";
import Grid from "@/components/Grid/Grid";
import Heading from "@/components/Heading/Heading";
import Layout from "@/components/layout";
import { NextPage } from "next";
import { Pagination } from "@/components/Search/Pagination";
import axios from "axios";
import { buildQuery } from "@/lib/queries/builder";
import { parseUrlFacets } from "@/lib/utils/facet-helpers";
import { useRouter } from "next/router";

type RequestState = {
  data: ApiSearchResponse | null;
  error: string | null;
  loading: boolean;
};

const SearchPage: NextPage = () => {
  const size = 40;
  const router = useRouter();
  const { q, page } = router.query;
  const [searchTerm, setSearchTerm] = useState<string>(q as string);
  const [requestState, setRequestState] = useState<RequestState>({
    data: null,
    error: "",
    loading: false,
  });

  /**
   * Direct request to the search API endpoint
   */
  const doSearchRequest = React.useCallback(async () => {
    try {
      setRequestState((prevRequestState) => ({
        ...prevRequestState,
        loading: true,
      }));
      const urlFacets = parseUrlFacets(router.query);
      const body: ApiSearchRequest = buildQuery({
        size,
        term: searchTerm,
        urlFacets,
      });

      return axios.post(DC_API_SEARCH_URL, body);
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      console.error("error fetching API data", message);
      setRequestState({
        data: null,
        error: message,
        loading: false,
      });
    }
  }, [router.query, searchTerm]);

  /**
   * Handle initial call to get search data
   */
  const apiRequest = React.useCallback(
    async function doRequest() {
      try {
        const response = await doSearchRequest();
        setRequestState({
          data: response?.data,
          error: "",
          loading: false,
        });
      } catch (err) {
        handleErrors(err);
      }
    },
    [doSearchRequest]
  );

  /**
   * Pagination request
   */
  const paginationRequest = React.useCallback(async () => {
    try {
      const apiResponse = await doSearchRequest();
      const url = `${apiResponse?.data?.pagination.query_url}/&page=${page}`;
      const response = await axios.get(url);
      setRequestState({
        data: response.data,
        error: "",
        loading: false,
      });
    } catch (err) {
      handleErrors(err);
    }
  }, [doSearchRequest, page]);

  /**
   * Handle decision whether to grab fresh search
   * data or paginated results data
   */
  useEffect(() => {
    if (!router.query) return;

    if (page) paginationRequest();
    else apiRequest();
  }, [apiRequest, page, paginationRequest, router.query]);

  /**
   * Handle any network errors
   */
  function handleErrors(err: Error | unknown) {
    let message: string;

    if (err instanceof Error) message = err.message;
    else message = String(err);
    console.error("Error getting paginated data", message);

    setRequestState((prevState) => ({
      ...prevState,
      error: message,
      loading: false,
    }));
  }

  /**
   * Handle search input change
   */
  useEffect(() => {
    if (searchTerm !== q) setSearchTerm(q as string);
  }, [q, searchTerm]);

  const { data: apiData, error, loading } = requestState;

  return (
    <Layout data-testid="search-page-wrapper">
      <Heading as="h1" isHidden>
        Northwestern
      </Heading>
      <Facets />
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
      {apiData && (
        <Container containerType="wide">
          <p>Total hits: {apiData.pagination.total_hits}</p>
          <Grid data={apiData.data} info={apiData.info} />
          <Pagination pagination={apiData.pagination} />
        </Container>
      )}
    </Layout>
  );
};

export default SearchPage;
