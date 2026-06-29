import React from "react";
import { ViewerConfigOptions } from "@samvera/clover-iiif";
import { Work } from "@nulib/dcapi-types";
import { WorkProvider } from "@/context/work-context";
import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";
import WorkViewerWrapper from "@/components/Clover/ViewerWrapper";

const EmbeddedViewer = ({
  work,
  userCanRead,
  isAuthLoading,
  searchParams,
}: {
  work: Work;
  userCanRead?: boolean;
  isAuthLoading?: boolean;
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
  const viewerOptions: ViewerConfigOptions = {
    informationPanel: {
      open: informationPanelOpen === "true" ? true : false,
      renderToggle: true,
    },
    showIIIFBadge: false,
    showTitle: showTitle === "true" ? true : false,
  };

  const loginRequired =
    (isAuthLoading && work?.visibility !== "Public") || // Work is not public and auth is loading
    (work && !userCanRead); // Work is loaded and user cannot read

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
