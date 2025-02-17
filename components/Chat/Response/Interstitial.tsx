import { IconArrowForward, IconSparkles } from "@/components/Shared/SVG/Icons";
import React, { useEffect } from "react";
import {
  StyledInterstitial,
  StyledInterstitialAction,
  StyledInterstitialIcon,
  StyledInterstitialWrapper,
} from "@/components/Chat/Response/Interstitial.styled";

import { ToolStartMessage } from "@/types/components/chat";
import { useSearchState } from "@/context/search-context";

interface ResponseInterstitialProps {
  message: ToolStartMessage["message"];
  id: string;
}

type InterstitialContent = string | undefined;

const ResponseInterstitial: React.FC<ResponseInterstitialProps> = ({
  message,
  id,
}) => {
  const { tool, input } = message;

  const { searchState, searchDispatch } = useSearchState();
  const {
    panel: { open, interstitial },
  } = searchState;

  const handleViewResults = (action: string) => {
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
  };

  let text: InterstitialContent;
  let action: InterstitialContent;

  useEffect(() => {
    if (open && !interstitial) return;

    if (id === interstitial) {
      const interstitialElement = document.getElementById(`interstitial-${id}`);
      // if (interstitialElement)
      //   interstitialElement.scrollIntoView({
      //     behavior: "smooth",
      //     block: "start",
      //   });
    }
  }, [open]);

  switch (tool) {
    case "aggregate":
      text = `Aggregating`;
      break;
    case "discover_fields":
      text = `Discovering`;
      break;
    case "search":
      text = `Searching for <strong>${input.query}</strong>`;
      action = input.query;
      break;
    default:
      console.warn("Unknown tool_start message", message);
  }

  return (
    <StyledInterstitialWrapper id={`interstitial-${id}`}>
      <StyledInterstitial data-testid="response-interstitial" data-tool={tool}>
        <StyledInterstitialIcon>
          <IconSparkles />
        </StyledInterstitialIcon>
        {text && <label dangerouslySetInnerHTML={{ __html: text }} />}
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
