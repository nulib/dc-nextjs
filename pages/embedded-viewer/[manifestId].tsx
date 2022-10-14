import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";

interface WorkPageProps {
  manifestId: string;
}

const WorkPage: NextPage<WorkPageProps> = ({ manifestId }) => {
  return (
    <>
      <WorkViewerWrapper manifestId={decodeURIComponent(manifestId)} />
    </>
  );
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const manifestId = params?.manifestId || null;

  return {
    props: { manifestId },
  };
}

export default WorkPage;
