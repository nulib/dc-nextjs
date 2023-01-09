import {
  AnnouncementContent,
  ViewerWrapperStyled,
} from "@/components/Work/ViewerWrapper.styled";
import Announcement from "@/components/Shared/Announcement";
import { IconInfo } from "@/components/Shared/SVG/Icons";
import { Options as OpenSeadragonOptions } from "openseadragon";
import React from "react";
import { UserContext } from "@/pages/_app";
import dynamic from "next/dynamic";

export const CloverIIIF: React.ComponentType<{
  customTheme: {
    colors: { [key: string]: string };
    fonts: { [key: string]: string };
  };
  id: string;
  options: {
    [key: string]: OpenSeadragonOptions | boolean | string;
  };
}> = dynamic(() => import("@samvera/clover-iiif"), {
  ssr: false,
});

interface WrapperProps {
  manifestId: string;
}

const WorkViewerWrapper: React.FC<WrapperProps> = ({ manifestId }) => {
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

  const options = {
    canvasBackgroundColor: "$black",
    canvasHeight: "640px",
    renderAbout: false,
    showIIIFBadge: false,
    showInformationToggle: false,
    showTitle: false,
    withCredentials: true,
  };

  return (
    <ViewerWrapperStyled data-testid="work-viewer-wrapper">
      {manifestId && (
        <CloverIIIF
          customTheme={customTheme}
          id={manifestId}
          options={options}
        />
      )}
      {userAuth?.user?.isReadingRoom && (
        <Announcement>
          <AnnouncementContent>
            <IconInfo />
            <p>You have access to Work because you are in the reading room</p>
          </AnnouncementContent>
        </Announcement>
      )}
    </ViewerWrapperStyled>
  );
};

export default WorkViewerWrapper;
