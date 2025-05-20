import {
  CollectionHeader,
  Description,
  HeroWrapper,
  Interstitial,
} from "@/components/Collection/Collection.styled";
import type {
  GenericAggsReturn,
  GetTopMetadataAggsReturn,
  WorkTypeCountMap,
} from "@/lib/collection-helpers";
import { GetServerSideProps, NextPage } from "next";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Collection/NavTabs.styled";
import { formatNumber, pluralize } from "@/lib/utils/count-helpers";
import {
  getCollection,
  getCollectionWorkCounts,
  getMetadataAggs,
  getTopMetadataAggs,
} from "@/lib/collection-helpers";
import { useEffect, useState } from "react";

import { ApiResponseBucket } from "@/types/api/response";
import CollectionTabsExplore from "@/components/Collection/Tabs/Explore";
import CollectionTabsMetadata from "@/components/Collection/Tabs/Metadata";
import CollectionTabsOrganization from "@/components/Collection/Tabs/Organization";
import { Collection as CollectionType } from "@nulib/dcapi-types";
import Container from "@/components/Shared/Container";
import Facts from "@/components/Shared/Facts";
import Head from "next/head";
import Heading from "@/components/Heading/Heading";
import Hero from "@/components/Hero/Hero";
import IIIFShare from "@/components/Shared/IIIF/Share";
import Layout from "components/layout";
import ReadMore from "@/components/Shared/ReadMore";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { getHeroCollection } from "@/lib/iiif/collection-helpers";
import { loadCollectionStructuredData } from "@/lib/json-ld";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
import { useRouter } from "next/router";

const Collection: NextPage = () => {
  const router = useRouter();
  const [collection, setCollection] = useState<CollectionType>();
  const [metadata, setMetadata] = useState<ApiResponseBucket[]>([]);
  const [series, setSeries] = useState<GenericAggsReturn[]>([]);
  const [topMetadata, setTopMetadata] = useState<GetTopMetadataAggsReturn[]>(
    [],
  );
  const [workTypeCounts, setWorkTypeCounts] = useState<WorkTypeCountMap | null>(
    null,
  );

  const { isChecked: isAI } = useGenerativeAISearchToggle();

  const description = collection?.description;

  /** Get the Collection */
  useEffect(() => {
    if (!router.isReady || !router.query.id) {
      return;
    }

    const collectionId = router.query.id;
    if (!collectionId || Array.isArray(collectionId)) {
      return;
    }

    async function getCollectionData(collectionId: string) {
      const data = await getCollection(collectionId);

      // This is not preferred, but auth is only respected client side
      // so need this for items to display in Reading Room
      if (!data) return router.push("/404");

      setCollection(data);
    }

    async function getMetadataData(collectionId: string) {
      /** Get metadata */
      const metadataAggsPromise = getMetadataAggs(
        collectionId,
        "subject.label",
      );

      /** Get some data to build out "About" slider content for the Explore tab */
      const topMetadataPromise = getTopMetadataAggs({
        collectionId,
        metadataFields: ["subject.label", "genre.label"],
      });

      const collectionWorkCountsPromise = getCollectionWorkCounts([
        collectionId,
      ]);

      const seriesPromise = getMetadataAggs(collectionId, "series");

      const responses = await Promise.allSettled([
        metadataAggsPromise,
        topMetadataPromise,
        collectionWorkCountsPromise,
        seriesPromise,
      ]);

      const [
        metadataAggs,
        topMetadataResponse,
        collectionWorkCounts,
        seriesResponse,
      ] = responses;

      if (metadataAggs.status === "fulfilled" && metadataAggs.value) {
        setMetadata(metadataAggs.value);
      }

      if (
        topMetadataResponse.status === "fulfilled" &&
        topMetadataResponse.value
      ) {
        setTopMetadata(topMetadataResponse.value);
      }

      const workTypeCountsValue =
        collectionWorkCounts.status === "fulfilled" &&
        collectionWorkCounts.value
          ? collectionWorkCounts.value[collectionId]
          : null;
      if (workTypeCountsValue) {
        setWorkTypeCounts(workTypeCountsValue);
      }

      if (seriesResponse.status === "fulfilled" && seriesResponse.value) {
        setSeries(seriesResponse.value);
      }
    }

    getCollectionData(collectionId);
    getMetadataData(collectionId);
  }, [router, router.isReady, router.query.id]);

  const totalAudio = workTypeCounts?.totalAudio || 0;
  const totalImage = workTypeCounts?.totalImage || 0;
  const totalVideo = workTypeCounts?.totalVideo || 0;
  const totalWorks = workTypeCounts?.totalWorks || 0;

  return (
    <>
      {collection && (
        <Head>
          <script
            id="app-ld-json"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                loadCollectionStructuredData(
                  collection,
                  `/colllections/${collection.id}`,
                ),
                null,
                "\t",
              ),
            }}
          />
          <title>{collection.title}</title>
        </Head>
      )}

      <Layout
        description={description || ""}
        header="hero"
        title={collection?.title || ""}
      >
        {collection && (
          <>
            <HeroWrapper>
              <Hero collection={getHeroCollection(collection, isAI)} />
            </HeroWrapper>
            <Interstitial>
              <Container>
                <Facts>
                  <Facts.Item
                    big={formatNumber(totalWorks)}
                    small={pluralize("Total Work", totalWorks, undefined, true)}
                  />
                  <Facts.Item
                    big={formatNumber(totalImage)}
                    small={pluralize("Image Work", totalImage, undefined, true)}
                  />
                  <Facts.Item
                    big={formatNumber(totalVideo)}
                    small={pluralize("Video Work", totalVideo, undefined, true)}
                  />
                  <Facts.Item
                    big={formatNumber(totalAudio)}
                    small={pluralize("Audio Work", totalAudio, undefined, true)}
                  />
                </Facts>
              </Container>
            </Interstitial>
            <Container>
              <Tabs defaultValue="explore">
                <TabsList aria-label="Explore">
                  <TabsTrigger value="explore">About</TabsTrigger>
                  <TabsTrigger value="organization">
                    Collection Organization
                  </TabsTrigger>
                  <TabsTrigger value="metadata">All Subjects</TabsTrigger>
                </TabsList>
                <TabsContent value="explore">
                  <CollectionHeader>
                    <Heading
                      as="h2"
                      css={{
                        margin: "0 0 $gr2 !important",
                      }}
                    >
                      {collection?.title}
                    </Heading>{" "}
                    <IIIFShare uri={String(collection.iiif_collection)} />
                  </CollectionHeader>
                  {description && (
                    <Description data-testid="description">
                      {<ReadMore text={description} words={55} />}
                    </Description>
                  )}
                  {topMetadata.length > 0 && (
                    <CollectionTabsExplore
                      collection={collection}
                      topMetadata={topMetadata}
                    />
                  )}
                </TabsContent>
                <TabsContent value="organization">
                  {series.length > 0 && (
                    <CollectionTabsOrganization
                      collection={collection}
                      series={series}
                    />
                  )}
                </TabsContent>
                <TabsContent value="metadata">
                  {metadata.length > 0 && (
                    <CollectionTabsMetadata
                      collection={collection}
                      metadata={metadata}
                    />
                  )}
                </TabsContent>
              </Tabs>
            </Container>
          </>
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;
  const collection = await getCollection(id as string);

  /** Add values to GTM's dataLayer object */
  const dataLayer = buildDataLayer({
    adminset: "",
    collections: (collection?.title as string) || "",
    creatorsContributors: "",
    isLoggedIn: false,
    pageTitle: (collection?.title as string) || "",
    rightsStatement: "",
    subjects: "",
    visibility: collection?.visibility || "",
  });

  /** Populate OpenGraph data */
  const imageUrl = collection?.representative_image?.url
    ? `${collection?.representative_image.url}/full/600,600/0/default.jpg`
    : "";
  const openGraphData = !collection
    ? {}
    : {
        "og:description": collection.description,
        "og:image": imageUrl,
        "og:image:secure_url": imageUrl,
        "og:title": `${collection.title}`,
        "og:type": "website",
        "og:url": `${process.env.NEXT_PUBLIC_DC_URL}/collections/${collection.id}`,
      };

  return {
    props: {
      dataLayer,
      id,
      openGraphData,
    },
  };
};

export default Collection;
