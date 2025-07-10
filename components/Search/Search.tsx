import { Button, SearchStyled } from "@/components/Search/Search.styled";
import React, {
  ChangeEvent,
  FocusEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import CollectionToggle from "./CollectionToggle";
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
  const {
    searchDispatch,
    searchState: { conversation, searchCollection },
  } = useSearchState();

  const searchRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const handleSubmit = (
    e?:
      | SyntheticEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e) e.preventDefault();

    const updatedFacets: UrlFacets = {};
    const allFacetsIds = getAllFacetIds();

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
      conversation: {
        ref: uuidv4(),
        initialQuestion: searchValue,
        context: searchCollection
          ? {
              works: [],
              query: searchValue,
              facets: [{ "collection.title.keyword": searchCollection }],
            }
          : undefined,
        turns: [
          {
            question: searchValue,
            answer: "",
            aggregations: [],
            works: [],
          },
        ],
      },
    });

    router.push({
      pathname: "/search",
      query: {
        q: searchValue,
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
    if (isChecked) {
      searchDispatch({
        type: "updateConversation",
        conversation: {
          ...conversation,
          ref: uuidv4(),
          turns: conversation.turns.slice(0, 1).map((turn) => ({
            ...turn,
            answer: "",
            aggregations: [],
            renderedContent: undefined,
            works: [],
          })),
        },
      });
    }
  }, [isChecked]);

  useEffect(() => {
    !searchFocus && !searchValue ? isSearchActive(false) : isSearchActive(true);
  }, [searchFocus, searchValue, isSearchActive]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
      <SearchStyled
        ref={formRef}
        onSubmit={handleSubmit}
        data-testid="search-ui-component"
        isFocused={searchFocus}
      >
        <SearchTextArea
          isAi={!!isChecked}
          isFocused={searchFocus}
          handleSearchChange={handleSearchChange}
          handleSearchFocus={handleSearchFocus}
          handleSubmit={handleSubmit}
          clearSearchResults={clearSearchResults}
          searchCollection={searchCollection}
          searchValue={searchValue}
          ref={searchRef}
        />
        <div>
          {isCollectionPage(router?.pathname) && <CollectionToggle />}
          <GenerativeAIToggle />
          <Button type="submit" data-testid="submit-button">
            Search
          </Button>
        </div>
        {isLoaded && <IconSearch />}
      </SearchStyled>
    </div>
  );
};

export default Search;
