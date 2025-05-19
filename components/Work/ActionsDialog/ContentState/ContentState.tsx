import React, { useEffect, useState } from "react";
import {
  StyledIIIFContentState,
  StyledIIIFContentStateButton,
} from "./ContentState.styled";

import CopyText from "@/components/Shared/CopyText";
import Heading from "@/components/Heading/Heading";
import SharedSocial from "@/components/Shared/Social";
import { StyledShareURL } from "../DownloadAndShare/DownloadAndShare.styled";
import { convertTime } from "@/lib/utils/time-helpers";
import { encodeContentState } from "@iiif/helpers";
import { getContentStateMetadata } from "@/lib/iiif/content-state-helpers";
import { useWorkState } from "@/context/work-context";

const WorkDialogContentState = () => {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isCanvasChecked, setIsCanvasChecked] = useState(false);

  const {
    workState: { work, manifest, contentState },
  } = useWorkState();
  const formRef = React.useRef<HTMLFormElement>(null);

  const metadata = getContentStateMetadata({
    manifest,
    contentState,
  });

  const appendNote =
    "Note: This annotation was included as part of a user-authored shared link.";
  const currentFileLabel = `${metadata?.activeCanvasIndex} of ${metadata?.canvasCount}`;

  useEffect(() => {
    const url = new URL(window.location.href);
    url.pathname = `/items/${work?.id}`;
    setShareUrl(url.toString());
  }, [work, contentState]);

  const handleFormChange = () => {
    const canvas = formRef.current?.querySelector(
      '[name="canvas"]',
    ) as HTMLInputElement;
    const selector = formRef.current?.querySelector(
      '[name="selector"]',
    ) as HTMLInputElement;
    const body = formRef.current?.querySelector(
      '[name="body"]',
    ) as HTMLTextAreaElement;

    // @ts-ignore
    const newContentState = { ...contentState?.json };

    if (!canvas?.checked) {
      if (selector) selector.checked = false;
      if (body) body.value = "";
    }

    if (!selector?.checked) {
      newContentState.target = {
        // @ts-ignore
        ...newContentState.target,
        selector: undefined,
      };
    }

    newContentState.body = body?.value
      ? [
          {
            type: "TextualBody",
            value: `${body?.value}\n <em>${appendNote}</em>`,
            format: "text/html",
          },
        ]
      : [];

    const url = new URL(window.location.href);
    url.pathname = `/items/${work?.id}`;

    const newShareUrl = new URL(url.toString());
    if (canvas?.checked) {
      newShareUrl.searchParams.set(
        "iiif-content",
        encodeContentState(JSON.stringify(newContentState)),
      );
    } else {
      newShareUrl.searchParams.delete("iiif-content");
    }

    setIsCanvasChecked(canvas?.checked);
    setShareUrl(newShareUrl.toString());
  };

  // @ts-ignore
  const targetSelector = contentState?.json?.target?.selector;
  const selectorValue = targetSelector?.t || targetSelector?.value;

  return (
    <section>
      <Heading as="h3" css={{ marginTop: "0" }}>
        Share URL
      </Heading>
      <StyledIIIFContentState>
        {work && work.title && work.thumbnail && (
          <SharedSocial
            title={work.title}
            media={work.thumbnail}
            description={work.description}
          />
        )}
        <form ref={formRef} onChange={handleFormChange}>
          <div>
            <StyledShareURL>
              <input type="text" value={String(shareUrl)} readOnly />
              {shareUrl && <CopyText textPrompt="Copy" textToCopy={shareUrl} />}
            </StyledShareURL>
          </div>
          {contentState && (
            <>
              <label>
                <input type="checkbox" name="canvas" value="canvas" />
                <span>
                  Jump to current {metadata.activeCanvasResourceLabel}{" "}
                  <em>({currentFileLabel})</em>
                </span>
              </label>
              {selectorValue && (
                <label aria-disabled={!isCanvasChecked}>
                  <input
                    type="checkbox"
                    name="selector"
                    value="selector"
                    disabled={!isCanvasChecked}
                  />
                  {["Video", "Sound", "Audio"].includes(
                    metadata?.activeCanvasResourceType,
                  ) ? (
                    <span>
                      Start {metadata.activeCanvasResourceLabel} at current time{" "}
                      <em>{convertTime(selectorValue)}</em>
                    </span>
                  ) : (
                    <span>
                      Zoom to current view of the{" "}
                      {metadata.activeCanvasResourceLabel}
                    </span>
                  )}
                </label>
              )}
              <label aria-disabled={!isCanvasChecked} data-element="textarea">
                <span>Add an annotation to shared URL</span>
                <textarea
                  name="body"
                  disabled={!isCanvasChecked}
                  placeholder="Add an comment or describe the content in view..."
                />
              </label>

              {shareUrl && (
                <StyledIIIFContentStateButton>
                  <CopyText textPrompt="Copy Share URL" textToCopy={shareUrl} />
                </StyledIIIFContentStateButton>
              )}
            </>
          )}
        </form>
      </StyledIIIFContentState>
    </section>
  );
};

export default WorkDialogContentState;
