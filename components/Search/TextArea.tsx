import { Clear, StyledTextArea } from "@/components/Search/TextArea.styled";
import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import { IconClear } from "@/components/Shared/SVG/Icons";

interface SearchTextAreaProps {
  isAi: boolean;
  isFocused: boolean;
  searchValue: string;
  handleSearchChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSearchFocus: (e: FocusEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  clearSearchResults: () => void;
}

const SearchTextArea = forwardRef<HTMLTextAreaElement, SearchTextAreaProps>(
  (
    {
      isAi,
      isFocused,
      searchValue,
      handleSearchChange,
      handleSearchFocus,
      handleSubmit,
      clearSearchResults,
    },
    textareaRef,
  ) => {
    /**
     * Resize the textarea to fit its content
     */
    useEffect(() => {
      // @ts-ignore
      const textarea = textareaRef?.current;
      if (textarea) {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [searchValue, isFocused]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      handleSearchChange(e);

      // @ts-ignore
      const textarea = textareaRef?.current;
      if (textarea) {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    const placeholderText = isAi
      ? "What can I show you from our collections?"
      : "Search by keyword or phrase, ex: Berkeley Music Festival";

    return (
      <StyledTextArea isFocused={isFocused}>
        <textarea
          autoComplete="on"
          id="dc-search"
          name="search"
          onBlur={handleSearchFocus}
          onChange={handleChange}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          onFocus={handleSearchFocus}
          placeholder={placeholderText}
          ref={textareaRef}
          role="search"
          value={searchValue}
        />
        {searchValue && (
          <Clear onClick={clearSearchResults} type="reset">
            <IconClear />
          </Clear>
        )}
      </StyledTextArea>
    );
  },
);

SearchTextArea.displayName = "SearchTextArea";

export default SearchTextArea;
