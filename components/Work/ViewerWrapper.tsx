import React from "react";
import { ViewerWrapperStyled } from "@/components/Work/ViewerWrapper.styled";
import dynamic from "next/dynamic";

export const CloverIIIF: React.ComponentType<{ manifestId: string }> = dynamic(
  () => import("@samvera/clover-iiif"),
  {
    ssr: false,
  }
);

interface WrapperProps {
  manifestId: string;
}

const WorkViewerWrapper: React.FC<WrapperProps> = ({ manifestId }) => {
  return (
    <ViewerWrapperStyled data-testid="work-viewer-wrapper">
      {manifestId && <CloverIIIF manifestId={manifestId} />}
    </ViewerWrapperStyled>
  );
};

export default WorkViewerWrapper;
