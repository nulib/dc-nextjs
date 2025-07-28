import { Dispatch, KeyboardEvent, useEffect, useState } from "react";
import {
  HelperStyled,
  JumpItem,
  JumpToListStyled,
} from "@/components/Search/JumpTo.styled";

import { IconReturnDownBack } from "@/components/Shared/SVG/Icons";
import useEventListener from "@/hooks/useEventListener";

interface SearchJumpToListProps {
  handleOnClick: () => void;
  searchValue: string;
  setShowJumpTo: Dispatch<React.SetStateAction<boolean>>;
  setScopeValue: (value: string) => void;
  top: number;
}

const SearchJumpToList: React.FC<SearchJumpToListProps> = ({
  handleOnClick,
  searchValue,
  setShowJumpTo,
  setScopeValue,
  top,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const jumpToItems = [
    {
      dataTestId: "helper-anchor-collection",
      helperLabel: "In this Collection",
      value: "collection",
    },
    {
      dataTestId: "helper-anchor-all",
      helperLabel: "All Digital Collections",
      value: "all",
    },
  ];

  const defaultScopeValue = jumpToItems[0].value;

  const handleKeyEvent = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        if (activeIndex > 0) {
          const targetIndex = activeIndex - 1;
          const value = jumpToItems[targetIndex].value;
          handleValue(value);
        }
        break;
      case "ArrowDown":
        if (activeIndex < jumpToItems.length - 1) {
          const targetIndex = activeIndex + 1;
          const value = jumpToItems[targetIndex].value;
          handleValue(value);
        }
        break;
      case "Enter":
        e.preventDefault();
        setShowJumpTo(false);
        break;
      case "Escape":
        setShowJumpTo(false);
        break;
      default:
        break;
    }
  };

  // @ts-ignore
  useEventListener("keydown", handleKeyEvent);

  useEffect(() => setScopeValue(defaultScopeValue), []);

  const handleValue = (value: string) => {
    setActiveIndex(jumpToItems.findIndex((item) => item.value === value));
    setScopeValue(value);
  };

  const handleItemHover = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value");
    if (value) handleValue(value);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) if (value) handleValue(value);
  };

  return (
    <JumpToListStyled
      data-testid="jump-to-wrapper"
      role="listbox"
      style={{ top }}
    >
      {jumpToItems.map((item, index) => (
        <JumpItem
          key={item.dataTestId}
          role="option"
          aria-selected={index === activeIndex}
          data-value={item.value}
          onClick={handleOnClick}
          onMouseEnter={handleItemHover}
          data-testid={item.dataTestId}
        >
          <label htmlFor={`dc-search-scope-${item.value}`}>
            <input
              type="radio"
              id={`dc-search-scope-${item.value}`}
              name="dc-search-scope"
              value={item.value}
              checked={activeIndex === index}
              onChange={handleOnChange}
            />
            {searchValue} <Helper label={item.helperLabel} />
          </label>
        </JumpItem>
      ))}
    </JumpToListStyled>
  );
};

const Helper: React.FC<{ label: string }> = ({ label }) => {
  return (
    <HelperStyled data-testid="helper">
      <span>{label}</span> <IconReturnDownBack />
    </HelperStyled>
  );
};

export default SearchJumpToList;
