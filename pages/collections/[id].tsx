import type {
  GenericAggsReturn,
  GetTopMetadataAggsReturn,
} from "@/lib/collection-helpers";
import { GetStaticPropsContext, NextPage } from "next";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Collection/NavTabs.styled";
import {
  getCollection,
  getCollectionIds,
  getMetadataAggs,
  getTopMetadataAggs,
} from "@/lib/collection-helpers";
import { ApiResponseBucket } from "@/types/api/response";
import { CollectionShape } from "@/types/components/collections";
import CollectionTabsExplore from "@/components/Collection/Tabs/Explore";
import CollectionTabsMetadata from "@/components/Collection/Tabs/Metadata";
import CollectionTabsOrganization from "@/components/Collection/Tabs/Organization";
import Container from "@/components/Shared/Container";
import Head from "next/head";
import Hero from "@/components/Hero/Hero";
import { HeroWrapper } from "@/components/Collection/Collection.styled";
import Layout from "components/layout";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { getHeroCollection } from "@/lib/iiif/collection-helpers";
import { loadCollectionStructuredData } from "@/lib/json-ld";

interface CollectionProps {
  collection: CollectionShape | null;
  metadata: ApiResponseBucket[];
  topMetadata: GetTopMetadataAggsReturn[] | [];
  series: GenericAggsReturn[];
}

const Collection: NextPage<CollectionProps> = ({
  collection,
  metadata,
  topMetadata,
  series,
}) => {
  if (!collection) return null;

  const { description, id } = collection;

  return (
    <>
      <Head>
        <script
          id="app-ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              loadCollectionStructuredData(collection, `/colllections/${id}`),
              null,
              "\t"
            ),
          }}
        />
      </Head>
      <Layout>
        <HeroWrapper>
          <Hero collection={getHeroCollection(collection)} />
        </HeroWrapper>
        <Container>
          <Tabs defaultValue="explore">
            <TabsList aria-label="Explore">
              <TabsTrigger value="explore">About</TabsTrigger>
              <TabsTrigger value="metadata">Subjects</TabsTrigger>
              <TabsTrigger value="organization">
                Collection Organization
              </TabsTrigger>
            </TabsList>
            <TabsContent value="explore">
              <CollectionTabsExplore
                collectionId={id}
                description={description}
                topMetadata={topMetadata}
              />
            </TabsContent>
            <TabsContent value="metadata">
              <CollectionTabsMetadata metadata={metadata} />
            </TabsContent>
            <TabsContent value="organization">
              <CollectionTabsOrganization collectionId={id} series={series} />
            </TabsContent>
          </Tabs>
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const ids = await getCollectionIds();
  const paths = ids.map((id) => ({ params: { id } }));

  return {
    fallback: "blocking",
    paths,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const id = params?.id;
  const collection = id ? await getCollection(params.id as string) : null;
  const metadata =
    id && collection
      ? await getMetadataAggs(id as string, "subject.label")
      : null;

  /** Get some data to build out "About" slider content for the Explore tab */
  const topMetadata =
    id && collection
      ? await getTopMetadataAggs({
          collectionId: id as string,
          metadataFields: ["subject.label", "genre.label"],
        })
      : null;

  const series =
    id && collection ? await getMetadataAggs(id as string, "series") : null;

  /** Add values to GTM's dataLayer object */
  const dataLayer = buildDataLayer({
    adminset: "",
    collections: "",
    creatorsContributors: "",
    isLoggedIn: false,
    pageTitle: collection?.title as string,
    rightsStatement: "",
    subjects: "",
    visibility: collection?.visibility,
  });

  /** Populate OpenGraph data */
  const imageUrl = `${collection?.representative_image.url}/full/600,600/0/default.jpg`;
  const openGraphData = !collection
    ? {}
    : {
        "og:description": collection.description,
        "og:image": imageUrl,
        "og:image:secure_url": imageUrl,
        "og:site_name": `${collection.title} - Digital Collections - Libraries - Northwestern University`,
        "og:title": `${collection.title} - Digital Collections - Libraries - Northwestern University`,
        "og:type": "website",
        "og:url": `${process.env.DC_URL}/collections/${collection.id}`,
      };

  return {
    props: {
      collection,
      dataLayer,
      metadata,
      openGraphData,
      series,
      topMetadata,
    },
  };
}

export default Collection;
