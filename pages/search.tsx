import * as Tabs from "@radix-ui/react-tabs";

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
import { Button } from "@nulib/design-system";
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
import { NextPage } from "next";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import PaginationAltCounts from "@/components/Search/PaginationAltCounts";
import SearchOptions from "@/components/Search/Options";
import SearchSimilar from "@/components/Search/Similar";
import { SpinLoader } from "@/components/Shared/Loader.styled";
import { StyledResponseActions } from "@/components/Chat/Response/Response.styled";
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
  const { searchTerm, ai } = queryParams;
  const { searchState, searchDispatch } = useSearchState();
  const {
    activeTab,
    chat: { question },
  } = searchState;

  const showStreamedResponse = Boolean(user?.isLoggedIn && ai);
  const checkScrollRef = React.useRef<() => void>();

  const [isStreamComplete, setIsStreamComplete] = useState(false);
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

  useEffect(() => {
    setIsStreamComplete(question === searchTerm);
  }, [question, searchTerm]);

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
        if (!!body?.query?.hybrid) {
          requestUrl.searchParams.append(
            "search_pipeline",
            "dc-v2-work-pipeline"
          );
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

  function handleResultsTab() {
    if (window.scrollY === 0) {
      searchDispatch({ activeTab: "results", type: "updateActiveTab" });
      return;
    }

    window.scrollTo({ behavior: "instant", top: 0 });

    const checkScroll = () => {
      if (window.scrollY === 0) {
        searchDispatch({ activeTab: "results", type: "updateActiveTab" });
        window.removeEventListener("scroll", checkScroll);
      }
    };

    checkScrollRef.current = checkScroll;
    window.addEventListener("scroll", checkScroll);
  }

  function handleNewQuestion() {
    const input = document.getElementById("dc-search") as HTMLInputElement;
    if (input) {
      input.focus();
      input.value = "";
    }
  }

  useEffect(() => {
    return () => {
      // Clean up the event listener when the component unmounts
      if (checkScrollRef.current) {
        window.removeEventListener("scroll", checkScrollRef.current);
      }
    };
  }, []);

  const { data: apiData, error, loading } = requestState;
  const totalResults = requestState.data?.pagination.total_hits;

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
        <StyledResponseWrapper isAiResponse={showStreamedResponse}>
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
              <Chat />
              {isStreamComplete && (
                <Container>
                  <StyledResponseActions>
                    <Button isPrimary isLowercase onClick={handleResultsTab}>
                      View {pluralize("Result", totalResults || 0)}
                    </Button>
                    <Button isLowercase onClick={handleNewQuestion}>
                      Ask another Question
                    </Button>
                  </StyledResponseActions>
                </Container>
              )}
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

export async function getStaticProps() {
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
}

export default SearchPage;
