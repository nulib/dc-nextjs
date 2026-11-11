import styles from "@/components/Clover/ViewerWrapper.module.css";
import type { ContentStateOutput, DefaultProps } from "@nulib/clover";
import Announcement from "@/components/Shared/Announcement";
import { CLOVER_REQUEST } from "@/components/Clover/clover-request";
import Container from "../Shared/Container";
import { IconInfo } from "@/components/Shared/SVG/Icons";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useWorkState } from "@/context/work-context";
export const CloverViewer = dynamic(
  () => import("@/components/Clover/CloverViewer"),
  { ssr: false },
);
export type ViewerOptions = Partial<Omit<DefaultProps, "iiifContent">>;
interface WrapperProps {
  isWorkReadingRoomOnly?: boolean;
  isLoggingContentState?: boolean;
  iiifContent: string | null;
  initialCanvasId?: string;
  initialLabel?: string;
  initialSnippet?: string;
  searchQuery?: string;
  viewerOptions?: ViewerOptions;
}
const EMPTY_VIEWER_OPTIONS: ViewerOptions = {};
// Viewer-specific panel sections; each still appears only where the resource
// has data. The work page renders the metadata below the viewer, so, as with
// Clover 3.x on DC, the About tab joins them only during a content search.
const WORK_PANEL_SECTIONS: DefaultProps["panelSections"] = [
  "contents",
  "search",
  "transcript",
  "annotations",
];
const WORK_SEARCH_PANEL_SECTIONS: DefaultProps["panelSections"] = [
  "about",
  ...(WORK_PANEL_SECTIONS ?? []),
];
const WorkViewerWrapper: React.FC<WrapperProps> = ({
  isWorkReadingRoomOnly,
  isLoggingContentState = false,
  iiifContent,
  initialCanvasId,
  initialLabel,
  initialSnippet,
  searchQuery,
  viewerOptions = EMPTY_VIEWER_OPTIONS,
}) => {
  const { workDispatch, workState } = useWorkState();
  const { manifest, work } = workState;
  const isAudioVideoWork =
    work?.work_type === "Audio" || work?.work_type === "Video";
  const hasAnnotations = Boolean(
    manifest?.items?.some((canvas) => canvas.annotations?.length),
  );
  const options: ViewerOptions = useMemo(
    () => ({
      header: false,
      // Clover 3.x showed the panel for works with annotations; Clover 4
      // starts it closed unless told otherwise. Clover 4's Panel opens its
      // Search section by itself when a searchQuery is present.
      defaultPanelOpen: Boolean(searchQuery) || hasAnnotations,
      panelLayout: "tabs",
      panelSections: searchQuery
        ? WORK_SEARCH_PANEL_SECTIONS
        : WORK_PANEL_SECTIONS,
      // Clover 3.x listed an A/V work's WebVTT under Annotations, which DC
      // labelled "Chapters"; Clover 4 shows WebVTT as a Transcript section.
      ...(isAudioVideoWork && {
        panelLabels: { annotations: "Chapters", transcript: "Chapters" },
      }),
      // TODO: Clover 4 has no contentSearchCallback; typing in the Search
      // section no longer mirrors the query into the URL (CONTENT_SEARCH_PARAM).
      ...viewerOptions,
    }),
    [searchQuery, hasAnnotations, isAudioVideoWork, viewerOptions],
  );
  const handleContentStateChange = (contentState: ContentStateOutput) => {
    if (
      isLoggingContentState &&
      workState?.contentState?.encoded !== contentState.encoded
    ) {
      workDispatch({
        type: "updateContentState",
        contentState,
      });
    }
  };
  const resolvedIiifContent = useMemo(() => {
    if (!initialCanvasId || !iiifContent) return iiifContent;
    const bodyText = [initialLabel, initialSnippet].filter(Boolean).join(": ");
    return {
      "@context": "http://iiif.io/api/presentation/3/context.json",
      id: `${iiifContent}/content-state/${initialCanvasId}`,
      type: "Annotation",
      motivation: ["contentState"],
      target: {
        type: "SpecificResource",
        source: {
          id: initialCanvasId,
          type: "Canvas",
          partOf: [{ id: iiifContent, type: "Manifest" }],
        },
      },
      ...(bodyText && {
        body: [{ type: "TextualBody", value: bodyText, format: "text/plain" }],
      }),
    };
  }, [initialCanvasId, iiifContent, initialLabel, initialSnippet]);
  return (
    <Container containerType="wide">
      <section
        data-testid="work-viewer-wrapper"
        className={styles.viewerWrapperStyled}
      >
        {resolvedIiifContent && (
          <CloverViewer
            {...options}
            iiifContent={resolvedIiifContent}
            onContentStateChange={handleContentStateChange}
            request={CLOVER_REQUEST}
            searchQuery={searchQuery || undefined}
          />
        )}
        {isWorkReadingRoomOnly && (
          <Announcement>
            <div className={styles.announcementContent}>
              <IconInfo />
              <p>
                You have access to this Work because you are in the reading room
              </p>
            </div>
          </Announcement>
        )}
      </section>
    </Container>
  );
};
export default React.memo(WorkViewerWrapper);
