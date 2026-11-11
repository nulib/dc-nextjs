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

  const activeCanvasId = getContentStateCanvasId(contentState);
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
      : annotationBody?.items?.[0]?.type;

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

/**
 * The Canvas a content state points to. Clover 4 targets the Canvas itself
 * (`{ id, type: "Canvas" }`) when there is no time or region to keep, and a
 * `SpecificResource` (`{ source, selector }`) when there is; a target may
 * also be a URI string, with a fragment, or an array of targets.
 */
function getContentStateCanvasId(contentState: any): string | undefined {
  const target = [contentState?.json?.target].flat()[0];
  const resource = target?.source ?? target;
  const id = typeof resource === "string" ? resource : resource?.id;
  return typeof id === "string" ? id.split("#")[0] : undefined;
}

export { getContentStateCanvasId, getContentStateMetadata };
