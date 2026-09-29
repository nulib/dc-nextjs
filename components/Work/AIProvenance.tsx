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
import {
  AIProvenanceFieldList,
  AIProvenanceStatus,
  AIProvenanceStyled,
} from "@/components/Work/AIProvenance.styled";
import { IconInfo, IconSparkles } from "@/components/Shared/SVG/Icons";
import {
  TooltipArrow,
  TooltipBody,
  TooltipContent,
  TooltipTrigger,
} from "@/components/Shared/Tooltip.styled";
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
    <AIProvenanceStyled data-testid="ai-provenance">
      <IconSparkles />
      <span>{label}</span>
      <Tooltip.Provider delayDuration={20}>
        <Tooltip.Root onOpenChange={handleOpenChange}>
          <TooltipTrigger
            type="button"
            aria-label={AI_PROVENANCE_TOOLTIP_TRIGGER_LABEL}
            data-testid="ai-provenance-tooltip-trigger"
          >
            <IconInfo />
          </TooltipTrigger>
          <Tooltip.Portal>
            <TooltipContent side="bottom" sideOffset={3} collisionPadding={19}>
              <TooltipArrow />
              <TooltipBody data-testid="ai-provenance-tooltip">
                <p>{AI_PROVENANCE_TOOLTIP_INTRO}</p>
                {metadataFields.length > 0 && (
                  <>
                    <p>
                      <strong>{AI_PROVENANCE_TOOLTIP_FIELDS_INTRO}</strong>
                    </p>
                    <AIProvenanceFieldList>
                      {metadataFields.map(({ key, label, status }) => (
                        <li key={key}>
                          {label}:{" "}
                          <AIProvenanceStatus>{status}</AIProvenanceStatus>
                        </li>
                      ))}
                    </AIProvenanceFieldList>
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
                      <AIProvenanceFieldList>
                        {labeledTranscriptions.map(({ key, label, status }) => (
                          <li key={key}>
                            {label}:{" "}
                            <AIProvenanceStatus>{status}</AIProvenanceStatus>
                          </li>
                        ))}
                      </AIProvenanceFieldList>
                    )}
                  </>
                )}
                <p>{AI_PROVENANCE_TOOLTIP_CAVEAT}</p>
              </TooltipBody>
            </TooltipContent>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </AIProvenanceStyled>
  );
};

export default WorkAIProvenance;
