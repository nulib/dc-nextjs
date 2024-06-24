import { GetServerSideProps, NextPage } from "next";

import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import React from "react";
import type { ViewerConfigOptions } from "@samvera/clover-iiif";
import type { Work } from "@nulib/dcapi-types";
import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";
import WorkViewerWrapper from "@/components/Clover/ViewerWrapper";
import { buildWorkDataLayer } from "@/lib/ga/data-layer";
import { getUrlSearchParams } from "@/lib/utils/get-url-search-params";
import { getWork } from "@/lib/work-helpers";
import { useRouter } from "next/router";
import useWorkAuth from "@/hooks/useWorkAuth";

interface EmbeddedViewerPageProps {
  work: Work;
}

const EmbeddedViewerPage: NextPage<EmbeddedViewerPageProps> = ({ work }) => {
  const router = useRouter();
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

  return (
    <>
      {!isWorkRestricted ? (
        <WorkViewerWrapper
          manifestId={work.iiif_manifest}
          viewerOptions={viewerOptions}
        />
      ) : (
        <WorkRestrictedDisplay thumbnail={thumbnail} />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mId = decodeURIComponent(context?.params?.manifestId as string);

  const workId = mId
    .replace(`${DCAPI_ENDPOINT}/works/`, "")
    .replace("?as=iiif", "");

  const work = await getWork(workId);
  const dataLayer = work ? buildWorkDataLayer(work) : [];

  return {
    props: {
      dataLayer,
      work,
    },
  };
};

export default EmbeddedViewerPage;
