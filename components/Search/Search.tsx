import { Button, SearchStyled } from "@/components/Search/Search.styled";
import { IconArrowForward, IconSearch } from "@/components/Shared/SVG/Icons";
import React, {
  ChangeEvent,
  FocusEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import GenerativeAIToggle from "./GenerativeAIToggle";
import SearchTextArea from "@/components/Search/TextArea";
import { UrlFacets } from "@/types/context/filter-context";
import { getAllFacetIds } from "@/lib/utils/facet-helpers";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/router";

interface SearchProps {
  isSearchActive: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ isSearchActive }) => {
  const router = useRouter();
  const { urlFacets } = useQueryParams();

  const { isChecked, handleCheckChange } = useGenerativeAISearchToggle();

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

    router.push({
      pathname: "/search",
      query: {
        q: searchValue,
        ...updatedFacets,
      },
    });
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
    if (router) {
      const { q } = router.query;
      if (q && searchRef.current) searchRef.current.value = q as string;
      setSearchValue(q as string);
    }
  }, [router]);

  useEffect(() => {
    !searchFocus && !searchValue ? isSearchActive(false) : isSearchActive(true);
  }, [searchFocus, searchValue, isSearchActive]);

  function handleCheckCallback() {
    handleSubmit();
  }

  return (
    <SearchStyled
      ref={formRef}
      onSubmit={handleSubmit}
      data-testid="search-ui-component"
      isFocused={searchFocus}
    >
      <SearchTextArea
        isAi={!!isChecked}
        isFocused={searchFocus}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        handleSearchFocus={handleSearchFocus}
        handleSubmit={handleSubmit}
        clearSearchResults={clearSearchResults}
        ref={searchRef}
      />
      <div>
        <GenerativeAIToggle checkChangeCallback={handleSubmit} />
        <Button type="submit" data-testid="submit-button">
          Search <IconArrowForward />
        </Button>
      </div>
      {isLoaded && <IconSearch />}
    </SearchStyled>
  );
};

export default Search;
