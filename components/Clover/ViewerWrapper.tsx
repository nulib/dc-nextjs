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
import React from "react";
import { decodeContentState } from "@iiif/helpers";
import dynamic from "next/dynamic";
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
  viewerOptions?: ViewerConfigOptions;
}

const WorkViewerWrapper: React.FC<WrapperProps> = ({
  isWorkReadingRoomOnly,
  isLoggingContentState = false,
  iiifContent,
  viewerOptions = {},
}) => {
  const { workDispatch, workState } = useWorkState();
  const { work } = workState;

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

  const defaultOptions: ViewerConfigOptions = {
    canvasBackgroundColor: "$gray6",
    canvasHeight: "640px",
    informationPanel: {
      open: false,
      renderAbout: false,
      renderToggle: false,
      defaultTab: "manifest-annotations",
    },
    openSeadragon: {
      gestureSettingsMouse: {
        scrollToZoom: false,
      },
    },
    showIIIFBadge: false,
    showTitle: false,
    withCredentials: true,
  };

  const options: CloverViewerProps["options"] = {
    ...defaultOptions,
    ...viewerOptions,
    ...(isAudioVideoWork && {
      informationPanel: {
        ...defaultOptions.informationPanel,
        annotationTabLabel: "Chapters",
      },
    }),
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

  try {
    // @ts-ignore
    const iiifContentState = JSON?.parse(decodeContentState(iiifContent));
    if (iiifContentState?.id) console.log(iiifContentState?.id);
  } catch (error) {}

  return (
    <Container containerType="wide">
      <ViewerWrapperStyled data-testid="work-viewer-wrapper">
        {iiifContent && (
          <CloverViewer
            // @ts-ignore
            contentStateCallback={handleContentStateCallback}
            customTheme={customTheme}
            iiifContent={iiifContent}
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
