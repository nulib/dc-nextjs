import tooltipStyles from "@/components/Shared/Tooltip.module.css";
import stackStyles from "@/components/Chat/Stack/Stack.module.css";
import * as Tooltip from "@radix-ui/react-tooltip";
import React, { useEffect, useState } from "react";
import { ApiSearchRequestBody } from "@/types/api/request";
import { ChatContext } from "@/types/context/search-context";
import Figure from "@/components/Figure/Figure";
import { IconClear } from "@/components/Shared/SVG/Icons";
import SearchResultsMessage from "@/components/Search/ResultsMessage";
import { buildQuery } from "@/lib/queries/builder";
import { convertContextFacetsToUrlFacets } from "@/lib/utils/facet-helpers";
import { createResultsMessageFromContext } from "@/lib/chat-helpers";
import { getQueryRepresentativeThumbnail } from "@/lib/dc-api";
import { rem } from "@/styles/metrics";
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
      const body: ApiSearchRequestBody = buildQuery(
        {
          size: 1,
          term: context.query,
          urlFacets: convertContextFacetsToUrlFacets(context.facets),
        },
        false,
      );
      const thumb = await getQueryRepresentativeThumbnail(body, 4 * rem);
      setThumbnail(thumb || "");
    })();
  }, [context.query, context.facets]);
  /**
   * If there is no results message, we do not render the stack.
   */
  if (!label) return null;
  return (
    <div
      data-testid="stack"
      data-isdismissed={isDismissed}
      data-results-message={label}
      data-dc-slot="stack"
      className={stackStyles.styledStack}
    >
      <div
        data-dc-slot="stack"
        className={[stackStyles.styledStack, stackStyles.styledStackContent]
          .filter(Boolean)
          .join(" ")}
      >
        <Tooltip.Provider delayDuration={20}>
          <Tooltip.Root data-testid="stack-tooltip">
            <Tooltip.Trigger className={tooltipStyles.tooltipTrigger}>
              <div className={stackStyles.styledStackItem}>
                <Figure
                  data={{
                    aspectRatio: 1,
                    src: thumbnail,
                    title: label,
                  }}
                  hideCaption={true}
                />
              </div>
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
                  <SearchResultsMessage label={label} textAlign="center" />
                </div>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        <div
          className={[
            stackStyles.styledStackItem,
            stackStyles.styledStackFillerItem,
          ]
            .filter(Boolean)
            .join(" ")}
        ></div>
        <div
          className={[
            stackStyles.styledStackItem,
            stackStyles.styledStackFillerItem,
          ]
            .filter(Boolean)
            .join(" ")}
        ></div>
      </div>
      {isDismissable && (
        <button
          onClick={() => handleDismiss()}
          aria-label="Remove results"
          data-testid="stack-dismiss"
          className={stackStyles.styledStackDismiss}
        >
          <IconClear title="Remove results" />
        </button>
      )}
    </div>
  );
};
export default React.memo(Stack);
