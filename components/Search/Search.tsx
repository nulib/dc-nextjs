import { Button, Clear, Input, SearchStyled } from "./Search.styled";
import {
  ChangeEvent,
  FocusEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconClear, IconSearch } from "../Shared/SVG/Icons";
import SearchJumpTo from "@/components/Search/JumpTo";
import useEventListener from "@/hooks/useEventListener";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

interface SearchProps {
  isSearchActive: (value: boolean) => void;
  jumpTo?: "collection"; // In the future maybe we extend a jumpTo enum? ie. "collection" | "work" | ?
}

const Search: React.FC<SearchProps> = ({ isSearchActive, jumpTo }) => {
  const router = useRouter();
  const { searchDispatch } = useSearchState();
  const search = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showJumpTo, setShowJumpTo] = useState<boolean>(false);

  // @ts-ignore
  const handleMouseDown = (e) => {
    if (
      jumpTo &&
      showJumpTo &&
      formRef.current &&
      !formRef.current.contains(e.target)
    ) {
      if (jumpTo) setShowJumpTo(false);
    }
  };

  useEventListener("mousedown", handleMouseDown);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchDispatch({
      q: searchValue,
      type: "updateSearch",
    });
    router.push({
      pathname: "/search",
      query: {
        q: searchValue,
      },
    });
  };

  const handleSearchFocus = (e: FocusEvent) => {
    if (e.type === "focus") {
      setSearchFocus(true);
      setShowJumpTo(Boolean(jumpTo && searchValue));
    } else {
      setSearchFocus(false);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowJumpTo(Boolean(value && jumpTo));
  };

  const clearSearchResults = () => {
    router.push(`/search`);
    setSearchValue("");
    if (search.current) search.current.value = "";
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
      <Button type="submit">Search</Button>
      {isLoaded && <IconSearch />}
      {jumpTo && showJumpTo && <SearchJumpTo searchValue={searchValue} />}
    </SearchStyled>
  );
};

export default Search;
