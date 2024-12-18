import {
  StyledInterstitial,
  StyledInterstitialIcon,
} from "@/components/Chat/Response/Interstitial.styled";

import { IconSearch } from "@/components/Shared/SVG/Icons";
import React from "react";
import { ToolStartMessage } from "@/types/components/chat";

interface ResponseInterstitialProps {
  message: ToolStartMessage["message"];
}

const ResponseInterstitial: React.FC<ResponseInterstitialProps> = ({
  message,
}) => {
  const { tool, input } = message;
  let text: React.ReactElement = <></>;

  switch (tool) {
    case "aggregate":
      text = (
        <>
          Aggregating {input.agg_field} by {input.term_field} {input.term}
        </>
      );
      break;
    case "discover_fields":
      text = <>Discovering fields</>;
      break;
    case "search":
      text = (
        <>
          Searching for <em>{input.query}</em>
        </>
      );
      break;
    default:
      console.warn("Unknown tool_start message", message);
  }

  return (
    <StyledInterstitial data-testid="response-interstitial" data-tool={tool}>
      <StyledInterstitialIcon>
        <IconSearch />
      </StyledInterstitialIcon>
      <label>{text}</label>
    </StyledInterstitial>
  );
};

export default React.memo(ResponseInterstitial);
