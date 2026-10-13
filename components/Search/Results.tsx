import styles from "@/components/Search/Search.module.css";
import { ChatContext } from "@/types/context/search-context";
import Grid from "@/components/Grid/Grid";
import IIIFShare from "../Shared/IIIF/Share";
import PaginationAltCounts from "@/components/Search/PaginationAltCounts";
import { SEARCH_RESULTS_PER_PAGE } from "@/lib/constants/common";
import SearchResultsMessage from "./ResultsMessage";
import { SearchResultsState } from "@/types/components/search";
import { createResultsMessageFromContext } from "@/lib/chat-helpers";
import { iiifSearchUri } from "@/lib/dc-api";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
import { useRouter } from "next/router";
interface SearchResultsStateWithContext extends SearchResultsState {
  context?: ChatContext;
  hideResultCount?: boolean;
}
const SearchResults: React.FC<SearchResultsStateWithContext> = ({
  data,
  context,
  error,
  loading,
  hideResultCount,
}) => {
  const { isChecked: isAI } = useGenerativeAISearchToggle();
  const router = useRouter();
  const iiifCollection = iiifSearchUri(router.query, SEARCH_RESULTS_PER_PAGE);
  const totalResults = data?.pagination?.total_hits;
  const rawLabel = createResultsMessageFromContext(
    context,
    hideResultCount ? undefined : totalResults,
  );
  const label = hideResultCount
    ? rawLabel?.replace(/^Results\b/, "Searching")
    : rawLabel;
  return (
    <div className={styles.resultsWrapper}>
      {loading && <></>}
      {error && <p>{error}</p>}
      {data && (
        <>
          {!isAI &&
            (totalResults ? (
              <header className={styles.resultsWrapperHeader}>
                {label && <SearchResultsMessage label={label} />}
                <IIIFShare uri={iiifCollection} />
              </header>
            ) : (
              <span className={styles.noResultsMessage}>
                <strong>Your search did not match any results.</strong> Please
                try broadening your search terms or adjusting your filters.
              </span>
            ))}
          <Grid data={data.data} info={data.info} />
          {totalResults ? (
            <PaginationAltCounts
              pagination={data.pagination}
              showResultCounts={!isAI}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};
export default SearchResults;
