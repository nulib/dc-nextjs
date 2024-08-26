import * as Tabs from "@radix-ui/react-tabs";

import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";

import { ActiveTab } from "@/types/context/search-context";
import { ApiSearchRequestBody } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import Chat from "@/components/Chat/Chat";
import Container from "@/components/Shared/Container";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { HEAD_META } from "@/lib/constants/head-meta";
import Head from "next/head";
import Heading from "@/components/Heading/Heading";
import Icon from "@/components/Shared/Icon";
import { IconSparkles } from "@/components/Shared/SVG/Icons";
import Layout from "@/components/layout";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import { SEARCH_RESULTS_PER_PAGE } from "@/lib/constants/common";
import SearchOptions from "@/components/Search/Options";
import SearchResults from "@/components/Search/Results";
import { SearchResultsState } from "@/types/components/search";
import SearchSimilar from "@/components/Search/Similar";
import { SpinLoader } from "@/components/Shared/Loader.styled";
import { StyledResponseWrapper } from "@/components/Search/Search.styled";
import { UserContext } from "@/context/user-context";
import { apiPostRequest } from "@/lib/dc-api";
import axios from "axios";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { buildQuery } from "@/lib/queries/builder";
import { getWork } from "@/lib/work-helpers";
import { loadDefaultStructuredData } from "@/lib/json-ld";
import { parseUrlFacets } from "@/lib/utils/facet-helpers";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
import { useRouter } from "next/router";

const defaultSearchResultsState: SearchResultsState = {
  data: null,
  error: "",
  loading: true,
};

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { page, q } = router.query;

  const { user } = React.useContext(UserContext);
  const { isChecked: isAI } = useGenerativeAISearchToggle();

  const [activeTab, setActiveTab] = useState<ActiveTab>("results");

  const [searchResults, setSearchResults] = useState<SearchResultsState>(
    defaultSearchResultsState,
  );

  const [pageQueryUrl, setPageQueryUrl] = useState<string>();

  const [similarTo, setSimilarTo] = useState<{
    visible: boolean;
    work: { id: string; title: string };
  }>({
    visible: false,
    work: {
      id: "",
      title: "",
    },
  });

  const showStreamedResponse = Boolean(user?.isLoggedIn && isAI);
  const totalResults = searchResults.data?.pagination?.total_hits;

  /**
   * on a query change, we check to see if the user is using the AI and then
   * set the active tab to "stream" if they are, otherwise set it to "results"
   * this also persist the state of the active tab when the user filters search
   * results navigates pages
   */
  useEffect(() => {
    if (showStreamedResponse) {
      return setActiveTab("stream");
    }

    setActiveTab("results");
  }, [q, showStreamedResponse]);

  /**
   * Make requests to the search API endpoint
   */
  useEffect(() => {
    if (!router.isReady) return;

    // Reset search results state
    setSearchResults(defaultSearchResultsState);

    (async () => {
      try {
        const urlFacets = parseUrlFacets(router.query);
        const requestUrl = new URL(DC_API_SEARCH_URL);
        const pipeline = process.env.NEXT_PUBLIC_OPENSEARCH_PIPELINE;

        // If there is a "similar" facet, get the work and set the state
        if (urlFacets?.similar) {
          const workId = urlFacets.similar[0];
          const work = await getWork(workId);

          setSimilarTo({
            visible: true,
            work: {
              id: workId,
              title: work?.title || work?.accession_number || "",
            },
          });
        }

        const body: ApiSearchRequestBody = buildQuery(
          {
            size: SEARCH_RESULTS_PER_PAGE,
            term: q as string,
            urlFacets,
          },
          !!isAI,
        );

        // Request as a "hybrid" OpensSearch query
        // @ts-expect-error - 'hybrid' is not in Elasticsearch package types
        if (!!body?.query?.hybrid && pipeline) {
          requestUrl.searchParams.append("search_pipeline", pipeline);
        }
        const response = await apiPostRequest<ApiSearchResponse>({
          body,
          url: requestUrl.toString(),
        });

        /**
         * Construct url for page request
         */
        if (response) {
          const url = new URL(response.pagination.query_url);
          url.searchParams.append("page", page ? (page as string) : "1");
          setPageQueryUrl(url.toString());
        }
      } catch (err) {
        handleErrors(err);
      }
    })();
  }, [router.isReady, router.query, isAI]);

  /**
   * Get request for page results
   */
  useEffect(() => {
    if (!pageQueryUrl) return;
    (async () => {
      try {
        const response = await axios.get(pageQueryUrl);
        setSearchResults({
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

    setSearchResults((prevState) => ({
      ...prevState,
      error: message,
      loading: false,
    }));
  }

  function handleCloseSimilar() {
    const newQuery = { ...router.query };
    delete newQuery.similar;

    router.push({
      pathname: "/search",
      query: { ...newQuery },
    });
  }

  function handleViewResultsCallback() {
    setActiveTab("results");
  }

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

      <Layout
        data-testid="search-page-wrapper"
        title={HEAD_META["SEARCH"].title}
      >
        <StyledResponseWrapper>
          <Heading as="h1" isHidden>
            Northwestern
          </Heading>
          {similarTo?.visible && (
            <SearchSimilar
              handleClose={handleCloseSimilar}
              work={similarTo.work}
            />
          )}

          <Tabs.Root
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as ActiveTab)}
          >
            <SearchOptions
              tabs={
                <Tabs.List>
                  <Tabs.Trigger value="stream" data-tab="stream">
                    <Icon>
                      <IconSparkles />
                    </Icon>
                    AI Response
                  </Tabs.Trigger>
                  <Tabs.Trigger value="results" data-tab="results">
                    {Number.isInteger(totalResults) ? (
                      "View More Results"
                    ) : (
                      <SpinLoader size="small" />
                    )}
                  </Tabs.Trigger>
                </Tabs.List>
              }
              activeTab={activeTab}
              renderTabList={showStreamedResponse}
            />
            <Tabs.Content value="stream">
              <Chat
                totalResults={totalResults}
                viewResultsCallback={handleViewResultsCallback}
              />
            </Tabs.Content>

            <Tabs.Content value="results">
              <Container containerType="wide">
                <SearchResults {...searchResults} />
              </Container>
            </Tabs.Content>
          </Tabs.Root>
        </StyledResponseWrapper>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const dataLayer = buildDataLayer({
    pageTitle: "Search page",
  });

  const openGraphData = {
    "og:title": HEAD_META["SEARCH"].title,
    "og:url": `${PRODUCTION_URL}/search`,
  };

  return {
    props: { dataLayer, openGraphData },
  };
};

export default SearchPage;
