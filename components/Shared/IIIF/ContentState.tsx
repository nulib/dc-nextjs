import {
  StyledIIIFContentState,
  StyledIIIFContentStateActiveFile,
  StyledIIIFContentStateButton,
  StyledIIIFContentStateInner,
  StyledIIIFContentStateOptions,
  StyledIIIFContentStateURI,
} from "./ContentState.styled";
import { useEffect, useRef, useState } from "react";

import ActionsDialogAside from "@/components/Work/ActionsDialog/Aside";
import { ActionsDialogStyled } from "@/components/Work/ActionsDialog/ActionsDialog.styled";
import { Button } from "@nulib/design-system";
import CopyText from "@/components/Shared/CopyText";
import Heading from "@/components/Heading/Heading";
import Image from "next/image";
import { Label } from "@samvera/clover-iiif/primitives";
import ShareIcon from "./ShareIcon";
import SharedDialog from "@/components/Shared/Dialog";
import SharedSocial from "../Social";
import { encodeContentState } from "@iiif/helpers";
import { rem } from "@/styles/global";
import { useWorkState } from "@/context/work-context";

interface IIIFContentStateProps {
  contentState: any;
}

const IIIFContentState: React.FC<IIIFContentStateProps> = ({
  contentState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNote, setIsNote] = useState(false);
  const [isCurrentFileset, setIsCurrentFileset] = useState(false);
  const [note, setNote] = useState("");

  const noteRef = useRef<HTMLTextAreaElement>(null);

  const {
    workState: { manifest, work },
  } = useWorkState();

  const activeCanvasId = JSON.parse(contentState)?.target?.id;
  const activeCanvas = manifest?.items?.find(
    (item) => item.id === activeCanvasId,
  );
  const activeCanvasThumbnail = activeCanvas?.thumbnail?.[0]?.id;

  const canvasCount = Number(manifest?.items?.length);
  const canvasIndex =
    Number(manifest?.items?.findIndex((item) => item.id === activeCanvasId)) +
    1;

  const activeCanvasResourceType =
    // @ts-ignore
    activeCanvas?.items?.[0]?.items?.[0]?.body?.type;

  const title = "Share";
  const currentFileLabel = `${canvasIndex} of ${canvasCount}`;

  function handleClick() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const uri = new URL(window.location.href);

  // set the iiif-content query param to the current content state
  if (isCurrentFileset)
    uri.searchParams.set("iiif-content", encodeContentState(contentState));

  const shareUrl = uri.toString();

  function handleIsCurrentFileSetChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setIsCurrentFileset(event.target.checked);
  }

  function handleIsNoteChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsNote(event.target.checked);
    // focus on the note textarea
    if (event.target.checked) noteRef.current?.focus();
  }

  useEffect(() => {
    if (isNote) noteRef.current?.focus();
  }, [isNote]);

  return (
    <StyledIIIFContentState>
      <StyledIIIFContentStateButton onClick={handleClick}>
        <ShareIcon />
        <span>{title}</span>
      </StyledIIIFContentStateButton>
      <SharedDialog
        title={title}
        handleCloseClick={close}
        isOpen={isOpen}
        size="small"
      >
        {work && (
          <ActionsDialogStyled>
            <ActionsDialogAside>
              <div
                style={{
                  padding: "1rem 1rem 0.618rem",
                  borderRadius: "3px",
                  background: "#f0f0f0",
                  marginTop: "1em",
                }}
              >
                <strong
                  style={{
                    fontSize: "0.7222rem",
                    fontWeight: "normal",
                    marginBottom: "1rem",
                    display: "block",
                  }}
                >
                  Currently viewing file {currentFileLabel}
                </strong>
                <StyledIIIFContentStateActiveFile>
                  <img
                    src={activeCanvasThumbnail as string}
                    style={{
                      width: "48px",
                      height: "48px",
                    }}
                  />
                  <div>
                    <Label label={activeCanvas?.label} />
                    <span>{activeCanvasResourceType}</span>
                  </div>
                </StyledIIIFContentStateActiveFile>
              </div>
            </ActionsDialogAside>
            <StyledIIIFContentStateInner>
              <Heading
                as="h3"
                css={{ margin: "0", fontSize: "1em !important" }}
              >
                Link
              </Heading>
              <StyledIIIFContentStateURI>
                <input value={shareUrl} />
                <CopyText textPrompt="Copy" textToCopy={shareUrl} />
              </StyledIIIFContentStateURI>
              <StyledIIIFContentStateOptions>
                <label>
                  <input
                    type="checkbox"
                    onChange={handleIsCurrentFileSetChange}
                  />
                  <span>Jump to current file</span>{" "}
                  <em>({currentFileLabel})</em>
                </label>

                {["Video", "Audio"].includes(activeCanvasResourceType) ? (
                  <label>
                    <input type="checkbox" />
                    <span>
                      Start at <em>5:39</em>
                    </span>
                  </label>
                ) : (
                  <label>
                    <input type="checkbox" />
                    <span>Share zoom level</span>
                  </label>
                )}
                <label>
                  <input type="checkbox" onChange={handleIsNoteChange} />
                  <span>Add note</span>
                </label>
                <textarea
                  ref={noteRef}
                  style={{ display: isNote ? "block" : "none" }}
                />
                <div style={{ marginTop: "1em", fontSize: "100% !important" }}>
                  <Button isPrimary isLowercase>
                    Copy Share URL
                  </Button>
                </div>
              </StyledIIIFContentStateOptions>
              {/* <textarea style={{ width: "100%" }}>{contentState}</textarea> */}
            </StyledIIIFContentStateInner>
          </ActionsDialogStyled>
        )}
      </SharedDialog>
    </StyledIIIFContentState>
  );
};

export default IIIFContentState;
