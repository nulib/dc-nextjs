import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { SearchResponse, Source } from "@/types/elasticsearch";
import { DC_API_SEARCH_URL } from "@/lib/queries/endpoints";
import useApiSearch from "@/hooks/useApiSearch";
import Grid from "@/components/Grid/Grid";
import Heading from "@/components/Heading/Heading";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Container from "@/components/Container";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;

  /**
   * @todo: make getUseFacets() a hook.
   */
  const userFacets = {};
  const [searchTerm, setSearchTerm] = useState<string>(q as string);
  const [searchResponse, setSearchResponse] = useState<any>();

  const { updateQuery } = useApiSearch();

  const getAPIData = useCallback(async () => {
    const response = await fetch(DC_API_SEARCH_URL, {
      body: JSON.stringify(updateQuery(searchTerm, userFacets)),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data: any = await response.json();
    console.log("data", data);
    if (searchResponse !== data) return data;
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm !== q) setSearchTerm(q as string);
  }, [q, searchTerm]);

  useEffect(() => {
    const getData = async () => await getAPIData();
    getData()
      .then((data) => setSearchResponse(data))
      .catch(console.error);
  }, [getAPIData]);

  return (
    <Layout data-testid="search-page-wrapper">
      <Heading as="h1" title="Search" isHidden />
      <Container containerType="wide">
        {searchResponse && <Grid {...searchResponse} />}
      </Container>
    </Layout>
  );
};

export default SearchPage;
