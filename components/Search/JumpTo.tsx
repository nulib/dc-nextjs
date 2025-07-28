import React, { useEffect, useState } from "react";

import SearchJumpToList from "@/components/Search/JumpToList";

interface SearchProps {
  handleOnClick: () => void;
  handleScopeValue: (value: string) => void;
  searchFocus: boolean;
  searchValue: string;
  top: number;
}

const SearchJumpTo: React.FC<SearchProps> = ({
  handleOnClick,
  handleScopeValue,
  searchFocus,
  searchValue,
  top,
}) => {
  const [showJumpTo, setShowJumpTo] = useState<boolean>(false);

  useEffect(() => {
    if (searchFocus) setShowJumpTo(Boolean(searchValue));
  }, [searchFocus, searchValue]);

  if (!showJumpTo) return null;

  return (
    <SearchJumpToList
      handleOnClick={handleOnClick}
      searchValue={searchValue}
      setShowJumpTo={setShowJumpTo}
      setScopeValue={handleScopeValue}
      top={top}
    />
  );
};

export default SearchJumpTo;
