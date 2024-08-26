import {
  NoResultsMessage,
  ResultsMessage,
  ResultsWrapper,
} from "@/components/Search/Search.styled";

import Grid from "@/components/Grid/Grid";
import PaginationAltCounts from "@/components/Search/PaginationAltCounts";
import { SearchResultsState } from "@/types/components/search";
import { pluralize } from "@/lib/utils/count-helpers";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";

const SearchResults: React.FC<SearchResultsState> = ({
  data,
  error,
  loading,
}) => {
  const { isChecked: isAI } = useGenerativeAISearchToggle();

  const totalResults = data?.pagination?.total_hits;

  return (
    <ResultsWrapper>
      {loading && <></>}
      {error && <p>{error}</p>}
      {data && (
        <>
          {!isAI &&
            (totalResults ? (
              <ResultsMessage data-testid="results-count">
                {pluralize("Result", totalResults)}
              </ResultsMessage>
            ) : (
              <NoResultsMessage>
                <strong>Your search did not match any results.</strong> Please
                try broadening your search terms or adjusting your filters.
              </NoResultsMessage>
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
    </ResultsWrapper>
  );
};

export default SearchResults;
