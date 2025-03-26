import { useEffect } from "react";
import type { SearchContextStore } from "@/types/context/search-context";
import {
  StyledInterstitial,
  StyledInterstitialWrapper,
  StyledInterstitialIcon,
  StyledInterstitialAction,
} from "../Response/Interstitial.styled";
import ResponseImages from "../Response/Images";
import { IconClear, IconSparkles } from "@/components/Shared/SVG/Icons";
import { useSearchState } from "@/context/search-context";

interface InterstitialDocumentsProps {
  documents: NonNullable<SearchContextStore["conversation"]["latestDocs"]>;
  canRemove: boolean;
}

const InterstitialDocuments = ({
  documents,
  canRemove,
}: InterstitialDocumentsProps) => {
  const { searchState, searchDispatch } = useSearchState();

  const {
    panel: { open, interstitial },
    conversation,
  } = searchState;

  useEffect(() => {
    // if the panel is being opened or there is no interstitial, exit
    if (open || !interstitial) return;

    if ("latestdocs" !== interstitial) return;

    const interstitialElement = document.getElementById(
      `interstitial-latestdocs`,
    );

    if (!interstitialElement) return;

    // because the search bar is absolutely positioned,
    // grab its height to offset the scroll position
    const searchBar = document.getElementById("dc-search");
    const offset = searchBar?.offsetHeight || 0;
    const topPos =
      interstitialElement.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: topPos - 25, // 25 is to offset the box-shadow
      behavior: "smooth",
    });
  }, [open]);

  const removeDocs = () => {
    searchDispatch({
      type: "updateConversation",
      conversation: {
        ...conversation,
        latestDocs: undefined,
      },
    });
  };
  return (
    <>
      <StyledInterstitialWrapper
        id="interstitial-latestdocs"
        data-testid="interstitial-latestdocs"
      >
        <StyledInterstitial>
          <StyledInterstitialIcon>
            <IconSparkles />
          </StyledInterstitialIcon>
          Selected documents ({documents.length}):
        </StyledInterstitial>
        {canRemove && (
          <StyledInterstitialAction onClick={() => removeDocs()}>
            Remove documents <IconClear />
          </StyledInterstitialAction>
        )}
      </StyledInterstitialWrapper>
      <ResponseImages works={documents} />
    </>
  );
};
export default InterstitialDocuments;
