import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Facets from "@/components/Facets/Facets";
import Grid from "@/components/Grid/Grid";
import Heading from "@/components/Heading/Heading";
import Layout from "@/components/layout";
import { NextPage } from "next";
import useFetchApiData from "@/hooks/useFetchApiData";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const {
    searchState: { userFacets },
  } = useSearchState();

  const [searchTerm, setSearchTerm] = useState<string>(q as string);

  const {
    data: apiData,
    error,
    loading,
  } = useFetchApiData(searchTerm, userFacets);

  useEffect(() => {
    if (searchTerm !== q) setSearchTerm(q as string);
  }, [q, searchTerm]);

  useEffect(() => {
    // di
  }, [apiData]);

  return (
    <Layout data-testid="search-page-wrapper">
      <Heading as="h1" isHidden>
        Northwestern
      </Heading>
      <Container containerType="wide">
        {loading && <p>loading...</p>}
        {error && <p>{error}</p>}
        {apiData && (
          <>
            <Facets aggregations={apiData.aggregations} />
            <Grid data={apiData.data} info={apiData.info} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default SearchPage;
