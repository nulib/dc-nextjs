import {
  ChangeEvent,
  FocusEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Router, { useRouter } from "next/router";
import { Button, Clear, Input, Wrapper } from "./Search.styled";

interface SearchProps {
  isSearchActive: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ isSearchActive }) => {
  const router = useRouter();

  const search = useRef<HTMLInputElement>(null);

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    let query = "";
    if (searchValue) query = `?q=${encodeURI(searchValue.replace(/ /g, "+"))}`;
    Router.push(`/search${query}`);
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
    <Wrapper onSubmit={handleSubmit} data-testid="search-ui-component">
      <Input
        placeholder="Search by keyword or phrase, ex: Berkeley Music Festival"
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
        onBlur={handleSearchFocus}
        ref={search}
      />
      <Button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <title>Search</title>
          <path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z" />
        </svg>
      </Button>
      {searchValue && (
        <Clear onClick={clearSearchResults}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <title>Clear</title>
            <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
          </svg>
        </Clear>
      )}
    </Wrapper>
  );
};

export default Search;
