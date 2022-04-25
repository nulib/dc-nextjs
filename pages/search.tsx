import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import useApiSearch from "@/hooks/useApiSearch";
import Container from "@/components/Container";
import Grid from "@/components/Grid/Grid";
import Heading from "@/components/Heading/Heading";
import Layout from "@/components/layout";
import { getAPIData } from "@/lib/dc-api";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;

  /**
   * @todo: make getUseFacets() a hook.
   */

  const [userFacets, setUserFacets] = useState<[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(q as string);
  const [searchResponse, setSearchResponse] = useState<any>();

  const { updateQuery } = useApiSearch();

  const buildBody = useCallback(
    (updateQuery) => updateQuery(searchTerm, userFacets),
    [searchTerm, userFacets]
  );

  useEffect(() => {
    if (searchTerm !== q) setSearchTerm(q as string);
  }, [q, searchTerm]);

  useEffect(() => {
    const body: any = buildBody(updateQuery);
    const getData = async () => await getAPIData(body);
    getData()
      .then((data) => setSearchResponse(data))
      .catch(console.error);
  }, [buildBody, updateQuery]);

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
