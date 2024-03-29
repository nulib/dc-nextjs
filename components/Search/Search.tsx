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

import { ALL_FACETS } from "@/lib/constants/facets-model";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/router";

interface SearchProps {
  isSearchActive: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ isSearchActive }) => {
  const router = useRouter();
  const search = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { urlFacets } = useQueryParams();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Guard against searching from a page with dynamic route params */
    const facetIds = ALL_FACETS.facets.map((facet) => facet.id);

    // Account for the "similar" facet (comes from "View All" in sliders)
    facetIds.push("similar");

    const urlFacetsKeys = Object.keys(urlFacets);
    urlFacetsKeys.forEach((key) => {
      if (!facetIds.includes(key)) {
        delete urlFacets[key];
      }
    });

    router.push({
      pathname: "/search",
      query: { q: searchValue, ...urlFacets },
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
    if (search.current) search.current.value = "";
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
      if (q && search.current) search.current.value = q as string;
      setSearchValue(q as string);
    }
  }, [router]);

  useEffect(() => {
    !searchFocus && !searchValue ? isSearchActive(false) : isSearchActive(true);
  }, [searchFocus, searchValue, isSearchActive]);

  return (
    <SearchStyled
      ref={formRef}
      onSubmit={handleSubmit}
      data-testid="search-ui-component"
    >
      <Input
        placeholder="Search by keyword or phrase, ex: Berkeley Music Festival"
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
        onBlur={handleSearchFocus}
        ref={search}
        name="search"
        role="search"
      />
      {searchValue && (
        <Clear onClick={clearSearchResults} type="reset">
          <IconClear />
        </Clear>
      )}
      <Button type="submit" data-testid="submit-button">
        Search <IconArrowForward />
      </Button>
      {isLoaded && <IconSearch />}
    </SearchStyled>
  );
};

export default Search;
