import React from "react";
import { ViewerWrapperStyled } from "@/components/Work/ViewerWrapper.styled";
import dynamic from "next/dynamic";

export const CloverIIIF: React.ComponentType<{
  customTheme: {
    colors: { [key: string]: string };
    fonts: { [key: string]: string };
  };
  manifestId: string;
  options: { [key: string]: boolean | string };
}> = dynamic(() => import("@samvera/clover-iiif"), {
  ssr: false,
});

interface WrapperProps {
  manifestId: string;
}

const WorkViewerWrapper: React.FC<WrapperProps> = ({ manifestId }) => {
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
      display: "$display",
      sans: "$sans",
    },
  };

  const options = {
    canvasBackgroundColor: "$black",
    canvasHeight: "640px",
    showIIIFBadge: false,
    showTitle: false,
  };

  return (
    <ViewerWrapperStyled data-testid="work-viewer-wrapper">
      {manifestId && (
        <CloverIIIF
          customTheme={customTheme}
          manifestId={manifestId}
          options={options}
        />
      )}
    </ViewerWrapperStyled>
  );
};

export default WorkViewerWrapper;
