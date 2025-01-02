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
import { UserContext } from "@/context/user-context";
import dynamic from "next/dynamic";

export const CloverViewer = dynamic(
  () => import("@samvera/clover-iiif/viewer"),
  {
    ssr: false,
  },
);

interface WrapperProps {
  contentStateCallback?: (contentState: any) => void;
  iiifContent?: string;
  isWorkRestricted?: boolean;
  manifestId: string | null;
  viewerOptions?: ViewerConfigOptions;
}

const WorkViewerWrapper: React.FC<WrapperProps> = ({
  contentStateCallback,
  iiifContent,
  isWorkRestricted,
  manifestId,
  viewerOptions = {},
}) => {
  const userAuth = React.useContext(UserContext);

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
  };

  function handleCanvasIdCallback(activeCanvas: string) {
    if (activeCanvas && contentStateCallback) {
      const contentStateAnnotationId = `${manifestId}/content-state}`;
      const contentState = {
        "@context": "http://iiif.io/api/presentation/3/context.json",
        id: contentStateAnnotationId,
        type: "Annotation",
        motivation: ["contentState"],
        target: {
          id: activeCanvas,
          type: "Canvas",
          partOf: [
            {
              id: manifestId,
              type: "Manifest",
            },
          ],
        },
      };

      contentStateCallback(JSON.stringify(contentState));
    }
  }

  return (
    <Container containerType="wide">
      <ViewerWrapperStyled data-testid="work-viewer-wrapper">
        {manifestId && (
          <CloverViewer
            // @ts-ignore
            canvasIdCallback={handleCanvasIdCallback}
            customTheme={customTheme}
            iiifContent={iiifContent || manifestId}
            options={options}
          />
        )}
        {isWorkRestricted && userAuth?.user?.isReadingRoom && (
          <Announcement>
            <AnnouncementContent>
              <IconInfo />
              <p>You have access to Work because you are in the reading room</p>
            </AnnouncementContent>
          </Announcement>
        )}
      </ViewerWrapperStyled>
    </Container>
  );
};

export default React.memo(WorkViewerWrapper);
