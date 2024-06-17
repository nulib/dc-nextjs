import { Button, Clear, Input, SearchStyled } from "./Search.styled";
import {
  IconArrowForward,
  IconClear,
  IconSearch,
} from "@/components/Shared/SVG/Icons";
import React, {
  ChangeEvent,
  FocusEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import GenerativeAIToggle from "./GenerativeAIToggle";
import { UrlFacets } from "@/types/context/filter-context";
import { getAllFacetIds } from "@/lib/utils/facet-helpers";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

interface SearchProps {
  isSearchActive: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ isSearchActive }) => {
  const router = useRouter();
  const { ai, urlFacets } = useQueryParams();
  const { searchDispatch } = useSearchState();

  const searchRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFacets: UrlFacets = {};

    /* Guard against searching from a page with dynamic route params */
    const allFacetsIds = getAllFacetIds();

    // Account for the "similar" facet (comes from "View All" in sliders)
    allFacetsIds.push("similar");

    Object.keys(urlFacets).forEach((facetKey) => {
      if (allFacetsIds.includes(facetKey)) {
        updatedFacets[facetKey] = urlFacets[facetKey];
      }
    });

    searchDispatch({
      activeTab: ai ? "stream" : "results",
      type: "updateActiveTab",
    });

    router.push({
      pathname: "/search",
      query: {
        q: searchValue,
        ...(ai && { ai }),
        ...updatedFacets,
      },
    });
  };

  const handleSearchFocus = (e: FocusEvent) => {
    setSearchFocus(e.type === "focus");
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (router) {
      const { q } = router.query;
      if (q && searchRef.current) searchRef.current.value = q as string;
      setSearchValue(q as string);
    }
  }, [router]);

  useEffect(() => {
    !searchFocus && !searchValue ? isSearchActive(false) : isSearchActive(true);
  }, [searchFocus, searchValue, isSearchActive]);

  return (
    <>
      <SearchStyled
        ref={formRef}
        onSubmit={handleSubmit}
        data-testid="search-ui-component"
      >
        <Input
          id="dc-search"
          placeholder="Search by keyword or phrase, ex: Berkeley Music Festival"
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchFocus}
          ref={searchRef}
          name="search"
          role="search"
        />
        {searchValue && (
          <Clear onClick={clearSearchResults} type="reset">
            <IconClear />
          </Clear>
        )}
        <GenerativeAIToggle isSearchActive={!!searchValue} />
        <Button type="submit" data-testid="submit-button">
          Search <IconArrowForward />
        </Button>
        {isLoaded && <IconSearch />}
      </SearchStyled>
    </>
  );
};

export default Search;
