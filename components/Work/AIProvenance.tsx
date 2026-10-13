import tooltipStyles from "@/components/Shared/Tooltip.module.css";
import aIProvenanceStyles from "@/components/Work/AIProvenance.module.css";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  AI_PROVENANCE_LABEL_BOTH,
  AI_PROVENANCE_LABEL_METADATA,
  AI_PROVENANCE_LABEL_TRANSCRIPTIONS,
  AI_PROVENANCE_TOOLTIP_CAVEAT,
  AI_PROVENANCE_TOOLTIP_FIELDS_INTRO,
  AI_PROVENANCE_TOOLTIP_INTRO,
  AI_PROVENANCE_TOOLTIP_TRIGGER_LABEL,
  aiProvenanceTranscriptionCopy,
} from "@/lib/constants/common";
import { IconInfo, IconSparkles } from "@/components/Shared/SVG/Icons";
import {
  getAIInvolvement,
  getTranscriptionFileSetLabels,
} from "@/lib/ai-provenance";
import React from "react";
import type { WorkWithAIProvenance } from "@/types/api/ai-provenance";
interface AIProvenanceProps {
  work?: WorkWithAIProvenance;
}
/**
 * High level disclosure that generative AI was involved in this work's
 * descriptive metadata and/or its file set transcriptions.
 *
 * The pill names which sections AI touched — metadata, transcriptions, or
 * both — so the disclosure is specific before the tooltip is ever opened.
 *
 * The pill text carries the disclosure on its own; the tooltip is supplemental
 * detail, since Radix tooltips are not reachable on touch.
 */
const WorkAIProvenance: React.FC<AIProvenanceProps> = ({ work }) => {
  const {
    hasAI,
    hasMetadata,
    hasTranscription,
    metadataFields,
    transcriptions,
  } = getAIInvolvement(work);
  const [fileSetLabels, setFileSetLabels] = React.useState<
    Record<string, string>
  >({});
  const labelsRequested = React.useRef(false);
  /**
   * The file set a transcription belongs to is not on the work payload, so it
   * costs a request. Defer it until the tooltip is actually opened — most
   * visitors never open it — and only ever issue it once.
   */
  const handleOpenChange = (open: boolean) => {
    if (!open || labelsRequested.current || transcriptions.length === 0) return;
    labelsRequested.current = true;
    getTranscriptionFileSetLabels(work?.id).then(setFileSetLabels);
  };
  if (!hasAI) return null;
  let label = AI_PROVENANCE_LABEL_TRANSCRIPTIONS;
  if (hasMetadata && hasTranscription) label = AI_PROVENANCE_LABEL_BOTH;
  else if (hasMetadata) label = AI_PROVENANCE_LABEL_METADATA;
  // A transcription whose file set did not come back (not yet loaded, request
  // failed, or the file set is not visible to this viewer) is left out of the
  // list rather than shown unlabeled. The count sentence above still reports
  // the true total.
  const labeledTranscriptions = transcriptions
    .map((transcription) => ({
      ...transcription,
      label: fileSetLabels[transcription.annotationId],
    }))
    .filter(({ label }) => Boolean(label));
  return (
    <div
      data-testid="ai-provenance"
      className={aIProvenanceStyles.aIProvenanceStyled}
    >
      <IconSparkles />
      <span>{label}</span>
      <Tooltip.Provider delayDuration={20}>
        <Tooltip.Root onOpenChange={handleOpenChange}>
          <Tooltip.Trigger
            type="button"
            aria-label={AI_PROVENANCE_TOOLTIP_TRIGGER_LABEL}
            data-testid="ai-provenance-tooltip-trigger"
            className={tooltipStyles.tooltipTrigger}
          >
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
              <div
                data-testid="ai-provenance-tooltip"
                className={tooltipStyles.tooltipBody}
              >
                <p>{AI_PROVENANCE_TOOLTIP_INTRO}</p>
                {metadataFields.length > 0 && (
                  <>
                    <p>
                      <strong>{AI_PROVENANCE_TOOLTIP_FIELDS_INTRO}</strong>
                    </p>
                    <ul className={aIProvenanceStyles.aIProvenanceFieldList}>
                      {metadataFields.map(({ key, label, status }) => (
                        <li key={key}>
                          {label}:{" "}
                          <span
                            className={aIProvenanceStyles.aIProvenanceStatus}
                          >
                            {status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {transcriptions.length > 0 && (
                  <>
                    <p>
                      <strong>
                        {aiProvenanceTranscriptionCopy(
                          transcriptions.length,
                          labeledTranscriptions.length > 0,
                        )}
                      </strong>
                    </p>
                    {labeledTranscriptions.length > 0 && (
                      <ul className={aIProvenanceStyles.aIProvenanceFieldList}>
                        {labeledTranscriptions.map(({ key, label, status }) => (
                          <li key={key}>
                            {label}:{" "}
                            <span
                              className={aIProvenanceStyles.aIProvenanceStatus}
                            >
                              {status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
                <p>{AI_PROVENANCE_TOOLTIP_CAVEAT}</p>
              </div>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};
export default WorkAIProvenance;
