// @ts-nocheck

import { Manifest } from "@iiif/presentation-3";

function getContentStateMetadata({
  manifest,
  contentState,
}: {
  manifest?: Manifest;
  contentState: any;
}) {
  if (!manifest || !contentState) return {};

  const activeCanvasId = contentState?.json?.target?.source?.id;
  const activeCanvas = manifest?.items?.find(
    (item) => item.id === activeCanvasId,
  );
  const activeCanvasThumbnail = activeCanvas?.thumbnail?.[0]?.id;
  const canvasCount = Number(manifest?.items?.length);
  const activeCanvasIndex =
    Number(manifest?.items?.findIndex((item) => item.id === activeCanvasId)) +
    1;

  const annotationBody = activeCanvas?.items?.[0]?.items?.[0]?.body;

  const activeCanvasResourceType =
    annotationBody?.type && annotationBody?.type !== "Choice"
      ? annotationBody?.type
      : annotationBody.items?.[0]?.type;

  const activeCanvasResourceLabel = String(
    activeCanvasResourceType === "Sound" ? "audio" : activeCanvasResourceType,
  ).toLowerCase();

  return {
    activeCanvas,
    activeCanvasId,
    activeCanvasIndex,
    activeCanvasThumbnail,
    activeCanvasResourceLabel,
    activeCanvasResourceType,
    canvasCount,
  };
}

export { getContentStateMetadata };
