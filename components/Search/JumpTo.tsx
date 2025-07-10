import React, { useEffect, useRef, useState } from "react";

import SearchJumpToList from "@/components/Search/JumpToList";

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
  const formRef = useRef<HTMLFormElement>(null);
  const [showJumpTo, setShowJumpTo] = useState<boolean>(false);

  useEffect(() => {
    if (searchFocus) setShowJumpTo(Boolean(searchValue));
  }, [searchFocus, searchValue]);

  if (!showJumpTo) return null;

  return (
    <SearchJumpToList
      searchValue={searchValue}
      setShowJumpTo={setShowJumpTo}
      top={top}
    />
  );
};

export default SearchJumpTo;
