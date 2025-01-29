import { IconSearch, IconSparkles } from "@/components/Shared/SVG/Icons";
import {
  StyledInterstitial,
  StyledInterstitialIcon,
} from "@/components/Chat/Response/Interstitial.styled";

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
        <label>
          Aggregating <strong>{input.agg_field}</strong> by{" "}
          <strong>
            {input.term_field} {input.term}
          </strong>
        </label>
      );
      break;
    case "discover_fields":
      text = <label>Discovering fields</label>;
      break;
    case "search":
      text = (
        <label>
          Searching for <strong>{input.query}</strong>
        </label>
      );
      break;
    default:
      console.warn("Unknown tool_start message", message);
  }

  return (
    <StyledInterstitial data-testid="response-interstitial" data-tool={tool}>
      <StyledInterstitialIcon>
        <IconSparkles />
      </StyledInterstitialIcon>
      <label>{text}</label>
    </StyledInterstitial>
  );
};

export default React.memo(ResponseInterstitial);
