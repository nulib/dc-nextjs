import * as Tooltip from "@radix-ui/react-tooltip";

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
import SharedAlertDialog from "../Shared/AlertDialog";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";

function GenerativeAITooltip() {
  const generativeAIWarning = `The answers and provided links are generated using chatGPT and metadata from Northwestern University Libraries Digital Collections. This is an experiment and results may be inaccurate, irrelevant, or potentially harmful.`;

  return (
    <Tooltip.Provider delayDuration={20}>
      <Tooltip.Root data-testid="tooltip">
        <TooltipTrigger>
          <IconInfo />
        </TooltipTrigger>
        <Tooltip.Portal>
          <TooltipContent side="bottom" sideOffset={3} collisionPadding={19}>
            <TooltipArrow />
            <TooltipBody>{generativeAIWarning}</TooltipBody>
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

type GenerativeAIToggleProps = {
  isSearchActive: boolean;
};

export default function GenerativeAIToggle({
  isSearchActive,
}: GenerativeAIToggleProps) {
  const { closeDialog, dialog, isChecked, handleCheckChange, handleLogin } =
    useGenerativeAISearchToggle();

  return (
    <>
      <GenerativeAIToggleWrapper
        {...(isSearchActive ? { css: { marginRight: "$gr5" } } : {})}
      >
        <CheckboxRootStyled
          checked={isChecked}
          id="isGenerativeAI"
          onCheckedChange={handleCheckChange}
        >
          <CheckboxIndicator>
            <IconCheck />
          </CheckboxIndicator>
        </CheckboxRootStyled>
        <label htmlFor="isGenerativeAI">Use Generative AI</label>
        <GenerativeAITooltip />
      </GenerativeAIToggleWrapper>

      <SharedAlertDialog
        isOpen={dialog.isOpen}
        cancel={{ label: "Cancel", onClick: closeDialog }}
        action={{ label: "Login", onClick: handleLogin }}
      >
        You must be logged in with a Northwestern NetID to use the Generative AI
        search feature.
      </SharedAlertDialog>
    </>
  );
}