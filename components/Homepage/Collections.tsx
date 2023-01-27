import Container from "@/components/Shared/Container";
import GridFeature from "@/components/Grid/Feature";
import { HomePageContext } from "@/context/home-context";
import { HomepageCollectionsStyled } from "@/components/Homepage/Collections.styled";
import SectionHeading from "@/components/Shared/SectionHeading";
import { useContext } from "react";

const HomepageCollections = () => {
  const { featuredCollections } = useContext(HomePageContext);

  return (
    <HomepageCollectionsStyled>
      <Container containerType="default">
        <SectionHeading
          headingText="Collections"
          linkHref="/collections"
          linkText="View Collections"
        />
        <GridFeature data={featuredCollections} />
      </Container>
    </HomepageCollectionsStyled>
  );
};

export default HomepageCollections;
