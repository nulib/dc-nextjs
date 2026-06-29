import {
  AnnouncementContent,
  ViewerWrapperStyled,
} from "@/components/Clover/ViewerWrapper.styled";
import type {
  CloverViewerProps,
  ViewerConfigOptions,
} from "@samvera/clover-iiif";
import Announcement from "@/components/Shared/Announcement";
import Container from "../Shared/Container";
import { IconInfo } from "@/components/Shared/SVG/Icons";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useWorkState } from "@/context/work-context";

export const CloverViewer = dynamic(
  () => import("@samvera/clover-iiif/viewer"),
  {
    ssr: false,
  },
);

interface WrapperProps {
  isWorkReadingRoomOnly?: boolean;
  isLoggingContentState?: boolean;
  iiifContent: string | null;
  initialCanvasId?: string;
  initialLabel?: string;
  initialSnippet?: string;
  searchQuery?: string;
  viewerOptions?: ViewerConfigOptions;
}

const EMPTY_VIEWER_OPTIONS: ViewerConfigOptions = {};

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
  const { work } = workState;
  const router = useRouter();

  const isAudioVideoWork =
    work?.work_type === "Audio" || work?.work_type === "Video";

  const customTheme = {
    colors: {
      accent: "$purple",
      accentAlt: "$purple120",
      accentMuted: "$purple30",
      primary: "$black",
      primaryAlt: "$black80",
      primaryMuted: "$black50",
      secondary: "$white",
      secondaryAlt: "$black10",
      secondaryMuted: "$gray6",
    },
    fonts: {
      display: "$northwesternDisplay",
      sans: "$northwesternSans",
    },
  };

  const options: CloverViewerProps["options"] = useMemo(() => {
    const informationPanel = {
      renderAbout: false,
      renderToggle: false,
      renderContentSearch: true,
      defaultTab: searchQuery
        ? "manifest-content-search"
        : "manifest-annotations",
      ...(isAudioVideoWork && { annotationTabLabel: "Chapters" }),
    };
    return {
      canvasBackgroundColor: "$gray6",
      canvasHeight: "640px",
      informationPanel,
      openSeadragon: {
        gestureSettingsMouse: {
          scrollToZoom: false,
        },
      },
      map: {
        enabled: true,
        fitToData: true,
        navPlaceLevel: "auto",
        showImageOverlay: true,
        showControlPoints: false,
        overlayScope: "manifest",
      },
      showIIIFBadge: false,
      showTitle: false,
      withCredentials: true,
      ...viewerOptions,
    };
  }, [searchQuery, isAudioVideoWork, viewerOptions]);

  const handleContentSearchCallback = (query: string) => {
    const { canvas: _c, label: _l, snippet: _s, ...restQuery } = router.query;
    router.replace({ query: { ...restQuery, q: query } }, undefined, {
      shallow: true,
    });
  };

  const handleContentStateCallback = (contentState: string) => {
    if (
      isLoggingContentState &&
      contentState &&
      // @ts-ignore
      workState?.contentState?.encoded !== contentState?.encoded
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
      <ViewerWrapperStyled data-testid="work-viewer-wrapper">
        {resolvedIiifContent && (
          <CloverViewer
            // @ts-ignore
            contentSearchCallback={handleContentSearchCallback}
            contentStateCallback={handleContentStateCallback}
            customTheme={customTheme}
            iiifContent={resolvedIiifContent}
            iiifContentSearchQuery={
              searchQuery ? { q: searchQuery } : undefined
            }
            options={options}
          />
        )}
        {isWorkReadingRoomOnly && (
          <Announcement>
            <AnnouncementContent>
              <IconInfo />
              <p>
                You have access to this Work because you are in the reading room
              </p>
            </AnnouncementContent>
          </Announcement>
        )}
      </ViewerWrapperStyled>
    </Container>
  );
};

export default React.memo(WorkViewerWrapper);
