import { GetServerSideProps, NextPage } from "next";

import EmbeddedViewer from "@/components/Work/EmbeddedViewer";
import React from "react";
import type { Work } from "@nulib/dcapi-types";
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
  const { userCanRead } = useWorkAuth(work);

  const searchParams = getUrlSearchParams(decodeURIComponent(router.asPath));

  return (
    <EmbeddedViewer
      work={work}
      userCanRead={userCanRead}
      searchParams={searchParams}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mId = decodeURIComponent(context?.params?.manifestId as string);

  const workId = new URL(mId).pathname.split("/").pop()!;

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
