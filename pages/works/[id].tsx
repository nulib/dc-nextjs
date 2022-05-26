import { GetStaticPropsContext, NextPage } from "next";
import { getWork, getWorkIds } from "@/lib/work-helpers";
import Container from "@/components/Shared/Container";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Shared/ErrorFallback";
import Layout from "components/layout";
import { Manifest } from "@iiif/presentation-3";
import React from "react";
import { WorkShape } from "@/types/components/works";
import WorkTopInfo from "@/components/Work/TopInfo";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";
import { buildPres3Manifest } from "@/lib/iiif/manifest-helpers";

interface WorkPageProps {
  manifest?: Manifest;
  work: WorkShape;
}
const WorkPage: NextPage<WorkPageProps> = ({ manifest, work }) => {
  if (!work) {
    return null;
  }

  return (
    <Layout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <WorkViewerWrapper manifestId={work.iiif_manifest} />
        <Container>
          <WorkTopInfo manifest={manifest} work={work} />
        </Container>
      </ErrorBoundary>
    </Layout>
  );
};

export async function getStaticPaths() {
  const workIds = await getWorkIds();
  const paths = workIds.map((id) => ({ params: { id } }));

  return {
    fallback: "blocking",
    paths,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const work = params?.id ? await getWork(params.id as string) : undefined;
  const manifest = work ? await buildPres3Manifest(work) : undefined;

  return {
    props: { manifest, work },
    revalidate: 10, // In seconds
  };
}

export default WorkPage;
