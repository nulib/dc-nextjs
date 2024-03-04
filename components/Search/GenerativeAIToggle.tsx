import * as Tooltip from "@radix-ui/react-tooltip";

import {
  CheckboxIndicator,
  CheckboxRoot as CheckboxRootStyled,
} from "@/components/Shared/Checkbox.styled";
import {
  DialogButtonRow,
  FlexBody,
  GenerativeAIDialogMessage,
  GenerativeAIToggleWrapper,
  TooltipContent,
  TooltipTrigger,
} from "@/components/Search/GenerativeAI.styled";
import { TooltipArrow, TooltipBody } from "../Shared/Tooltip.styled";

import { Button } from "@nulib/design-system";
import GenerativeAIDialog from "@/components/Shared/Dialog";
import { IconCheck } from "@/components/Shared/SVG/Icons";
import { IconInfo } from "@/components/Shared/SVG/Icons";
import React from "react";
import { generativeAIWarning } from "@/components/Chat/components/Answer/Information";
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

      <div style={{ display: "flex" }}>
        <GenerativeAIDialog
          isOpen={dialog.isOpen}
          title={dialog.title}
          handleCloseClick={closeDialog}
          size="small"
        >
          <FlexBody>
            <GenerativeAIDialogMessage>
              You must be logged in with a Northwestern NetID to use the
              Generative AI search feature.
            </GenerativeAIDialogMessage>
            <DialogButtonRow>
              <Button isPrimary onClick={handleLogin}>
                Login
              </Button>
              <Button onClick={closeDialog}>Cancel</Button>
            </DialogButtonRow>
          </FlexBody>
        </GenerativeAIDialog>
      </div>
    </>
  );
}
