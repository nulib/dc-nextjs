import {
  StyledInterstitial,
  StyledInterstitialIcon,
} from "@/components/Chat/Response/Interstitial.styled";

import { AggregationResultMessage } from "@/types/components/chat";
import { IconSparkles } from "@/components/Shared/SVG/Icons";
import React from "react";
import { StyledResponseMarkdown } from "./Response.styled";
import { secondary } from "@/styles/colors";
import { styled } from "@/stitches.config";

interface ResponseInterstitialProps {
  message: AggregationResultMessage["message"];
}

const ResponseAggregations: React.FC<ResponseInterstitialProps> = ({
  message,
}) => {
  const { buckets } = message;

  return (
    <div>
      <StyledInterstitial data-testid="response-aggregations">
        <StyledInterstitialIcon>
          <IconSparkles />
        </StyledInterstitialIcon>
        Aggregation Results
      </StyledInterstitial>
      <StyledAggregations>
        <table>
          <tbody>
            {buckets.map((bucket) => (
              <tr
                key={bucket.key}
                data-key={bucket.key}
                data-count={bucket.doc_count}
              >
                <td>{bucket.key}</td>
                <td>{bucket.doc_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledAggregations>
    </div>
  );
};

const StyledAggregations = styled(StyledResponseMarkdown, {
  marginTop: "$gr2",
  justifyContent: "flex-start",
  gap: "$gr2",
  flexWrap: "wrap",

  table: {
    width: "fit-content",
    background: `${secondary.brightBlueB}11`,
    borderColor: `${secondary.brightBlueB}55`,
    minWidth: "38.2%",

    "tr:last-child td": {},

    td: {
      borderColor: `${secondary.brightBlueB}55`,

      "&:first-child": {
        fontFamily: "$northwesternSansBold",
      },

      "&:last-child": {
        width: "100%",
      },
    },
  },
});

export default ResponseAggregations;
