import styles from "@/components/Homepage/Collections.module.css";
import Container from "@/components/Shared/Container";
import GridFeature from "@/components/Grid/Feature";
import { HomePageContext } from "@/context/home-context";
import SectionHeading from "@/components/Shared/SectionHeading";
import { useContext } from "react";
const HomepageCollections = () => {
  const { featuredCollections } = useContext(HomePageContext);
  return (
    <section className={styles.homepageCollectionsStyled}>
      <Container containerType="default">
        <SectionHeading
          headingText="Collections"
          linkHref="/collections"
          linkText="View Collections"
        />
        <GridFeature data={featuredCollections} />
      </Container>
    </section>
  );
};
export default HomepageCollections;
