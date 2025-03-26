import { IconArrowBack, IconSparkles } from "@/components/Shared/SVG/Icons";
import {
  CheckboxIndicator,
  CheckboxRoot as CheckboxRootStyled,
} from "@/components/Shared/Checkbox.styled";
import { IconCheck } from "@/components/Shared/SVG/Icons";
import {
  SearchResultsLabel,
  StyledBackButton,
  StyledSearchPanel,
  StyledSearchPanelContent,
} from "./Panel.styled";
import { useEffect, useState, useRef } from "react";

import { ApiSearchRequestBody } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import BouncingLoader from "@/components/Shared/BouncingLoader";
import Container from "@/components/Shared/Container";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { SEARCH_RESULTS_PER_PAGE } from "@/lib/constants/common";
import SearchOptions from "@/components/Search/Options";
import SearchResults from "@/components/Search/Results";
import { SearchResultsState } from "@/types/components/search";
import { StyledInterstitialIcon } from "@/components/Chat/Response/Interstitial.styled";
import { apiPostRequest } from "@/lib/dc-api";
import { buildQuery } from "@/lib/queries/builder";
import { parseUrlFacets } from "@/lib/utils/facet-helpers";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

const defaultSearchResultsState: SearchResultsState = {
  data: null,
  error: "",
  loading: true,
};

const SearchPanel = () => {
  const router = useRouter();
  const { searchState, searchDispatch } = useSearchState();
  const [useFacetedDocs, setUseFacetedDocs] = useState(true);

  const {
    panel: { open, query, interstitial },
    conversation,
  } = searchState;

  const urlFacets = parseUrlFacets(router.query);
  const page = (router.query.page as string) || "1";

  const [searchResults, setSearchResults] = useState<SearchResultsState>(
    defaultSearchResultsState,
  );

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

      router.push({
        pathname: "/search",
        query: {
          q: query,
          ...urlFacets,
          page,
        },
      });

      try {
        const requestUrl = new URL(DC_API_SEARCH_URL);
        const body: ApiSearchRequestBody = buildQuery(
          {
            size: SEARCH_RESULTS_PER_PAGE,
            term: String(query),
            urlFacets,
          },
          true,
        );

        requestUrl.searchParams.append("page", page);
        const response = await apiPostRequest<ApiSearchResponse>({
          body,
          url: requestUrl.toString(),
        });

        setTimeout(() => {
          setSearchResults({
            data: response || null,
            error: "",
            loading: false,
          });
        }, 382);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [open, query, page, JSON.stringify(urlFacets)]);

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

    const docs = searchResults.data?.data;
    if (useFacetedDocs && docs) {
      searchDispatch({
        type: "updateConversation",
        conversation: {
          ...conversation,
          //@ts-ignore - docs is a Partial<Work>[], but latestDocs expects a Work[]
          latestDocs: docs.slice(0, 20),
        },
      });
    }

    searchDispatch({
      type: "updatePanel",
      panel: {
        open: false,
        query: undefined,
        interstitial: useFacetedDocs ? "latestdocs" : interstitial,
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
            <SearchOptions
              activeTab="results"
              renderTabList={true}
              tabs={<></>}
            />
            {query && (
              <SearchResultsLabel>
                <div>
                  <StyledBackButton onClick={handleBack}>
                    <IconArrowBack /> Back to conversation
                  </StyledBackButton>
                  {Boolean(Object.keys(urlFacets).length) && (
                    <div style={{ display: "flex" }}>
                      <CheckboxRootStyled
                        checked={useFacetedDocs}
                        id="useFacetedDocs"
                        onCheckedChange={() =>
                          setUseFacetedDocs(!useFacetedDocs)
                        }
                      >
                        <CheckboxIndicator>
                          <IconCheck />
                        </CheckboxIndicator>
                      </CheckboxRootStyled>
                      <label
                        htmlFor="use-faceted-docs"
                        data-selected={useFacetedDocs}
                      >
                        Add results to conversation
                      </label>
                    </div>
                  )}
                </div>

                <div>
                  <StyledInterstitialIcon>
                    <IconSparkles />
                  </StyledInterstitialIcon>
                  <label>
                    Search results for <strong>{query}</strong>
                  </label>
                </div>
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
