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
  const [requestState, setRequestState] = useState<RequestState>({
    data: null,
    error: "",
    loading: true,
  });
  const [pageQueryUrl, setPageQueryUrl] = useState<string>();

  /**
   * Post request to the search API endpoint for query and facet parameters
   */
  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      try {
        const { page, q } = router.query;
        const urlFacets = parseUrlFacets(router.query);
        const body: ApiSearchRequest = buildQuery({
          size,
          term: q as string,
          urlFacets,
        });

        const response = await axios.post(DC_API_SEARCH_URL, body);
        const { pagination } = response?.data;

        /**
         * Construct url for page request
         */
        const url = new URL(pagination.query_url);
        url.searchParams.append("page", page ? (page as string) : "1");
        setPageQueryUrl(url.toString());
      } catch (err) {
        handleErrors(err);
      }
    })();
  }, [router.isReady, router.query]);

  /**
   * Get request for page results
   */
  useEffect(() => {
    if (!pageQueryUrl) return;
    (async () => {
      try {
        const response = await axios.get(pageQueryUrl);
        setRequestState({
          data: response.data,
          error: "",
          loading: false,
        });
      } catch (err) {
        handleErrors(err);
      }
    })();
  }, [pageQueryUrl]);

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
        <Container containerType="wide">
          <div style={{ minHeight: "80vh" }}>
            {loading && <></>}
            {error && <p>{error}</p>}
            {apiData && (
              <>
                <Grid data={apiData.data} info={apiData.info} />
                <Pagination pagination={apiData.pagination} />
              </>
            )}
          </div>
        </Container>
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
