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
import type { Work } from "@nulib/dcapi-types";
import dynamic from "next/dynamic";

export const CloverViewer = dynamic(
  () => import("@samvera/clover-iiif/viewer"),
  {
    ssr: false,
  },
);

interface WrapperProps {
  manifestId: Work["iiif_manifest"];
  isWorkRestricted?: boolean;
  viewerOptions?: ViewerConfigOptions;
}

const WorkViewerWrapper: React.FC<WrapperProps> = ({
  manifestId,
  isWorkRestricted,
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

  return (
    <Container containerType="wide">
      <ViewerWrapperStyled data-testid="work-viewer-wrapper">
        {manifestId && (
          <CloverViewer
            // @ts-ignore
            customTheme={customTheme}
            iiifContent={manifestId}
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

export default WorkViewerWrapper;
