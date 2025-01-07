import {
  StyledIIIFContentState,
  StyledIIIFContentStateActiveFile,
  StyledIIIFContentStateButton,
  StyledIIIFContentStateInner,
  StyledIIIFContentStateOptions,
  StyledIIIFContentStateURI,
} from "./ContentState.styled";
import { useRef, useState } from "react";

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

  const canvasCount = manifest?.items?.length;
  const canvasIndex =
    Number(manifest?.items?.findIndex((item) => item.id === activeCanvasId)) +
    1;

  const activeCanvasResourceType =
    // @ts-ignore
    activeCanvas?.items?.[0]?.items?.[0]?.body?.type;

  const title = "Share";

  function handleClick() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const uri = new URL(window.location.href);
  uri.searchParams.set("iiif-content", encodeContentState(contentState));
  const shareUrl = uri.toString();

  function handleIsCurrentFileSetChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setIsCurrentFileset(event.target.checked);
  }

  function handleIsNoteChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsNote(event.target.checked);
  }

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
              {work.title && work.thumbnail && (
                <SharedSocial
                  title={work.title}
                  media={work.thumbnail}
                  description={work.description}
                />
              )}
            </ActionsDialogAside>
            <StyledIIIFContentStateInner>
              <Heading
                as="h3"
                css={{ margin: "0", fontSize: "1em !important" }}
              >
                Current Item
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
                  <span>Share active file</span>
                  <StyledIIIFContentStateActiveFile>
                    <em>
                      {canvasIndex} of {canvasCount}
                    </em>
                    <Image
                      alt="Thumbnail of the active canvas"
                      width={rem}
                      height={rem}
                      src={activeCanvasThumbnail as string}
                      style={{
                        objectFit: "cover",
                        borderRadius: "3px",
                        marginLeft: "0.5em",
                        marginRight: "0.5em",
                        marginTop: "-2px",
                      }}
                    />
                    <Label label={activeCanvas?.label} />
                  </StyledIIIFContentStateActiveFile>
                </label>

                {isCurrentFileset ? (
                  ["Video", "Audio"].includes(activeCanvasResourceType) ? (
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
                  )
                ) : null}

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
