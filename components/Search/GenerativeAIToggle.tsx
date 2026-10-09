import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import checkboxStyles from "@/components/Shared/Checkbox.module.css";
import generativeAIStyles from "@/components/Search/GenerativeAI.module.css";
import tooltipStyles from "@/components/Shared/Tooltip.module.css";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  AI_DISCLAIMER,
  AI_TOGGLE_LABEL,
  AI_SYS_PROMPT_MSG,
} from "@/lib/constants/common";
import { IconCheck } from "@/components/Shared/SVG/Icons";
import { IconInfo } from "@/components/Shared/SVG/Icons";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
function GenerativeAITooltip() {
  return (
    <Tooltip.Provider delayDuration={20}>
      <Tooltip.Root data-testid="tooltip">
        <Tooltip.Trigger className={tooltipStyles.tooltipTrigger}>
          <IconInfo />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            sideOffset={3}
            collisionPadding={19}
            className={tooltipStyles.tooltipContent}
          >
            <Tooltip.Arrow className={tooltipStyles.tooltipArrow} />
            <div className={tooltipStyles.tooltipBody}>
              {AI_DISCLAIMER}
              <p>
                <AI_SYS_PROMPT_MSG />
              </p>
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
export default function GenerativeAIToggle() {
  const { isChecked, handleCheckChange } = useGenerativeAISearchToggle();
  return (
    <>
      <div
        data-testid="generative-ai-toggle"
        className={generativeAIStyles.generativeAIToggleWrapper}
      >
        <CheckboxPrimitive.Root
          checked={isChecked}
          id="isGenerativeAI"
          onCheckedChange={handleCheckChange}
          className={checkboxStyles.checkboxRoot}
        >
          <CheckboxPrimitive.Indicator
            className={checkboxStyles.checkboxIndicator}
          >
            <IconCheck />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label htmlFor="isGenerativeAI">{AI_TOGGLE_LABEL}</label>
        <GenerativeAITooltip />
      </div>
    </>
  );
}
