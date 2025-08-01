import Balancer from "react-wrap-balancer";
import { CSSProperties } from "react";
import { StyledInterstitialIcon } from "../Chat/Response/Interstitial.styled";
import { SearchResultsLabelMessage as StyledLabel } from "./Panel.styled";
import { styled } from "@/stitches.config";

const SearchResultsMessage = ({
  label,
  icon,
  textAlign = "left",
}: {
  label: string;
  icon?: React.ReactNode;
  textAlign?: CSSProperties["textAlign"];
}) => {
  return (
    <StyledSearchResultsMessage data-testid="search-results-message">
      {icon && <StyledInterstitialIcon>{icon}</StyledInterstitialIcon>}
      <StyledLabel style={{ textAlign }}>
        {label && (
          <Balancer
            as="label"
            dangerouslySetInnerHTML={{
              __html: label,
            }}
            data-testid="search-results-message-label"
          />
        )}
      </StyledLabel>
    </StyledSearchResultsMessage>
  );
};

export const StyledSearchResultsMessage = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$gr2",
  flexGrow: "1",
  width: "100%",
});

export default SearchResultsMessage;
