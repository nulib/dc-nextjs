import React, { useEffect, useRef, useState } from "react";

import SearchJumpToList from "@/components/Search/JumpToList";
import Swiper from "swiper";

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

  useEffect(() => {
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
