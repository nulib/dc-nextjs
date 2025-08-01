import * as Tooltip from "@radix-ui/react-tooltip";

import React, { useEffect, useState } from "react";
import {
  StyledStack,
  StyledStackContent,
  StyledStackDismiss,
  StyledStackFillerItem,
  StyledStackItem,
} from "./Stack.styled";
import { TooltipArrow, TooltipBody } from "../../Shared/Tooltip.styled";
import {
  TooltipContent,
  TooltipTrigger,
} from "@/components/Search/GenerativeAI.styled";

import { ApiSearchRequestBody } from "@/types/api/request";
import { ChatContext } from "@/types/context/search-context";
import Figure from "@/components/Figure/Figure";
import { IconClear } from "@/components/Shared/SVG/Icons";
import SearchResultsMessage from "@/components/Search/ResultsMessage";
import { buildQuery } from "@/lib/queries/builder";
import { createResultsMessageFromContext } from "@/lib/chat-helpers";
import { getQueryRepresentativeThumbnail } from "@/lib/dc-api";
import { isSanitizedWork } from "@/lib/work-helpers";
import { rem } from "@/styles/global";

interface StackProps {
  context: ChatContext;
  dismissCallback?: () => void;
  isDismissable: boolean;
}

/**
 * Renders a stack of documents
 */
const Stack = ({
  context,
  dismissCallback,
  isDismissable = true,
}: StackProps) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>("");

  const label = createResultsMessageFromContext(context);

  function handleDismiss() {
    setIsDismissed(true);
    if (dismissCallback) {
      dismissCallback();
    }
  }

  useEffect(() => {
    (async () => {
      const collectionFacet = context.facets.find(
        (facet) => facet["collection.title.keyword"],
      );

      if (collectionFacet) {
        const collectionTitle = collectionFacet
          ? collectionFacet["collection.title.keyword"]
          : "";

        const body: ApiSearchRequestBody = buildQuery(
          {
            size: 1,
            term: context.query,
            urlFacets: {
              collection: [collectionTitle],
            },
          },
          false,
        );

        const thumb = await getQueryRepresentativeThumbnail(body, 4 * rem);

        if (thumb) setThumbnail(thumb || "");
      } else {
        const candidate = context?.works?.find(
          (work) => isSanitizedWork(work) && work.thumbnail,
        );

        if (candidate) setThumbnail(candidate.thumbnail || "");
      }
    })();
  }, [context]);

  /**
   * If there is no results message, we do not render the stack.
   */
  if (!label) return null;

  return (
    <StyledStack
      data-testid="stack"
      data-isdismissed={isDismissed}
      data-results-message={label}
    >
      <StyledStackContent>
        <Tooltip.Provider delayDuration={20}>
          <Tooltip.Root data-testid="stack-tooltip">
            <TooltipTrigger>
              <StyledStackItem>
                <Figure
                  data={{
                    aspectRatio: 1,
                    src: thumbnail,
                    title: context.query,
                  }}
                  hideCaption={true}
                />
              </StyledStackItem>
            </TooltipTrigger>
            <Tooltip.Portal>
              <TooltipContent
                side="bottom"
                sideOffset={3}
                collisionPadding={19}
              >
                <TooltipArrow />
                <TooltipBody>
                  <SearchResultsMessage label={label} textAlign="center" />
                </TooltipBody>
              </TooltipContent>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
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

export default React.memo(Stack);
