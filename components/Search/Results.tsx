import {
  NoResultsMessage,
  ResultsWrapper,
  ResultsWrapperHeader,
} from "@/components/Search/Search.styled";

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
}

const SearchResults: React.FC<SearchResultsStateWithContext> = ({
  data,
  context,
  error,
  loading,
}) => {
  const { isChecked: isAI } = useGenerativeAISearchToggle();
  const router = useRouter();

  const iiifCollection = iiifSearchUri(router.query, SEARCH_RESULTS_PER_PAGE);
  const totalResults = data?.pagination?.total_hits;
  const label = createResultsMessageFromContext(context, totalResults);

  return (
    <ResultsWrapper>
      {loading && <></>}
      {error && <p>{error}</p>}
      {data && (
        <>
          {!isAI &&
            (totalResults ? (
              <ResultsWrapperHeader>
                {label && <SearchResultsMessage label={label} />}
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
