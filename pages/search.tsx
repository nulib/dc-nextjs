import React, { useEffect, useState } from "react";
import { ApiSearchResponse } from "@/types/api/response";
import Container from "@/components/Shared/Container";
import Facets from "@/components/Facets/Facets";
import Grid from "@/components/Grid/Grid";
import Heading from "@/components/Heading/Heading";
import Layout from "@/components/layout";
import { NextPage } from "next";
import { Pagination } from "@/components/Search/Pagination";
import axios from "axios";
import useFetchApiData from "@/hooks/useFetchApiData";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { q, page } = router.query;
  const {
    searchDispatch,
    searchState: { userFacets },
  } = useSearchState();

  const [paginatedData, setPaginatedData] =
    React.useState<ApiSearchResponse | null>();
  const [paginationRequest, setPaginationRequest] = useState({
    completed: false,
    isLoading: false,
  });

  const [searchTerm, setSearchTerm] = useState<string>(q as string);

  const size = 40;

  const {
    data: apiData,
    error,
    loading,
  } = useFetchApiData({ searchTerm, size, userFacets });

  useEffect(() => {
    if (searchTerm !== q) setSearchTerm(q as string);
  }, [q, searchTerm]);

  useEffect(() => {
    async function updateGridData() {
      const isIdle =
        !paginationRequest.completed && !paginationRequest.isLoading;

      if (page && paginatedData && isIdle) {
        const url = `${paginatedData?.pagination.query_url}/&page=${page}`;
        setPaginationRequest({ ...paginationRequest, isLoading: true });
        const result = await axios.get(url);
        setPaginatedData(result.data);
        setPaginationRequest({ completed: true, isLoading: false });
        return;
      }

      if (isIdle) {
        searchDispatch({
          aggregations: apiData?.aggregations,
          type: "updateAggregations",
        });
        apiData && setPaginatedData(apiData);
      }
    }
    updateGridData();
  }, [apiData, page, paginatedData, paginationRequest, searchDispatch]);

  if (!paginatedData) return null;

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
          <Grid data={paginatedData.data} info={apiData.info} />
          <Pagination pagination={paginatedData.pagination} />
        </Container>
      )}
    </Layout>
  );
};

export default SearchPage;
