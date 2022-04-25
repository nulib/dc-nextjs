import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import useApiSearch from "@/hooks/useApiSearch";
import Container from "@/components/Container";
import Grid from "@/components/Grid/Grid";
import Heading from "@/components/Heading/Heading";
import Layout from "@/components/layout";
import { getAPIData } from "@/lib/dc-api";
import { ApiSearchRequest } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;

  /**
   * @todo: make getUseFacets() a hook.
   */

  const [userFacets, setUserFacets] = useState({});
  const [searchTerm, setSearchTerm] = useState<string>(q as string);
  const [searchResponse, setSearchResponse] = useState<ApiSearchResponse>();

  const { updateQuery } = useApiSearch();

  const buildBody = useCallback(
    () => updateQuery(searchTerm, userFacets),
    [searchTerm, userFacets]
  );

  useEffect(() => {
    if (searchTerm !== q) setSearchTerm(q as string);
  }, [q, searchTerm]);

  useEffect(() => {
    const body: ApiSearchRequest = buildBody();
    const getData = async () => await getAPIData(body);
    getData()
      .then((data) => setSearchResponse(data))
      .catch(console.error);
  }, [buildBody]);

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
