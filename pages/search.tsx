import React, { useEffect, useState } from "react";
import { ApiSearchRequest } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import Container from "@/components/Container";
import Grid from "@/components/Grid/Grid";
import Heading from "@/components/Heading/Heading";
import Layout from "@/components/layout";
import { NextPage } from "next";
import { buildQuery } from "@/lib/queries/builder";
import { getAPIData } from "@/lib/dc-api";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const {
    searchState: { userFacets },
  } = useSearchState();
  console.log("userFacets", userFacets);

  const [searchTerm, setSearchTerm] = useState<string>(q as string);
  const [searchResponse, setSearchResponse] = useState<ApiSearchResponse>();

  useEffect(() => {
    if (searchTerm !== q) setSearchTerm(q as string);
  }, [q, searchTerm]);

  useEffect(() => {
    console.log("EFFECTED");
    const body: ApiSearchRequest = buildQuery(searchTerm, userFacets);

    getAPIData(body)
      .then((data) => setSearchResponse(data))
      .catch(console.error);
  }, [searchTerm, userFacets]);

  return (
    <Layout data-testid="search-page-wrapper">
      <Heading as="h1" title="Search" isHidden />
      <Container containerType="wide">
        {searchResponse && (
          <Grid data={searchResponse.data} info={searchResponse.info} />
        )}
      </Container>
    </Layout>
  );
};

export default SearchPage;
