import Image from "next/image";
import React from "react";
import { getContentStateMetadata } from "@/lib/iiif/content-state-helpers";
import { getValue } from "@iiif/helpers";
import { styled } from "@/stitches.config";
import { useWorkState } from "@/context/work-context";

const ContentStateActiveCanvas = () => {
  const {
    workState: { manifest, contentState },
  } = useWorkState();

  const metadata = getContentStateMetadata({
    manifest,
    contentState,
  });

  const currentFileLabel = `${metadata?.activeCanvasIndex} of ${metadata?.canvasCount}`;

  return (
    <StyledActiveCanvasWrapper>
      <header>
        Currently viewing {metadata.activeCanvasResourceLabel} (
        {currentFileLabel})
      </header>
      <StyledActiveCanvasContent>
        {metadata.activeCanvasThumbnail && (
          <Image
            src={metadata.activeCanvasThumbnail}
            alt={getValue(metadata.activeCanvas?.label)}
            width={48}
            height={48}
          />
        )}
        <StyledActiveCanvasText>
          <strong>{getValue(metadata.activeCanvas?.label)}</strong>
          <span>{metadata.activeCanvasResourceType}</span>
        </StyledActiveCanvasText>
      </StyledActiveCanvasContent>
    </StyledActiveCanvasWrapper>
  );
};

const StyledActiveCanvasWrapper = styled("div", {
  background: "transparent",
  border: "1px solid $gray6",
  padding: "$gr3",
  borderRadius: "3px",
  marginBottom: "$gr3",
  display: "flex",
  gap: "$gr2",
  flexDirection: "column",

  header: {
    fontSize: "$gr3",
    color: "$black50",
  },
});

const StyledActiveCanvasContent = styled("div", {
  display: "flex",
  gap: "$gr2",

  img: {
    borderRadius: "3px",
  },
});

const StyledActiveCanvasText = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$gr1",
  fontSize: "$gr2",
  color: "$black50",

  strong: {
    fontFamily: "$northwesternSansBold",
    fontSize: "$gr3",
    fontWeight: "400",
    color: "$black80",
  },
});

export default ContentStateActiveCanvas;
