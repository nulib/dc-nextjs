import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import { NextPage } from "next";
import React from "react";
import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";
import { type WorkShape } from "@/types/components/works";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";
import { getWork } from "@/lib/work-helpers";
import { useRouter } from "next/router";
import useWorkAuth from "@/hooks/useWorkAuth";

const EmbeddedViewerPage: NextPage = () => {
  const router = useRouter();
  const [manifestId, setManifestId] = React.useState("");
  const [work, setWork] = React.useState<WorkShape | null>();

  const { isWorkRestricted } = useWorkAuth(work);

  const thumbnail = work?.thumbnail || "";

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
        <WorkViewerWrapper manifestId={manifestId} />
      ) : (
        <WorkRestrictedDisplay thumbnail={thumbnail} />
      )}
    </>
  );
};

export default EmbeddedViewerPage;
