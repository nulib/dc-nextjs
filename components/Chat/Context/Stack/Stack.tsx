import * as Tooltip from "@radix-ui/react-tooltip";

import {
  StyledStack,
  StyledStackContent,
  StyledStackDismiss,
  StyledStackFillerItem,
  StyledStackItem,
} from "./Stack.styled";
import { TooltipArrow, TooltipBody } from "@/components/Shared/Tooltip.styled";

import { ChatContext } from "@/types/context/search-context";
import { IconClear } from "@/components/Shared/SVG/Icons";
import type { Work } from "@nulib/dcapi-types";
import { styled } from "@/stitches.config";
import { useState } from "react";

interface StackProps {
  context: ChatContext;
  isDismissable: boolean;
  dismissCallback?: () => void;
}

interface SanitizedWork extends Work {
  title: NonNullable<Work["title"]>;
  thumbnail: NonNullable<Work["thumbnail"]>;
}

function isSanitizedWork(work: Partial<Work>): work is SanitizedWork {
  return work.title && work.thumbnail ? true : false;
}

/**
 * Renders a stack of documents
 */
const Stack = ({
  context,
  isDismissable = true,
  dismissCallback,
}: StackProps) => {
  const [isDismissed, setIsDismissed] = useState(false);

  function handleDismiss() {
    setIsDismissed(true);
    if (dismissCallback) {
      dismissCallback();
    }
  }

  const resultsMssg = context
    ? `Results for '${context.query}' ${Object.keys(context.facets).length ? "filtered on " : ""}${Object.entries(
        context.facets,
      )
        .map(
          ([key, values]) =>
            `${key} value(s) ${values?.map((v) => `'${v}'`).join(", ")}`,
        )
        .join("; and ")}`
    : "Filtered search results";
  return (
    <StyledStack data-testid="stack" data-isdismissed={isDismissed}>
      <StyledStackContent>
        {context.works
          .filter(isSanitizedWork)
          .slice(0, 1)
          .map((document) => (
            <Tooltip.Provider delayDuration={20} key={document.id}>
              <Tooltip.Root data-testid="stack-tooltip">
                <TooltipTrigger asChild>
                  <StyledStackItem>
                    <img src={document.thumbnail} alt={document.title} />
                  </StyledStackItem>
                </TooltipTrigger>
                <Tooltip.Portal>
                  <TooltipContent
                    side="bottom"
                    sideOffset={3}
                    collisionPadding={19}
                  >
                    <TooltipArrow />
                    <TooltipBody>{resultsMssg}</TooltipBody>
                  </TooltipContent>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          ))}
        <StyledStackFillerItem></StyledStackFillerItem>
        <StyledStackFillerItem></StyledStackFillerItem>
      </StyledStackContent>
      {isDismissable && (
        <StyledStackDismiss
          onClick={() => handleDismiss()}
          aria-label="Remove results"
          data-testid="stack-dismiss"
        >
          <IconClear title="Remove results" />
        </StyledStackDismiss>
      )}
    </StyledStack>
  );
};

const TooltipTrigger = styled(Tooltip.Trigger, {
  background: "transparent",
  border: "none",
});

const TooltipContent = styled(Tooltip.Content, {
  zIndex: 2,
});

export default Stack;
