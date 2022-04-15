import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { SearchResponse, Source } from "@/types/elasticsearch";
import { API_PRODUCTION_URL } from "@/lib/queries/endpoints";
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
  const [esData, setEsData] = useState<SearchResponse<Source>>();

  const { updateQuery } = useApiSearch();

  const getAPIData = useCallback(async () => {
    const response = await fetch(API_PRODUCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateQuery(searchTerm, userFacets)),
    });
    const data: SearchResponse<Source> = await response.json();
    if (esData !== data) return data;
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm !== q) setSearchTerm(q as string);
  }, [q]);

  useEffect(() => {
    const getData = async () => await getAPIData();
    getData()
      .then((data) => setEsData(data))
      .catch(console.error);
  }, [getAPIData]);

  return (
    <Layout data-testid="search-page-wrapper">
      <Heading as="h1" title="Search" isHidden 
      <Container containerType="wide">
        {esData && <Grid hits={esData?.hits} />}
      </Container>
    </Layout>
  );
};

export default SearchPage;
