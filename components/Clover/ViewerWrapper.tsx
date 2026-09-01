import {
  AnnouncementContent,
  ViewerWrapperStyled,
} from "@/components/Clover/ViewerWrapper.styled";
import type {
  CloverViewerProps,
  ViewerConfigOptions,
} from "@samvera/clover-iiif";
import Announcement from "@/components/Shared/Announcement";
import { CONTENT_SEARCH_PARAM } from "@/lib/constants/works";
import Container from "../Shared/Container";
import { IconInfo } from "@/components/Shared/SVG/Icons";
import React, { useEffect, useMemo, useRef } from "react";
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
  const viewerWrapperRef = useRef<HTMLDivElement>(null);

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
      open: Boolean(searchQuery),
      // Clover only mounts the panel when About or annotations are available.
      // About keeps the shell mounted for content searches with zero matches.
      renderAbout: Boolean(searchQuery),
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
      showIIIFBadge: false,
      showTitle: false,
      withCredentials: true,
      ...viewerOptions,
    };
  }, [searchQuery, isAudioVideoWork, viewerOptions]);

  useEffect(() => {
    const wrapper = viewerWrapperRef.current;
    if (!searchQuery || !wrapper) return;

    // Clover's InformationPanel resets its active tab to About in a mount
    // effect (and whenever annotations are absent), which runs after the
    // Search tab first appears in the DOM. Keep re-selecting Search until the
    // user interacts with the viewer themselves, so manual tab changes stick.
    const MAX_SELECTIONS = 10;
    let selections = 0;
    let isSelecting = false;

    const selectContentSearchTab = () => {
      if (isSelecting || selections >= MAX_SELECTIONS) return;
      const tab = wrapper.querySelector<HTMLButtonElement>(
        '[role="tab"][aria-controls$="-content-search"]',
      );
      if (!tab || tab.getAttribute("aria-selected") === "true") return;
      selections += 1;
      isSelecting = true;
      try {
        tab.click();
      } finally {
        isSelecting = false;
      }
    };

    const observer = new MutationObserver(selectContentSearchTab);
    const stop = () => {
      observer.disconnect();
      wrapper.removeEventListener("pointerdown", stop, true);
      wrapper.removeEventListener("keydown", stop, true);
    };

    observer.observe(wrapper, {
      attributeFilter: ["aria-selected"],
      attributes: true,
      childList: true,
      subtree: true,
    });
    wrapper.addEventListener("pointerdown", stop, true);
    wrapper.addEventListener("keydown", stop, true);
    selectContentSearchTab();

    return stop;
  }, [searchQuery]);

  const handleContentSearchCallback = (query: string) => {
    const {
      canvas: _c,
      label: _l,
      q: _q,
      snippet: _s,
      [CONTENT_SEARCH_PARAM]: _contentSearch,
      ...restQuery
    } = router.query;
    router.replace(
      {
        query: {
          ...restQuery,
          ...(query && { [CONTENT_SEARCH_PARAM]: query }),
        },
      },
      undefined,
      {
        shallow: true,
      },
    );
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
      <ViewerWrapperStyled
        data-testid="work-viewer-wrapper"
        ref={viewerWrapperRef}
      >
        {resolvedIiifContent && (
          <CloverViewer
            // Clover treats its initial search and default tab as initialization
            // state, so a new URL-driven query needs a fresh viewer instance.
            key={`content-search:${searchQuery || ""}`}
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
