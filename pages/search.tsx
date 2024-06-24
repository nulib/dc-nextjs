import * as Tabs from "@radix-ui/react-tabs";

import { GetServerSideProps, NextPage } from "next";
import {
  NoResultsMessage,
  ResultsMessage,
  ResultsWrapper,
  StyledResponseWrapper,
} from "@/components/Search/Search.styled";
import React, { useEffect, useState } from "react";

import { ActiveTab } from "@/types/context/search-context";
import { ApiSearchRequestBody } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import Chat from "@/components/Chat/Chat";
import Container from "@/components/Shared/Container";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import Grid from "@/components/Grid/Grid";
import { HEAD_META } from "@/lib/constants/head-meta";
import Head from "next/head";
import Heading from "@/components/Heading/Heading";
import Icon from "@/components/Shared/Icon";
import { IconSparkles } from "@/components/Shared/SVG/Icons";
import Layout from "@/components/layout";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import PaginationAltCounts from "@/components/Search/PaginationAltCounts";
import SearchOptions from "@/components/Search/Options";
import SearchSimilar from "@/components/Search/Similar";
import { SpinLoader } from "@/components/Shared/Loader.styled";
import { UserContext } from "@/context/user-context";
import { apiPostRequest } from "@/lib/dc-api";
import axios from "axios";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { buildQuery } from "@/lib/queries/builder";
import { getWork } from "@/lib/work-helpers";
import { loadDefaultStructuredData } from "@/lib/json-ld";
import { parseUrlFacets } from "@/lib/utils/facet-helpers";
import { pluralize } from "@/lib/utils/count-helpers";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

type RequestState = {
  data: ApiSearchResponse | null;
  error: string | null;
  loading: boolean;
};

const SearchPage: NextPage = () => {
  const size = 40;
  const router = useRouter();

  const { user } = React.useContext(UserContext);
  const queryParams = useQueryParams();
  const { ai } = queryParams;
  const { searchState, searchDispatch } = useSearchState();
  const { activeTab } = searchState;

  const [requestState, setRequestState] = useState<RequestState>({
    data: null,
    error: "",
    loading: true,
  });
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

  const showStreamedResponse = Boolean(user?.isLoggedIn && ai);
  const { data: apiData, error, loading } = requestState;
  const totalResults = requestState.data?.pagination?.total_hits;

  /**
   * Make requests to the search API endpoint
   */
  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      try {
        const { page, q } = router.query;
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

        const body: ApiSearchRequestBody = buildQuery({
          size,
          term: q as string,
          urlFacets,
        });

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

  function handleCloseSimilar() {
    const newQuery = { ...router.query };
    delete newQuery.similar;

    router.push({
      pathname: "/search",
      query: { ...newQuery },
    });
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
            onValueChange={(value) =>
              searchDispatch({
                activeTab: value as ActiveTab,
                type: "updateActiveTab",
              })
            }
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
                      <>View {pluralize("Result", totalResults || 0)}</>
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
              <Chat totalResults={totalResults} />
            </Tabs.Content>

            <Tabs.Content value="results">
              <Container containerType="wide">
                <ResultsWrapper>
                  {loading && <></>}
                  {error && <p>{error}</p>}
                  {apiData && (
                    <>
                      {totalResults ? (
                        <ResultsMessage data-testid="results-count">
                          {pluralize("Result", totalResults)}
                        </ResultsMessage>
                      ) : (
                        <NoResultsMessage>
                          <strong>
                            Your search did not match any results.
                          </strong>{" "}
                          Please try broadening your search terms or adjusting
                          your filters.
                        </NoResultsMessage>
                      )}
                      <Grid data={apiData.data} info={apiData.info} />
                      {totalResults ? (
                        <PaginationAltCounts pagination={apiData.pagination} />
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </ResultsWrapper>
              </Container>
            </Tabs.Content>
          </Tabs.Root>
        </StyledResponseWrapper>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const isUsingAI = query?.ai === "true";

  const dataLayer = buildDataLayer({
    isUsingAI,
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
