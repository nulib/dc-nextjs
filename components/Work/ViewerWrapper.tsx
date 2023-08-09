import {
  AnnouncementContent,
  ViewerWrapperStyled,
} from "@/components/Work/ViewerWrapper.styled";
import Announcement from "@/components/Shared/Announcement";
import { IconInfo } from "@/components/Shared/SVG/Icons";
import { Options as OpenSeadragonOptions } from "openseadragon";
import React from "react";
import { UserContext } from "@/context/user-context";
import { type Work } from "@nulib/dcapi-types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

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
  manifestId: Work["iiif_manifest"];
  isWorkRestricted?: boolean;
}

const WorkViewerWrapper: React.FC<WrapperProps> = ({
  manifestId,
  isWorkRestricted,
}) => {
  const userAuth = React.useContext(UserContext);
  const router = useRouter();

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
    canvasBackgroundColor: "$gray6",
    canvasHeight: "640px",
    openSeadragon: {
      gestureSettingsMouse: {
        scrollToZoom: false,
      },
    },
    renderAbout: false,
    showIIIFBadge: false,
    showInformationToggle: false,
    showTitle: false,
    withCredentials: true,
  };

  // On an "embedded-viewer" route, show the metadata drawer in the viewer
  if (router.pathname === "/embedded-viewer/[manifestId]") {
    options["renderAbout"] = true;
    options["showInformationToggle"] = true;
    options["showIIIFBadge"] = true;
    options["showTitle"] = true;
  }

  return (
    <ViewerWrapperStyled data-testid="work-viewer-wrapper">
      {manifestId && (
        <CloverIIIF
          customTheme={customTheme}
          id={manifestId}
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
  );
};

export default WorkViewerWrapper;
