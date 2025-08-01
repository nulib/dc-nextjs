import {
  CheckboxIndicator,
  CheckboxRoot as CheckboxRootStyled,
} from "@/components/Shared/Checkbox.styled";
import {
  SearchResultsLabel,
  SearchResultsLabelMessage,
  StyledBackButton,
  StyledIncludeResults,
  StyledSearchPanel,
  StyledSearchPanelContent,
} from "./Panel.styled";
import { getContextFacets, parseUrlFacets } from "@/lib/utils/facet-helpers";
import { useEffect, useRef, useState } from "react";

import { ApiSearchRequestBody } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import Balancer from "react-wrap-balancer";
import BouncingLoader from "@/components/Shared/BouncingLoader";
import type { CheckboxProps } from "@radix-ui/react-checkbox";
import Container from "@/components/Shared/Container";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { IconArrowBack } from "@/components/Shared/SVG/Icons";
import { IconCheck } from "@/components/Shared/SVG/Icons";
import { SEARCH_RESULTS_PER_PAGE } from "@/lib/constants/common";
import SearchOptions from "@/components/Search/Options";
import SearchResults from "@/components/Search/Results";
import SearchResultsMessage from "./ResultsMessage";
import { SearchResultsState } from "@/types/components/search";
import Stack from "../Chat/Stack/Stack";
import { StyledInterstitialIcon } from "@/components/Chat/Response/Interstitial.styled";
import { apiPostRequest } from "@/lib/dc-api";
import { buildQuery } from "@/lib/queries/builder";
import { createResultsMessageFromContext } from "@/lib/chat-helpers";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

const defaultSearchResultsState: SearchResultsState = {
  data: null,
  error: "",
  loading: true,
};

const SearchPanel = () => {
  const [searchResults, setSearchResults] = useState<SearchResultsState>(
    defaultSearchResultsState,
  );
  const [useDocsAsContext, setUseDocsAsContext] = useState(false);

  const didUrlFacetsChange = useRef(false);
  const router = useRouter();
  const { searchState, searchDispatch } = useSearchState();

  const {
    panel: { open },
    conversation,
  } = searchState;

  /**
   * Build the request URL and body for the search API
   * based on the current query and facets.
   */
  const query = router.query.q as string;
  const page = (router.query.page as string) || "1";
  const urlFacets = parseUrlFacets(router.query);

  const label = createResultsMessageFromContext({
    facets: getContextFacets(urlFacets),
    query,
    works: [],
  });

  const requestUrl = new URL(DC_API_SEARCH_URL);
  const body: ApiSearchRequestBody = buildQuery(
    {
      size: SEARCH_RESULTS_PER_PAGE,
      term: query || "",
      urlFacets,
    },
    true,
  );

  requestUrl.searchParams.append("page", page);

  const apiPostRequestObject = {
    body,
    url: requestUrl.toString(),
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    if (!query || isNavigatingBack.current) return;

    (async () => {
      setSearchResults({
        data: null,
        error: "",
        loading: true,
      });

      try {
        const response =
          await apiPostRequest<ApiSearchResponse>(apiPostRequestObject);

        setSearchResults({
          data: response || null,
          error: "",
          loading: false,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [JSON.stringify(apiPostRequestObject)]);

  useEffect(() => {
    // whenever there are search results, add them to the conversation context
    searchDispatch({
      type: "updateConversation",
      conversation: {
        ...conversation,
        stagedContext: {
          // @ts-ignore - data is a Partial<Work>[], but works expects a Work[]
          works: searchResults.data?.data.slice(0, 20),
          query: query || "",
          facets: Object.entries(urlFacets).map(([key, value]) => ({
            field: key,
            value: Array.isArray(value) ? value.join(",") : value,
          })),
        },
      },
    });
  }, [searchResults]);

  useEffect(() => {
    // if this is the first time the url facets are being set, set the useDocsAsContext to true
    // causing the checkbox to be checked
    if (!didUrlFacetsChange.current && Boolean(Object.keys(urlFacets).length)) {
      didUrlFacetsChange.current = true;
      setUseDocsAsContext(true);
      return;
    }

    // if the url facets are empty and the checkbox is checked, set the useDocsAsContext to false
    // causing the checkbox to be unchecked
    if (didUrlFacetsChange.current && !Boolean(Object.keys(urlFacets).length)) {
      didUrlFacetsChange.current = false;
      setUseDocsAsContext(false);
      return;
    }
  }, [urlFacets]);

  const handleCheckChange = (e: CheckboxProps["checked"]) => {
    setUseDocsAsContext(e?.valueOf() ? true : false);
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") handleBack();
  };

  const isNavigatingBack = useRef(false);
  const handleBack = async () => {
    isNavigatingBack.current = true;
    await router
      .push({
        pathname: "/search",
        query: {},
      })
      .then(() => (isNavigatingBack.current = false));

    searchDispatch({
      type: "updatePanel",
      panel: {
        open: false,
        query: undefined,
      },
    });

    if (!useDocsAsContext) {
      searchDispatch({
        type: "updateConversation",
        conversation: {
          ...conversation,
          stagedContext: undefined,
        },
      });
    }
  };

  return (
    <StyledSearchPanel
      isOpen={open}
      data-open={open}
      data-testid="search-panel"
    >
      <Container containerType="wide" className="search-panel">
        <StyledSearchPanelContent id="search-panel-content">
          <Container>
            <SearchOptions
              activeTab="results"
              renderTabList={true}
              tabs={<></>}
            />
            {query && (
              <SearchResultsLabel>
                <StyledBackButton onClick={handleBack}>
                  <IconArrowBack /> Back to conversation
                  {conversation.stagedContext?.works &&
                    conversation.stagedContext.works.length > 0 && (
                      <Stack
                        context={conversation.stagedContext}
                        isDismissable={false}
                      />
                    )}
                </StyledBackButton>
                {label && (
                  <SearchResultsMessage label={label} textAlign="right" />
                )}
              </SearchResultsLabel>
            )}
          </Container>
          {searchResults?.data ? (
            <SearchResults {...searchResults} />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
              }}
            >
              <BouncingLoader />
            </div>
          )}
        </StyledSearchPanelContent>
      </Container>
    </StyledSearchPanel>
  );
};

export default SearchPanel;
