import * as Tooltip from "@radix-ui/react-tooltip";

import {
  AI_DISCLAIMER,
  AI_LOGIN_ALERT,
  AI_TOGGLE_LABEL,
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
import SharedAlertDialog from "../Shared/AlertDialog";
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
            <TooltipBody>{AI_DISCLAIMER}</TooltipBody>
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default function GenerativeAIToggle() {
  const { closeDialog, dialog, isChecked, handleCheckChange, handleLogin } =
    useGenerativeAISearchToggle();

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

      <SharedAlertDialog
        isOpen={dialog.isOpen}
        cancel={{ label: "Cancel", onClick: closeDialog }}
        action={{ label: "Login", onClick: handleLogin }}
      >
        {AI_LOGIN_ALERT}
      </SharedAlertDialog>
    </>
  );
}
