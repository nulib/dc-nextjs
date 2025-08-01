import { IconArrowForward, IconSparkles } from "@/components/Shared/SVG/Icons";
import React, { useEffect } from "react";
import {
  StyledInterstitial,
  StyledInterstitialAction,
  StyledInterstitialIcon,
  StyledInterstitialWrapper,
} from "@/components/Chat/Response/Interstitial.styled";

import { ChatContext } from "@/types/context/search-context";
import SearchResultsMessage from "@/components/Search/ResultsMessage";
import { ToolStartMessage } from "@/types/components/chat";
import { UrlFacets } from "@/types/context/filter-context";
import { createResultsMessageFromContext } from "@/lib/chat-helpers";
import { getFacetIdByField } from "@/lib/queries/facet";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

interface ResponseInterstitialProps {
  context?: ChatContext;
  id: string;
  message: ToolStartMessage["message"];
}

type InterstitialContent = string | undefined;

const ResponseInterstitial: React.FC<ResponseInterstitialProps> = ({
  context,
  id,
  message,
}) => {
  const router = useRouter();
  const { searchState, searchDispatch } = useSearchState();
  const {
    panel: { open, interstitial },
  } = searchState;

  const { tool, input } = message;

  const handleViewResults = (action: string) => {
    const facets = context?.facets.map((facet) => {
      const [key, value] = Object.entries(facet)[0];
      const field = getFacetIdByField(key);
      return { field, value };
    });

    const urlFacets: UrlFacets =
      facets?.reduce((acc, { field, value }) => {
        if (field && value) {
          acc[field] = [value];
        }
        return acc;
      }, {} as UrlFacets) || {};

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    searchDispatch({
      type: "updatePanel",
      panel: {
        open: true,
        query: action,
        interstitial: id,
      },
    });

    router.push({
      pathname: "/search",
      query: {
        q: action,
        ...urlFacets,
      },
    });
  };

  let text: InterstitialContent;
  let action: InterstitialContent;

  useEffect(() => {
    // if the panel is being opened or there is no interstitial, exit
    if (open || !interstitial) return;

    if (id !== interstitial) return;

    const interstitialElement = document.getElementById(`interstitial-${id}`);

    if (!interstitialElement) return;

    const parentArticle = interstitialElement.closest("article");

    const parentIndex = parentArticle?.getAttribute("data-index");

    // if the parent article is the first result, exit
    if (!parentIndex || parentIndex === "0") return;

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

  switch (tool) {
    case "aggregate":
      text = `Aggregating`;
      break;
    case "discover_fields":
      text = `Discovering`;
      break;
    case "search":
      text = createResultsMessageFromContext({
        ...context,
        query: String(input?.query),
        works: context?.works ?? [],
        facets: context?.facets ?? [],
      });
      action = input?.query;
      break;
    default:
      console.warn("Unknown tool_start message", message);
  }

  if (tool === "retrieve_documents") {
    return <></>;
  }

  return (
    <StyledInterstitialWrapper id={`interstitial-${id}`}>
      <StyledInterstitial data-testid="response-interstitial" data-tool={tool}>
        {text && <SearchResultsMessage label={text} icon={<IconSparkles />} />}
      </StyledInterstitial>
      {action && (
        <StyledInterstitialAction onClick={() => handleViewResults(action)}>
          View results <IconArrowForward />
        </StyledInterstitialAction>
      )}
    </StyledInterstitialWrapper>
  );
};

export default React.memo(ResponseInterstitial);
