import React, { useEffect, useState } from "react";

import SearchJumpToList from "@/components/Search/JumpToList";
import { useSearchState } from "@/context/search-context";

interface SearchProps {
  searchFocus: boolean;
  searchValue: string;
  top: number;
}

const SearchJumpTo: React.FC<SearchProps> = ({
  searchFocus,
  searchValue,
  top,
}) => {
  const [showJumpTo, setShowJumpTo] = useState<boolean>(false);
  const {
    searchState: { searchCollection },
    searchDispatch,
  } = useSearchState();

  const collectionLabel =
    typeof document !== "undefined"
      ? document
          .querySelector("meta[property='og:title']")
          ?.getAttribute("content") || undefined
      : undefined;

  useEffect(() => {
    if (searchFocus) {
      searchDispatch({
        type: "updateSearchCollection",
        searchCollection: collectionLabel,
      });
      setShowJumpTo(Boolean(searchValue));
    }
  }, [searchFocus, searchValue, collectionLabel]);

  if (!showJumpTo) return null;

  const handleScopeValue = (value: string) => {
    switch (value) {
      case "collection":
        searchDispatch({
          type: "updateSearchCollection",
          searchCollection: collectionLabel,
        });
        break;
      case "all":
        searchDispatch({
          type: "updateSearchCollection",
          searchCollection: undefined,
        });
        break;
      default:
        break;
    }
  };

  return (
    <SearchJumpToList
      searchValue={searchValue}
      setShowJumpTo={setShowJumpTo}
      setScopeValue={handleScopeValue}
      top={top}
    />
  );
};

export default SearchJumpTo;
