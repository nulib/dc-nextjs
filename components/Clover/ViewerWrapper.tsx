import {
  AnnouncementContent,
  ContentSearchControls,
  ViewerWrapperStyled,
} from "@/components/Clover/ViewerWrapper.styled";
import type {
  CloverViewerProps,
  ViewerConfigOptions,
} from "@samvera/clover-iiif";
import Announcement from "@/components/Shared/Announcement";
import { Button } from "@nulib/design-system";
import { CONTENT_SEARCH_PARAM } from "@/lib/constants/works";
import Container from "../Shared/Container";
import { IconInfo, IconSearch } from "@/components/Shared/SVG/Icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getContentSearchServiceUrl } from "@/lib/iiif/manifest-helpers";
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
  const { manifest, work } = workState;
  const viewerWrapperRef = useRef<HTMLDivElement>(null);
  const [renderContentSearch, setRenderContentSearch] = useState(
    Boolean(searchQuery),
  );

  const hasContentSearch = Boolean(getContentSearchServiceUrl(manifest));

  useEffect(() => {
    if (searchQuery) setRenderContentSearch(true);
  }, [searchQuery]);

  const isAudioVideoWork =
    work?.work_type === "Audio" || work?.work_type === "Video";

  const options: CloverViewerProps["options"] = useMemo(() => {
    const informationPanel = {
      open: Boolean(searchQuery),
      // Clover only mounts the panel when About or annotations are available.
      // About keeps the shell mounted for content searches with zero matches.
      renderAbout: Boolean(searchQuery),
      renderToggle: false,
      renderContentSearch,
      defaultTab: renderContentSearch
        ? "manifest-content-search"
        : "manifest-annotations",
      ...(isAudioVideoWork && { annotationTabLabel: "Chapters" }),
    };
    return {
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
  }, [renderContentSearch, searchQuery, isAudioVideoWork, viewerOptions]);

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
    const url = new URL(window.location.href);
    ["canvas", "label", "q", "snippet"].forEach((param) =>
      url.searchParams.delete(param),
    );

    if (query) {
      url.searchParams.set(CONTENT_SEARCH_PARAM, query);
    } else {
      url.searchParams.delete(CONTENT_SEARCH_PARAM);
    }

    // Clover invokes this callback on every keystroke. Updating Next router
    // state here changes searchQuery and therefore Clover's key, remounting the
    // entire viewer. Keep the address bar in sync without triggering a render;
    // URL-driven searches still use the router and intentionally remount below.
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
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
        {hasContentSearch && !renderContentSearch && (
          <ContentSearchControls>
            <Button
              aria-label="Search within document"
              isLowercase
              isPrimary
              onClick={() => setRenderContentSearch(true)}
            >
              <IconSearch />
              Search within document
            </Button>
          </ContentSearchControls>
        )}
        {resolvedIiifContent && (
          <CloverViewer
            // Clover treats its initial search and default tab as initialization
            // state, so a new URL-driven query needs a fresh viewer instance.
            key={`content-search:${renderContentSearch}:${searchQuery || ""}`}
            // @ts-ignore
            contentSearchCallback={handleContentSearchCallback}
            contentStateCallback={handleContentStateCallback}
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
