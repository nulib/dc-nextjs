import { Button, Clear, Input, SearchStyled } from "./Search.styled";
import {
  ChangeEvent,
  FocusEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconClear, IconSearch } from "../SVG/Icons";
import Router, { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";
interface SearchProps {
  isSearchActive: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ isSearchActive }) => {
  const router = useRouter();
  const { searchDispatch } = useSearchState();
  const search = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    let query = "";
    if (searchValue) query = `?q=${encodeURI(searchValue.replace(/ /g, "+"))}`;
    Router.push(`/search${query}`);
    searchDispatch({
      q: searchValue,
      type: "updateSearch",
    });
  };

  const handleSearchFocus = (e: FocusEvent) =>
    e.type === "focus" ? setSearchFocus(true) : setSearchFocus(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const clearSearchResults = () => {
    Router.push(`/search`);
    setSearchValue("");
    if (search.current) search.current.value = "";
  };

  useEffect(() => {
    if (router) {
      const { q } = router.query;
      if (q && search.current) search.current.value = q as string;
      setSearchValue(q as string);
    }
  }, []);

  useEffect(() => {
    !searchFocus && !searchValue ? isSearchActive(false) : isSearchActive(true);
  }, [searchFocus, searchValue, isSearchActive]);

  return (
    <SearchStyled onSubmit={handleSubmit} data-testid="search-ui-component">
      <Input
        placeholder="Search by keyword or phrase, ex: Berkeley Music Festival"
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
        onBlur={handleSearchFocus}
        ref={search}
      />
      {searchValue && (
        <Clear onClick={clearSearchResults} type="reset">
          <IconClear />
        </Clear>
      )}
      <Button type="submit">
        <IconSearch />
      </Button>
    </SearchStyled>
  );
};

export default Search;
