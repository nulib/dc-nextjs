import * as Tooltip from "@radix-ui/react-tooltip";

import React from "react";
import { styled } from "@/stitches.config";

interface AnswerInformationProps {
  timestamp: number;
}

export const generativeAIWarning = `The answers and provided links are generated using chatGPT and metadata from Northwestern University Libraries Digital Collections. This is an experiment and results may be inaccurate, irrelevant, or potentially harmful.`;

export const AnswerInformation: React.FC<AnswerInformationProps> = ({
  timestamp,
}) => {
  const date = new Date(timestamp);
  const timeZone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
  const answerDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: timeZone ? timeZone : "America/Chicago",
  });

  return (
    <span>
      <Tooltip.Provider delayDuration={20}>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <AnswerTooltip>About this Answer</AnswerTooltip>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content side="bottom" sideOffset={3} collisionPadding={19}>
              <AnswerTooltipArrow />
              <AnswerTooltipContent>
                {generativeAIWarning}
                <em>Answered on {answerDate}</em>
              </AnswerTooltipContent>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </span>
  );
};

/* eslint sort-keys: 0 */

export const AnswerTooltip = styled("span", {
  display: "inline-block",
  background: "transparent",
  border: "none",
  cursor: "help",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr2 !important",
  padding: "1px 0",
  margin: "0 $gr2 0 0",
  textDecoration: "none",
  borderBottom: "1px dotted $black20",
  lineHeight: "1em",
  alignSelf: "center",
  color: "$black50",
  whiteSpace: "nowrap",
  opacity: "1",

  "&:active, &:hover": {
    color: "$brightBlueB !important",
    borderColor: "$brightBlueB",
  },
});

export const AnswerTooltipArrow = styled(Tooltip.Arrow, {
  fill: "$brightBlueB",
});

export const AnswerTooltipContent = styled("div", {
  background: "$white",
  boxShadow: "0 13px 21px 0 rgba(0, 0, 0, 0.13)",
  width: "450px",
  lineHeight: "1.5em",
  fontSize: "$gr2 !important",
  fontFamily: "$northwesternSansRegular",
  padding: "$gr3",
  borderRadius: "6px",
  borderTop: "2px solid $brightBlueB",

  em: {
    color: "$black50",
    marginTop: "$gr1",
    display: "block",
    fontSize: "$gr1",
  },
});

export default AnswerInformation;
