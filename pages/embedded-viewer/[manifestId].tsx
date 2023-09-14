import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import { NextPage } from "next";
import React from "react";
import type { ViewerConfigOptions } from "@samvera/clover-iiif";
import type { Work } from "@nulib/dcapi-types";
import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";
import WorkViewerWrapper from "@/components/Clover/ViewerWrapper";
import { getUrlSearchParams } from "@/lib/utils/get-url-search-params";
import { getWork } from "@/lib/work-helpers";
import { useRouter } from "next/router";
import useWorkAuth from "@/hooks/useWorkAuth";

const EmbeddedViewerPage: NextPage = () => {
  const router = useRouter();
  const [manifestId, setManifestId] = React.useState("");
  const [work, setWork] = React.useState<Work | null>();

  const { isWorkRestricted } = useWorkAuth(work);
  const thumbnail = work?.thumbnail || "";

  const searchParams = getUrlSearchParams(decodeURIComponent(router.asPath));

  // Filter out any object properties which contain '/embedded-viewer' in the value
  const filteredSearchParams = Object.keys(searchParams)
    .filter((key) => !key.includes("/embedded-viewer") && !(key === "as"))
    .reduce(
      (obj, key) => {
        obj[key] = searchParams[key];
        return obj;
      },
      {} as { [key: string]: string }
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

  React.useEffect(() => {
    if (!router.isReady || !router.query.manifestId) return;

    const mId = decodeURIComponent(router.query.manifestId as string);

    const workId = mId
      .replace(`${DCAPI_ENDPOINT}/works/`, "")
      .replace("?as=iiif", "");

    (async () => {
      const workResponse = await getWork(workId);
      setWork(workResponse);
    })();

    setManifestId(mId);
  }, [router.isReady, router.query.manifestId]);

  return (
    <>
      {!isWorkRestricted ? (
        <WorkViewerWrapper
          manifestId={manifestId}
          viewerOptions={viewerOptions}
        />
      ) : (
        <WorkRestrictedDisplay thumbnail={thumbnail} />
      )}
    </>
  );
};

export default EmbeddedViewerPage;
