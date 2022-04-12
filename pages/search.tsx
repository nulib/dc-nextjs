import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { SearchResponse, Source } from "@/types/elasticsearch";
import { API_PRODUCTION_URL } from "@/lib/queries/endpoints";
import useApiSearch from "@/hooks/useApiSearch";
import Grid from "@/components/Grid/Grid";
import Heading from "@/components/Heading/Heading";
import Layout from "@/components/layout";
import { useRouter } from "next/router";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;

  const [isQueried, setIsQueried] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const userFacets = {};

  const [esData, setEsData] = useState<SearchResponse<Source>>();
  const { updateQuery } = useApiSearch();

  useEffect(() => {
    if (searchTerm !== q) {
      setSearchTerm(q as string);
      setIsQueried(false);
    }
  }, [q]);

  const getAPIData = useCallback(async () => {
    const response = await fetch(API_PRODUCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateQuery(searchTerm, userFacets)),
    });
    const data: SearchResponse<Source> = await response.json();
    console.log(data);
    if (esData !== data) return data;
  }, [searchTerm, userFacets]);

  useEffect(() => {
    if (!isQueried) {
      async function fn() {
        const data = await getAPIData();
        setIsQueried(true);
        setEsData(data);
      }
      fn();
    }
  }, [getAPIData]);

  return (
    <Layout>
      <Heading as="h1" title="Search" isHidden />
      {esData && <Grid hits={esData?.hits} />}
    </Layout>
  );
};

export default SearchPage;
