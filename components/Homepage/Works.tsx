import Container from "@/components/Shared/Container";
import Grid from "@/components/Grid/Grid";
import { HomepageWorksStyled } from "./Works.styled";
import SectionHeading from "../Shared/SectionHeading";
import { worksData } from "@/lib/constants/homepage";

const HomepageWorks = () => {
  return (
    <HomepageWorksStyled>
      <Container containerType="default">
        <SectionHeading
          headingText="Works"
          linkHref="/search"
          linkText="Explore Further"
        />
      </Container>
      <Container containerType="wide">
        <Grid data={worksData} info={{}} />
      </Container>
    </HomepageWorksStyled>
  );
};

export default HomepageWorks;
