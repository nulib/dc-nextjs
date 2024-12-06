import {
  NoResultsMessage,
  ResultsMessage,
  ResultsWrapper,
  ResultsWrapperHeader,
} from "@/components/Search/Search.styled";

import Grid from "@/components/Grid/Grid";
import IIIFShare from "../Shared/IIIF/Share";
import PaginationAltCounts from "@/components/Search/PaginationAltCounts";
import { SEARCH_RESULTS_PER_PAGE } from "@/lib/constants/common";
import { SearchResultsState } from "@/types/components/search";
import { iiifSearchUri } from "@/lib/dc-api";
import { pluralize } from "@/lib/utils/count-helpers";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
import { useRouter } from "next/router";

const SearchResults: React.FC<SearchResultsState> = ({
  data,
  error,
  loading,
}) => {
  const { isChecked: isAI } = useGenerativeAISearchToggle();
  const router = useRouter();

  const iiifCollection = iiifSearchUri(router.query, SEARCH_RESULTS_PER_PAGE);
  const totalResults = data?.pagination?.total_hits;

  return (
    <ResultsWrapper>
      {loading && <></>}
      {error && <p>{error}</p>}
      {data && (
        <>
          {!isAI &&
            (totalResults ? (
              <ResultsWrapperHeader>
                <ResultsMessage data-testid="results-count">
                  {pluralize("result", totalResults)}
                </ResultsMessage>
                <IIIFShare uri={iiifCollection} />
              </ResultsWrapperHeader>
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
