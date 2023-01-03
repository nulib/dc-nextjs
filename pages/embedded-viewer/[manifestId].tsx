import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import { NextPage } from "next";
import React from "react";
import { UserContext } from "@/pages/_app";
import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";
import { type WorkShape } from "@/types/components/works";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";
import { getWork } from "@/lib/work-helpers";
import { useRouter } from "next/router";

const EmbeddedViewerPage: NextPage = () => {
  const router = useRouter();
  const [manifestId, setManifestId] = React.useState("");
  const [work, setWork] = React.useState<WorkShape | null>();
  const userAuthContext = React.useContext(UserContext);

  const isRestricted = () => {
    if (!work) return;
    return (
      work.visibility === "Private" ||
      (!userAuthContext?.user?.isLoggedIn && work.visibility !== "Public")
    );
  };

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
      {!isRestricted() ? (
        <WorkViewerWrapper manifestId={manifestId} />
      ) : (
        <WorkRestrictedDisplay thumbnail={thumbnail} />
      )}
    </>
  );
};

export default EmbeddedViewerPage;
