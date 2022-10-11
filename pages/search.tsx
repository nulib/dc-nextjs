import React, { useEffect, useState } from "react";
import { ApiSearchRequest } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import Container from "@/components/Shared/Container";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import Facets from "@/components/Facets/Facets";
import Grid from "@/components/Grid/Grid";
import Head from "next/head";
import Heading from "@/components/Heading/Heading";
import Layout from "@/components/layout";
import { NextPage } from "next";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import { Pagination } from "@/components/Search/Pagination";
import axios from "axios";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { buildQuery } from "@/lib/queries/builder";
import { loadDefaultStructuredData } from "@/lib/json-ld";
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
  const { page } = router.query;
  const [requestState, setRequestState] = useState<RequestState>({
    data: null,
    error: "",
    loading: false,
  });

  /**
   * Direct request to the search API endpoint
   */
  useEffect(() => {
    async function doRequest() {
      try {
        const urlFacets = parseUrlFacets(router.query);
        const body: ApiSearchRequest = buildQuery({
          size,
          term: router.query.q as string,
          urlFacets,
        });
        const response = await axios.post(DC_API_SEARCH_URL, body);
        setRequestState({
          data: response?.data,
          error: "",
          loading: false,
        });
      } catch (err) {
        handleErrors(err);
      }
    }
    if (!router.isReady) return;
    doRequest();
  }, [router.isReady, router.query]);

  /**
   * Pagination request
   */
  useEffect(() => {
    async function doPaginationRequest() {
      try {
        const url = `${requestState?.data?.pagination.query_url}/&page=${page}`;
        const response = await axios.get(url);
        setRequestState({
          data: response.data,
          error: "",
          loading: false,
        });
      } catch (err) {
        handleErrors(err);
      }
    }
    if (!requestState.data?.pagination.query_url || !page) return;
    doPaginationRequest();
  }, [page, requestState.data?.pagination.query_url]);

  /**
   * Handle any network errors
   */
  function handleErrors(err: Error | unknown) {
    let message: string;

    if (err instanceof Error) message = err.message;
    else message = String(err);
    console.error("Error getting data", message);

    setRequestState((prevState) => ({
      ...prevState,
      error: message,
      loading: false,
    }));
  }

  const { data: apiData, error, loading } = requestState;

  return (
    <>
      {/* Google Structured Data via JSON-LD */}
      <Head>
        <script
          key="app-ld-json"
          id="app-ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(loadDefaultStructuredData(), null, "\t"),
          }}
        />
      </Head>

      <Layout data-testid="search-page-wrapper">
        <Heading as="h1" isHidden>
          Northwestern
        </Heading>
        <Facets />
        {loading && <p>loading...</p>}
        {error && <p>{error}</p>}
        {apiData && (
          <Container containerType="wide">
            <p style={{ margin: "0 1rem" }}>
              Total hits: {apiData.pagination.total_hits}
            </p>
            <Grid data={apiData.data} info={apiData.info} />
            <Pagination pagination={apiData.pagination} />
          </Container>
        )}
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "Search page",
  });

  const openGraphData = {
    "og:url": `${PRODUCTION_URL}/contact`,
  };

  return {
    props: { dataLayer, openGraphData },
  };
}

export default SearchPage;
