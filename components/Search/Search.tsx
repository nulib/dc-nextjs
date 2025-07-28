import { Button, SearchStyled } from "@/components/Search/Search.styled";
import React, {
  ChangeEvent,
  FocusEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import GenerativeAIToggle from "@/components/Search/GenerativeAIToggle";
import { IconSearch } from "@/components/Shared/SVG/Icons";
import SearchJumpTo from "@/components/Search/JumpTo";
import SearchTextArea from "@/components/Search/TextArea";
import { UrlFacets } from "@/types/context/filter-context";
import { getAllFacetIds } from "@/lib/utils/facet-helpers";
import { isCollectionPage } from "@/lib/collection-helpers";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";
import { v4 as uuidv4 } from "uuid";

interface SearchProps {
  isSearchActive: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ isSearchActive }) => {
  const router = useRouter();
  const { urlFacets } = useQueryParams();

  const { isChecked } = useGenerativeAISearchToggle();
  const { searchDispatch } = useSearchState();

  const searchRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [searchScope, setSearchScope] = useState<string>("all");
  const [searchValue, setSearchValue] = useState<string>("");

  /**
   * Determine if the current page is a collection page
   * This is used to set the collection label for search queries.
   */
  const collectionLabel =
    typeof document !== "undefined" && isCollectionPage(router?.pathname)
      ? document
          .querySelector("meta[property='og:title']")
          ?.getAttribute("content") || undefined
      : undefined;

  const handleSubmit = (
    e?:
      | SyntheticEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e) e.preventDefault();

    setSearchFocus(false);
    const updatedFacets: UrlFacets = {};
    const allFacetsIds = getAllFacetIds();

    const conversation = {
      ref: uuidv4(),
      initialQuestion: searchValue,
      turns: [
        {
          question: searchValue,
          answer: "",
          aggregations: [],
          context: {
            query: searchValue,
            facets:
              searchScope === "collection" && collectionLabel
                ? [
                    {
                      "collection.title.keyword": collectionLabel,
                    },
                  ]
                : [],
            works: [],
          },
        },
      ],
    };

    // Account for the "similar" facet (comes from "View All" in sliders)
    allFacetsIds.push("similar");

    // Guard against searching from a page with dynamic route params
    Object.keys(urlFacets).forEach((facetKey) => {
      if (allFacetsIds.includes(facetKey)) {
        updatedFacets[facetKey] = urlFacets[facetKey];
      }
    });

    searchDispatch({
      type: "updatePanel",
      panel: {
        open: false,
        query: undefined,
        interstitial: undefined,
      },
    });

    searchDispatch({
      type: "updateConversation",
      conversation,
    });

    router.push({
      pathname: "/search",
      query: {
        q: searchValue,
        ...(searchScope === "collection" &&
          collectionLabel && { collection: collectionLabel }),
        ...updatedFacets,
      },
    });

    setSearchValue("");
    if (searchRef.current) searchRef.current.blur();
  };

  const handleSearchFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    setSearchFocus(e.type === "focus");
  };

  const handleSearchChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const clearSearchResults = () => {
    setSearchValue("");
    if (searchRef.current) searchRef.current.value = "";
    router.push({
      pathname: "/search",
      query: { ...urlFacets },
    });
  };

  useEffect(() => setIsLoaded(true), []);

  useEffect(() => {
    !searchFocus && !searchValue ? isSearchActive(false) : isSearchActive(true);
  }, [searchFocus, searchValue, isSearchActive]);

  const handleScopeValue = (value: string) => {
    switch (value) {
      case "all":
        if (formRef.current) {
          formRef.current.dataset.searchScope = "all";
          formRef.current.dataset.searchCollection = undefined;
          setSearchScope("all");
        }
        break;
      case "collection":
        if (formRef.current) {
          formRef.current.dataset.searchScope = "collection";
          formRef.current.dataset.searchCollection = collectionLabel;
          setSearchScope("collection");
        }
        break;
      default:
        if (formRef.current) {
          formRef.current.dataset.searchScope = "all";
          formRef.current.dataset.searchCollection = undefined;
          setSearchScope("all");
        }
        break;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
      <SearchStyled
        data-search-collection={collectionLabel}
        data-search-scope={searchScope}
        data-testid="search-ui-component"
        isFocused={searchFocus}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <SearchTextArea
          isAi={!!isChecked}
          isFocused={searchFocus}
          handleSearchChange={handleSearchChange}
          handleSearchFocus={handleSearchFocus}
          handleSubmit={handleSubmit}
          clearSearchResults={clearSearchResults}
          searchValue={searchValue}
          ref={searchRef}
        />
        <div>
          <GenerativeAIToggle />
          <Button type="submit" data-testid="submit-button">
            Search
          </Button>
        </div>
        {isLoaded && <IconSearch />}
      </SearchStyled>
      {isCollectionPage(router?.pathname) && (
        <div data-testid="search-jump-to">
          <SearchJumpTo
            handleOnClick={handleSubmit}
            handleScopeValue={handleScopeValue}
            searchFocus={searchFocus}
            searchValue={searchValue}
            top={searchRef.current?.scrollHeight || 0}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
