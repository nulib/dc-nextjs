import { IconArrowBack, IconSparkles } from "@/components/Shared/SVG/Icons";
import {
  SearchResultsLabel,
  StyledBackButton,
  StyledSearchPanel,
  StyledSearchPanelContent,
} from "./Panel.styled";
import { useEffect, useState } from "react";

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

  const {
    panel: { open, query, interstitial },
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
    if (!query) return;

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
            size: 10, // SEARCH_RESULTS_PER_PAGE
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

  const handleBack = () => {
    router.push({
      pathname: "/search",
      query: {},
    });

    searchDispatch({
      type: "updatePanel",
      panel: {
        open: false,
        query: undefined,
        interstitial,
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
                <StyledBackButton onClick={handleBack}>
                  <IconArrowBack /> Back to conversation
                </StyledBackButton>

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
