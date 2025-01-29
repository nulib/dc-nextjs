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

import GenerativeAIToggle from "@/components/Search/GenerativeAIToggle";
import SearchJumpTo from "@/components/Search/JumpTo";
import SearchTextArea from "@/components/Search/TextArea";
import { UrlFacets } from "@/types/context/filter-context";
import { getAllFacetIds } from "@/lib/utils/facet-helpers";
import { isCollectionPage } from "@/lib/collection-helpers";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/router";

interface SearchProps {
  isSearchActive: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ isSearchActive }) => {
  const router = useRouter();
  const { urlFacets } = useQueryParams();

  const { q } = router.query;

  const { isChecked } = useGenerativeAISearchToggle();

  const searchRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>(q as string);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const appendSearchJumpTo = isCollectionPage(router?.pathname);

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
    if (q) {
      if (q && searchRef.current) searchRef.current.value = q as string;
      setSearchValue(q as string);
    } else {
      setSearchValue("");
    }
  }, [q]);

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
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
          handleSearchFocus={handleSearchFocus}
          handleSubmit={handleSubmit}
          clearSearchResults={clearSearchResults}
          ref={searchRef}
        />
        <div>
          <GenerativeAIToggle />
          <Button type="submit" data-testid="submit-button">
            Search <IconArrowForward />
          </Button>
        </div>
        {isLoaded && <IconSearch />}
      </SearchStyled>
      {isCollectionPage(router?.pathname) && (
        <div data-testid="search-jump-to">
          <SearchJumpTo
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
