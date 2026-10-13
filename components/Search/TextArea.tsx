import styles from "@/components/Search/TextArea.module.css";
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  forwardRef,
  useEffect,
} from "react";
interface SearchTextAreaProps {
  isAi: boolean;
  isFocused: boolean;
  handleSearchChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSearchFocus: (e: FocusEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  clearSearchResults: () => void;
  searchValue: string;
}
const SearchTextArea = forwardRef<HTMLTextAreaElement, SearchTextAreaProps>(
  (
    {
      isAi,
      isFocused,
      handleSearchChange,
      handleSearchFocus,
      handleSubmit,
      searchValue,
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
    }, [isFocused]);
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      handleSearchChange(e);
      // @ts-ignore
      const textarea = textareaRef?.current;
      if (textarea) {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };
    const placeholderText = isAi
      ? "What can we show you from our collections?"
      : "Search by keyword or phrase, ex: Berkeley Music Festival";
    return (
      <div data-is-focused={isFocused} className={styles.styledTextArea}>
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
      </div>
    );
  },
);
SearchTextArea.displayName = "SearchTextArea";
export default SearchTextArea;
