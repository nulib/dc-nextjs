import {
  CulturalContextStyled,
  HeroContent,
  HeroContentWrapper,
  HeroImageStyled,
  HeroStyled,
  ItemsLabel,
} from "@/components/Collection/Collection.styled";
import { GetStaticPropsContext, NextPage } from "next";
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
import Layout from "components/layout";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

interface CollectionProps {
  collection: CollectionShape | null;
  metadata: ApiResponseBucket[];
}

const Collection: NextPage<CollectionProps> = ({ collection, metadata }) => {
  const { searchDispatch } = useSearchState();
  const router = useRouter();

  if (!collection) return null;
  const { description, representative_image, title } = collection;

  // TODO: Temp bg image placeholder
  const collectionBgImage =
    representative_image && Object.keys(representative_image).length > 0
      ? representative_image
      : "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/3dff9186-99a8-4836-9a08-9e1db0fede05/full/1000,1000/0/default.jpg";

  const handleSearchClick = () => {
    searchDispatch({
      type: "updateUserFacets",
      userFacets: {
        collection: [title],
      },
    });
    router.push("/search");
  };

  return (
    <Layout>
      <Container containerType="wide">
        <HeroStyled>
          <HeroContentWrapper>
            <HeroContent>
              <h1>{title}</h1>
              <ItemsLabel>2336 Items</ItemsLabel>
              <p>{description}</p>
              <div>
                <Button isPrimary onClick={handleSearchClick}>
                  Search Collection
                </Button>
                <Button>Browse Collection</Button>
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
        <CulturalContextStyled>
          <p>
            Content on this site is drawn from a historical source which
            includes materials that may contain offensive images or language
            reflecting the nature of Settler Colonialism in America. Such
            materials should be viewed in the context of the time and place in
            which they were created. The images and text in this site are
            presented as specific, original artifacts recording the attitudes,
            perspectives and beliefs of a different era. Northwestern University
            does not endorse the views expressed in this collection which may
            contain images and text offensive to some researchers.
          </p>
        </CulturalContextStyled>
        <Tabs defaultValue="metadata">
          <TabsList aria-label="Explore">
            <TabsTrigger value="explore">
              <NavTabTitle>Explore</NavTabTitle>
            </TabsTrigger>
            <TabsTrigger value="metadata">
              <NavTabTitle>Metadata</NavTabTitle>
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
      ? await getMetadataAggs(id as string, "subject.keyword")
      : null;

  return {
    props: {
      collection,
      metadata,
    },
  };
}

export default Collection;
