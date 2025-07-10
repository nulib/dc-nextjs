import {
  CheckboxIndicator,
  CheckboxRoot as CheckboxRootStyled,
} from "@/components/Shared/Checkbox.styled";

import { IconCheck } from "@/components/Shared/SVG/Icons";
import React from "react";
import { StyledSearchToggle } from "./Search.styled";
import { useSearchState } from "@/context/search-context";

export default function CollectionToggle() {
  const {
    searchState: { searchCollection },
    searchDispatch,
  } = useSearchState();

  /**
   * Get the collection label from the meta tag.
   */
  const collectionLabel =
    typeof document !== "undefined"
      ? document
          .querySelector("meta[property='og:title']")
          ?.getAttribute("content") || undefined
      : undefined;

  /**
   * Handle the change of the checkbox and update the search context.
   */
  const handleCheckChange = (checked: boolean) => {
    searchDispatch({
      type: "updateSearchCollection",
      searchCollection:
        checked && collectionLabel ? collectionLabel : undefined,
    });
  };

  return (
    <>
      <StyledSearchToggle data-testid="collection-toggle">
        <CheckboxRootStyled
          checked={!!searchCollection}
          id="isCollectionToggle"
          onCheckedChange={handleCheckChange}
        >
          <CheckboxIndicator>
            <IconCheck />
          </CheckboxIndicator>
        </CheckboxRootStyled>
        <label htmlFor="isCollectionToggle">Search Collection</label>
      </StyledSearchToggle>
    </>
  );
}
