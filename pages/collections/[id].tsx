import { GetStaticPropsContext, NextPage } from "next";
import {
  HeroContent,
  HeroContentWrapper,
  HeroImageStyled,
  HeroStyled,
  ItemsLabel,
} from "@/components/Collection/Collection.styled";
import {
  NavTabTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Collection/NavTabs.styled";
import {
  getCollection,
  getCollectionIds,
  getMetadataAggs,
} from "@/lib/collection-helpers";
import { ApiResponseBucket } from "@/types/api/response";
import { Button } from "@nulib/design-system";
import { CollectionShape } from "@/types/components/collections";
import CollectionTabsExplore from "@/components/Collection/Tabs/Explore";
import CollectionTabsMetadata from "@/components/Collection/Tabs/Metadata";
import Container from "@/components/Shared/Container";
import Head from "next/head";
import Layout from "components/layout";
import ReadMore from "@/components/Shared/ReadMore";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { loadCollectionStructuredData } from "@/lib/json-ld";
import { useRouter } from "next/router";

interface CollectionProps {
  collection: CollectionShape | null;
  metadata: ApiResponseBucket[];
}

const Collection: NextPage<CollectionProps> = ({ collection, metadata }) => {
  const router = useRouter();

  if (!collection) return null;
  const { description, id, representative_image, title } = collection;

  // TODO: Should representative_image.url contain the full path?
  const collectionBgImage = representative_image.url
    ? `${representative_image.url}/full/!300,300/0/default.jpg`
    : "";

  const handleSearchClick = () => {
    router.push({ pathname: "/search", query: { q: id } });
  };

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
        <Container containerType="wide">
          <HeroStyled>
            <HeroContentWrapper>
              <HeroContent>
                <h1>{title}</h1>
                <ItemsLabel>2336 Items</ItemsLabel>

                <ReadMore text={description} words={40} />
                <div style={{ paddingTop: "1.5rem" }}>
                  <Button onClick={handleSearchClick}>Search Collection</Button>
                  {/* <Button>Browse Collection</Button> */}
                </div>
              </HeroContent>
            </HeroContentWrapper>
            <HeroImageStyled
              css={{
                backgroundImage: `url(${collectionBgImage})`,
              }}
            />
          </HeroStyled>
        </Container>

        <Container>
          <Tabs defaultValue="metadata">
            <TabsList aria-label="Explore">
              <TabsTrigger value="explore">
                <NavTabTitle>Explore</NavTabTitle>
              </TabsTrigger>
              <TabsTrigger value="metadata">
                <NavTabTitle>Subjects</NavTabTitle>
              </TabsTrigger>
              <TabsTrigger value="organization">
                <NavTabTitle>Collection Organization</NavTabTitle>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="explore">
              <CollectionTabsExplore />
            </TabsContent>
            <TabsContent value="metadata">
              <CollectionTabsMetadata metadata={metadata} />
            </TabsContent>
            <TabsContent value="organization">Yo</TabsContent>
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
    },
  };
}

export default Collection;
