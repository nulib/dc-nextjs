import Container from "@/components/Shared/Container";
import GridFeature from "@/components/Grid/Feature";
import { HomepageCollectionsStyled } from "@/components/Homepage/Collections.styled";
import SectionHeading from "@/components/Shared/SectionHeading";
import { collectionData } from "@/lib/constants/homepage";
import { shuffle } from "@/lib/utils/array-helpers";

const HomepageCollections = () => {
  const data = shuffle(collectionData);

  return (
    <HomepageCollectionsStyled>
      <Container containerType="default">
        <SectionHeading
          headingText="Collections"
          linkHref="/collections"
          linkText="View Collections"
        />
        <GridFeature data={data} />
      </Container>
    </HomepageCollectionsStyled>
  );
};

export default HomepageCollections;
