import panelStyles from "@/components/Search/Panel.module.css";
import interstitialStyles from "@/components/Chat/Response/Interstitial.module.css";
import resultsMessageStyles from "@/components/Search/ResultsMessage.module.css";
import Balancer from "react-wrap-balancer";
import { CSSProperties } from "react";
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
    <div
      data-testid="search-results-message"
      data-dc-slot="search-results-message"
      className={resultsMessageStyles.styledSearchResultsMessage}
    >
      {icon && (
        <div className={interstitialStyles.styledInterstitialIcon}>{icon}</div>
      )}
      <div
        data-text-align={textAlign}
        className={panelStyles.searchResultsLabelMessage}
      >
        {label && (
          <Balancer
            as="label"
            dangerouslySetInnerHTML={{
              __html: label,
            }}
            data-testid="search-results-message-label"
          />
        )}
      </div>
    </div>
  );
};
export default SearchResultsMessage;
