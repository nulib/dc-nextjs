import {
  Button,
  Clear,
  GenerativeAICheckbox,
  Input,
  SearchStyled,
} from "./Search.styled";
import {
  IconArrowForward,
  IconClear,
  IconInfo,
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
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import GenerativeAIDialog from "@/components/Shared/Dialog";
import { UserContext } from "@/context/user-context";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

interface SearchProps {
  isSearchActive: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ isSearchActive }) => {
  const router = useRouter();
  const { urlFacets } = useQueryParams();

  const search = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { searchState, searchDispatch } = useSearchState();

  const { user } = React.useContext(UserContext);

  const [modalGenerativeAI, setModalGenerativeUI] = useState({
    isOpen: false,
    title: "Generative AI Dialog",
  });
  const [genAICheckBox, setGenAICheckBox] = useState<boolean>(
    searchState.isGenerativeAI
  );

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

  const handleGenerativeAIChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!user?.isLoggedIn) {
      setModalGenerativeUI({ ...modalGenerativeAI, isOpen: e.target.checked });
    }

    if (user?.isLoggedIn) {
      searchDispatch({
        isGenerativeAI: e.target.checked,
        type: "updateGenerativeAI",
      });
    }
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

  useEffect(() => {
    setGenAICheckBox(searchState.isGenerativeAI);
  }, [searchState.isGenerativeAI]);

  // TODO: This needs to accept more than one query param when
  // directing to NU SSO.  We need the additional query param
  // to know that user came wanting to use Generative AI
  function goToLocation() {
    const currentUrl = `${window.location.origin}${router.asPath}`;
    const url = new URL(currentUrl);
    url.searchParams.set("ai", "true");
    console.log("url.toString()", url.toString());
    return url.toString();
  }

  return (
    <>
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

        <GenerativeAICheckbox>
          <input
            type="checkbox"
            name="isGenerativeAI"
            onChange={handleGenerativeAIChange}
            checked={genAICheckBox}
          />
          <label htmlFor="isGenerativeAI">Use Generative AI</label>
          <IconInfo />
        </GenerativeAICheckbox>

        <Button type="submit" data-testid="submit-button">
          Search <IconArrowForward />
        </Button>
        {isLoaded && <IconSearch />}
      </SearchStyled>

      <GenerativeAIDialog
        isOpen={modalGenerativeAI.isOpen}
        title={modalGenerativeAI.title}
        handleCloseClick={() =>
          setModalGenerativeUI({ ...modalGenerativeAI, isOpen: false })
        }
      >
        <p>
          <a href={`${DCAPI_ENDPOINT}/auth/login?goto=${window.location}`}>
            Click here
          </a>{" "}
          to login
        </p>
        <Button>Close</Button>
      </GenerativeAIDialog>
    </>
  );
};

export default Search;
