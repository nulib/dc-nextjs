import { GetStaticPropsContext, NextPage } from "next";
import { getWork, getWorkIds } from "@/lib/work-helpers";
import Container from "@/components/Shared/Container";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Shared/ErrorFallback";
import Head from "next/head";
import Layout from "components/layout";
import { Manifest } from "@iiif/presentation-3";
import React from "react";
import RelatedItems from "@/components/Shared/RelatedItems";
import { UserContext } from "@/pages/_app";
import { WorkProvider } from "@/context/work-context";
import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";
import { WorkShape } from "@/types/components/works";
import WorkTopInfo from "@/components/Work/TopInfo";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";
import { buildWorkDataLayer } from "@/lib/ga/data-layer";
import { buildWorkOpenGraphData } from "@/lib/open-graph";
import { getIIIFResource } from "@/lib/dc-api";
import { getRelatedCollections } from "@/lib/iiif/collection-helpers";
import { loadItemStructuredData } from "@/lib/json-ld";

interface WorkPageProps {
  manifest?: Manifest;
  work: WorkShape;
}

const WorkPage: NextPage<WorkPageProps> = ({ manifest, work }) => {
  const userAuthContext = React.useContext(UserContext);

  if (!work || !manifest)
    return (
      <Layout>
        <Container>Aw, shucks. Something went wrong.</Container>
      </Layout>
    );

  const related = getRelatedCollections(work);
  const isRestricted =
    work.visibility === "Private" ||
    (!userAuthContext?.user && work.visibility !== "Public");

  return (
    <>
      {/* Google Structured Data via JSON-LD */}
      <Head>
        <script
          key="app-ld-json"
          id="app-ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              loadItemStructuredData(work, `/items/${work.id}`),
              null,
              "\t"
            ),
          }}
        ></script>
      </Head>

      <Layout title={work.title}>
        <WorkProvider initialState={{ manifest: manifest, work: work }}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {isRestricted && (
              <WorkRestrictedDisplay thumbnail={work.thumbnail} />
            )}
            {!isRestricted && (
              <WorkViewerWrapper
                manifestId={`${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/works/${work.id}?as=iiif`}
              />
            )}
            <Container>
              <WorkTopInfo manifest={manifest} work={work} />
              <RelatedItems collections={related} title="Explore Further" />
            </Container>
          </ErrorBoundary>
        </WorkProvider>
      </Layout>
    </>
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
  const work = params?.id ? await getWork(params.id as string) : null;
  const manifest = work ? await getIIIFResource(work.iiif_manifest) : null;

  /** Add values to GTM's dataLayer object */
  const dataLayer = work ? buildWorkDataLayer(work) : [];

  /** Populate OpenGraph data */
  const openGraphData = work ? buildWorkOpenGraphData(work) : {};

  return {
    props: { dataLayer, manifest, openGraphData, work },
    revalidate: 10,
  };
}

export default WorkPage;
