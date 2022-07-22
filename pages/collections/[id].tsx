import {
  CulturalContextStyled,
  HeroContent,
  HeroImageStyled,
  HeroStyled,
  HeroStyledWrapper,
  ItemsLabel,
} from "@/components/Collection/Collection.styled";
import { Button } from "@nulib/design-system";
import CollectionNavTabs from "@/components/Collection/NavTabs";
import Container from "@/components/Shared/Container";
import Layout from "components/layout";
import { NextPage } from "next";
import RelatedItems from "@/components/Shared/RelatedItems";
import { getRelatedCollections } from "@/lib/iiif/collection-helpers";
import { sampleWork2 } from "@/mocks/sample-work2";

const Collection: NextPage = () => {
  const stubRelated = getRelatedCollections(sampleWork2);

  return (
    <Layout>
      <HeroStyledWrapper>
        <Container>
          <HeroStyled>
            <HeroContent>
              <h1>Edward S. Curtis&apos;s The North American Indian</h1>
              <ItemsLabel>2336 Items</ItemsLabel>
              <p>
                Edward Sheriff Curtis published The North American Indian
                between 1907 and 1930 with the intent to record traditional
                Native American cultures. The work comprises twenty volumes of
                narrative text and photogravure images. Each volume is
                accompanied by a portfolio of large photogravure plates. Search
                tip: shortcut to a list of just the text volumes by searching
                “illustrated books” in the search bar.
              </p>
              <div>
                <Button isPrimary>Search Collection</Button>
                <Button>Browse Collection</Button>
              </div>
            </HeroContent>
            <HeroImageStyled
              css={{
                backgroundImage:
                  "url(https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/fbe23ed6-8f11-4065-9dca-7d8381f0b161/full/!1000,1000/0/default.jpg)",
              }}
            />
          </HeroStyled>
        </Container>
      </HeroStyledWrapper>
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
        <CollectionNavTabs />
        <RelatedItems collections={stubRelated} title="Stub Related Content" />
      </Container>
    </Layout>
  );
};

export default Collection;
