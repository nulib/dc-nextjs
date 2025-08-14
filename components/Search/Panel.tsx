import {
  SearchResultsLabel,
  StyledBackButton,
  StyledSearchPanel,
  StyledSearchPanelContent,
} from "./Panel.styled";
import {
  convertUrlFacetsToContextFacets,
  parseUrlFacets,
} from "@/lib/utils/facet-helpers";
import { useEffect, useRef, useState } from "react";

import { ApiSearchRequestBody } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import BouncingLoader from "@/components/Shared/BouncingLoader";
import Container from "@/components/Shared/Container";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { IconArrowBack } from "@/components/Shared/SVG/Icons";
import { SEARCH_RESULTS_PER_PAGE } from "@/lib/constants/common";
import SearchOptions from "@/components/Search/Options";
import SearchResults from "@/components/Search/Results";
import SearchResultsMessage from "./ResultsMessage";
import { SearchResultsState } from "@/types/components/search";
import Stack from "../Chat/Stack/Stack";
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
  const [searchResultsLabel, setSearchResultsLabel] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultsState>(
    defaultSearchResultsState,
  );

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
    const context = {
      facets: convertUrlFacetsToContextFacets(urlFacets),
      query: query || "",
      works: [],
    };

    searchDispatch({
      type: "updateConversation",
      conversation: {
        ...conversation,
        stagedContext: context,
      },
    });

    const label = createResultsMessageFromContext(context);
    if (label) setSearchResultsLabel(label);
  }, [searchResults]);

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
            <SearchOptions activeTab="results" />
            {query && (
              <SearchResultsLabel>
                <StyledBackButton onClick={handleBack}>
                  <IconArrowBack /> Back to conversation
                  <Stack
                    context={{
                      facets: convertUrlFacetsToContextFacets(urlFacets),
                      query: query || "",
                      works: [],
                    }}
                    isDismissable={false}
                  />
                </StyledBackButton>
                {searchResultsLabel && (
                  <SearchResultsMessage
                    label={searchResultsLabel}
                    textAlign="right"
                  />
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
