import * as Tooltip from "@radix-ui/react-tooltip";

import {
  AI_DISCLAIMER,
  AI_TOGGLE_LABEL,
  AI_SYS_PROMPT_MSG,
} from "@/lib/constants/common";
import {
  CheckboxIndicator,
  CheckboxRoot as CheckboxRootStyled,
} from "@/components/Shared/Checkbox.styled";
import {
  GenerativeAIToggleWrapper,
  TooltipContent,
  TooltipTrigger,
} from "@/components/Search/GenerativeAI.styled";
import { TooltipArrow, TooltipBody } from "../Shared/Tooltip.styled";

import { IconCheck } from "@/components/Shared/SVG/Icons";
import { IconInfo } from "@/components/Shared/SVG/Icons";
import React from "react";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";

function GenerativeAITooltip() {
  return (
    <Tooltip.Provider delayDuration={20}>
      <Tooltip.Root data-testid="tooltip">
        <TooltipTrigger>
          <IconInfo />
        </TooltipTrigger>
        <Tooltip.Portal>
          <TooltipContent side="bottom" sideOffset={3} collisionPadding={19}>
            <TooltipArrow />
            <TooltipBody>
              {AI_DISCLAIMER}
              <p>
                <AI_SYS_PROMPT_MSG />
              </p>
            </TooltipBody>
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default function GenerativeAIToggle() {
  const { isChecked, handleCheckChange } = useGenerativeAISearchToggle();

  return (
    <>
      <GenerativeAIToggleWrapper data-testid="generative-ai-toggle">
        <CheckboxRootStyled
          checked={isChecked}
          id="isGenerativeAI"
          onCheckedChange={handleCheckChange}
        >
          <CheckboxIndicator>
            <IconCheck />
          </CheckboxIndicator>
        </CheckboxRootStyled>
        <label htmlFor="isGenerativeAI">{AI_TOGGLE_LABEL}</label>
        <GenerativeAITooltip />
      </GenerativeAIToggleWrapper>
    </>
  );
}
