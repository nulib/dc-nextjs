import React from "react";
import { Work } from "@nulib/dcapi-types";
import { WorkProvider } from "@/context/work-context";
import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";
import WorkViewerWrapper, {
  type ViewerOptions,
} from "@/components/Clover/ViewerWrapper";

const EmbeddedViewer = ({
  work,
  userCanRead,
  loginRequired,
  searchParams,
}: {
  work: Work;
  userCanRead?: boolean;
  loginRequired?: boolean;
  searchParams: { [key: string]: string };
}) => {
  const thumbnail = work?.thumbnail || "";

  // Filter out any object properties which contain '/embedded-viewer' in the value
  const filteredSearchParams = Object.keys(searchParams)
    .filter((key) => !key.includes("/embedded-viewer") && !(key === "as"))
    .reduce(
      (obj, key) => {
        obj[key] = searchParams[key];
        return obj;
      },
      {} as { [key: string]: string },
    );

  const { informationPanelOpen = "false", showTitle = "true" } =
    filteredSearchParams;

  // Set up some default Clover Viewer UI configuration for the embed viewer use-case
  const viewerOptions: ViewerOptions = {
    defaultPanelOpen: informationPanelOpen === "true",
    header: showTitle === "true",
    // Embeds have no surrounding work page, so restore Clover's full panel
    // (including About) instead of the work page's trimmed sections.
    panelSections: undefined,
  };

  return (
    <WorkProvider>
      {userCanRead ? (
        <WorkViewerWrapper
          iiifContent={work.iiif_manifest}
          viewerOptions={viewerOptions}
        />
      ) : (
        loginRequired && <WorkRestrictedDisplay thumbnail={thumbnail} />
      )}
    </WorkProvider>
  );
};

export default EmbeddedViewer;
