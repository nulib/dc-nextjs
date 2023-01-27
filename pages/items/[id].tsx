import {
  type CollectionWorkCountMap,
  getCollectionWorkCounts,
} from "@/lib/collection-helpers";
import { GetStaticPropsContext, NextPage } from "next";
import { getWork, getWorkSliders } from "@/lib/work-helpers";
import Container from "@/components/Shared/Container";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Shared/ErrorFallback";
import Head from "next/head";
import Layout from "components/layout";
import { Manifest } from "@iiif/presentation-3";
import React from "react";
import RelatedItems from "@/components/Shared/RelatedItems";
import { UserContext } from "@/context/user-context";
import { WorkProvider } from "@/context/work-context";
import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";
import { WorkShape } from "@/types/components/works";
import WorkTopInfo from "@/components/Work/TopInfo";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";
import { buildWorkDataLayer } from "@/lib/ga/data-layer";
import { buildWorkOpenGraphData } from "@/lib/open-graph";
import { getIIIFResource } from "@/lib/dc-api";
import { loadItemStructuredData } from "@/lib/json-ld";

interface WorkPageProps {
  collectionWorkCounts: CollectionWorkCountMap | null;
  manifest?: Manifest;
  work: WorkShape;
}

const WorkPage: NextPage<WorkPageProps> = ({
  collectionWorkCounts,
  manifest,
  work,
}) => {
  const userAuthContext = React.useContext(UserContext);

  if (!work || !manifest)
    return (
      <Layout>
        <Container>Aw, shucks. Something went wrong.</Container>
      </Layout>
    );

  const related = getWorkSliders(work);
  const isRestricted =
    work.visibility === "Private" ||
    (!userAuthContext?.user?.isLoggedIn && work.visibility !== "Public");
  const collectionWorkTypeCounts =
    collectionWorkCounts && collectionWorkCounts[work.collection?.id];
  const isReadingRoom = userAuthContext?.user?.isReadingRoom;

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
            {!isRestricted || isReadingRoom ? (
              <WorkViewerWrapper manifestId={work.iiif_manifest} />
            ) : (
              <WorkRestrictedDisplay thumbnail={work.thumbnail} />
            )}
            <Container>
              <WorkTopInfo
                manifest={manifest}
                work={work}
                collectionWorkTypeCounts={collectionWorkTypeCounts}
              />
              <RelatedItems collectionUris={related} title="Explore Further" />
            </Container>
          </ErrorBoundary>
        </WorkProvider>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  return {
    fallback: "blocking",
    paths: [],
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const work = params?.id ? await getWork(params.id as string) : null;
  const manifest = work ? await getIIIFResource(work.iiif_manifest) : null;
  const collectionWorkCounts = work?.collection
    ? await getCollectionWorkCounts(work?.collection.id)
    : null;

  /** Add values to GTM's dataLayer object */
  const dataLayer = work ? buildWorkDataLayer(work) : [];

  /** Populate OpenGraph data */
  const openGraphData = work ? buildWorkOpenGraphData(work) : {};

  return {
    props: {
      collectionWorkCounts,
      dataLayer,
      manifest,
      openGraphData,
      work,
    },
    revalidate: 3600,
  };
}

export default WorkPage;
