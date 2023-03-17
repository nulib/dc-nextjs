import {
  type CollectionWorkCountMap,
  getCollectionWorkCounts,
} from "@/lib/collection-helpers";
import { GetServerSideProps, NextPage } from "next";
import { getWork, getWorkSliders } from "@/lib/work-helpers";
import { useContext, useEffect, useState } from "react";
import Container from "@/components/Shared/Container";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Shared/ErrorFallback";
import Head from "next/head";
import Layout from "components/layout";
import { Manifest } from "@iiif/presentation-3";
import RelatedItems from "@/components/Shared/RelatedItems";
import { UserContext } from "@/context/user-context";
import { type Work } from "@nulib/dcapi-types";
import { WorkProvider } from "@/context/work-context";
import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";
import WorkTopInfo from "@/components/Work/TopInfo";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";
import { buildWorkDataLayer } from "@/lib/ga/data-layer";
import { buildWorkOpenGraphData } from "@/lib/open-graph";
import { getIIIFResource } from "@/lib/dc-api";
import { loadItemStructuredData } from "@/lib/json-ld";
import { useRouter } from "next/router";
import useWorkAuth from "@/hooks/useWorkAuth";

interface WorkPageProps {
  collectionWorkCounts: CollectionWorkCountMap | null;
  id: Work["id"];
}

const WorkPage: NextPage<WorkPageProps> = ({ collectionWorkCounts, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const userAuthContext = useContext(UserContext);
  const [work, setWork] = useState<Work>();
  const [manifest, setManifest] = useState<Manifest>();
  const { isWorkRestricted } = useWorkAuth(work);
  const router = useRouter();

  const isReadingRoom = userAuthContext?.user?.isReadingRoom;
  const related = work ? getWorkSliders(work) : [];
  const collectionWorkTypeCounts =
    collectionWorkCounts &&
    work?.collection &&
    collectionWorkCounts[work.collection.id];

  useEffect(() => {
    if (!id) return;

    async function getData() {
      const work = await getWork(id);
      if (!work) {
        // This is not preferred, but auth is only respected client side
        // so need this for items to display in Reading Room
        router.push("/404");

        return setIsLoading(false);
      }
      setWork(work);
      const manifest = await getIIIFResource<Manifest>(work.iiif_manifest);
      setManifest(manifest);
      setIsLoading(false);
    }

    getData();
  }, [id, router]);

  return (
    <>
      {/* Google Structured Data via JSON-LD */}
      {work && (
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
      )}

      <Layout title={work?.title || ""}>
        {!isLoading && work && manifest && (
          <WorkProvider initialState={{ manifest: manifest, work: work }}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {work.iiif_manifest && (isReadingRoom || !isWorkRestricted) && (
                <WorkViewerWrapper
                  manifestId={work.iiif_manifest}
                  isWorkRestricted={isWorkRestricted}
                />
              )}
              {work && !isReadingRoom && isWorkRestricted && (
                <WorkRestrictedDisplay thumbnail={work.thumbnail} />
              )}
              <Container>
                {work && (
                  <WorkTopInfo
                    manifest={manifest}
                    work={work}
                    collectionWorkTypeCounts={collectionWorkTypeCounts}
                  />
                )}

                <RelatedItems
                  collectionUris={related}
                  title="Explore Further"
                />
              </Container>
            </ErrorBoundary>
          </WorkProvider>
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;
  const work = await getWork(id as string);

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
      id,
      openGraphData,
    },
  };
};

export default WorkPage;
