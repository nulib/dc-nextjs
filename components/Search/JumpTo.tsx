import { Input, SearchStyled } from "./Search.styled";
import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { IconSearch } from "@/components/Shared/SVG/Icons";
import SearchJumpToList from "@/components/Search/JumpToList";
import Swiper from "swiper";

interface SearchProps {
  isSearchActive: (value: boolean) => void;
}

const SearchJumpTo: React.FC<SearchProps> = ({ isSearchActive }) => {
  const search = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showJumpTo, setShowJumpTo] = useState<boolean>(false);

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        showJumpTo &&
        formRef.current &&
        !formRef.current.contains(e.target as Node)
      ) {
        setShowJumpTo(false);
      }
    };

    const handleSwiperTouch = () => {
      if (showJumpTo) {
        setShowJumpTo(false);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);

    /**
     * SwiperJS swallows mouse/touch events on window, so if a Swiper
     * is on the same page as this component, grab an instance of Swiper
     * and specifically listen for touch events. This seems to be the only
     * way to grab mousedown events on the Swiper hero.
     */
    interface SwiperEl extends Element {
      swiper?: Swiper;
    }
    const swiperEl: SwiperEl | null = document?.querySelector(".swiper");
    const swiper = swiperEl ? swiperEl.swiper : undefined;

    if (swiper) {
      swiper.on("touchStart", handleSwiperTouch);
    }

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      if (swiper) {
        swiper?.off("touchStart", handleSwiperTouch);
      }
    };
  }, [showJumpTo]);

  const handleSearchFocus = (e: FocusEvent) => {
    if (e.type === "focus") {
      setSearchFocus(true);
      setShowJumpTo(Boolean(searchValue));
    } else {
      setSearchFocus(false);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowJumpTo(Boolean(value));
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    !searchFocus && !searchValue ? isSearchActive(false) : isSearchActive(true);
  }, [searchFocus, searchValue, isSearchActive]);

  return (
    <SearchStyled ref={formRef} data-testid="search-jump-to-form">
      <Input
        placeholder="Search by keyword or phrase, ex: Berkeley Music Festival"
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
        onBlur={handleSearchFocus}
        ref={search}
        name="search"
        role="search"
      />
      {isLoaded && <IconSearch />}
      {showJumpTo && (
        <SearchJumpToList
          searchValue={searchValue}
          setShowJumpTo={setShowJumpTo}
        />
      )}
    </SearchStyled>
  );
};

export default SearchJumpTo;
