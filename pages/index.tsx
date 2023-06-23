import Container from "@/components/Shared/Container";
import Heading from "@/components/Heading/Heading";
import SearchPrototype from "@/components/SearchPrototype/SearchPrototype";
import { styled } from "@/stitches.config";

const HomePage: React.FC = () => {
  return (
    <StyledHomePage>
      <Container>
        <Heading as="h1">Vector Search Prototype</Heading>
        <SearchPrototype />
      </Container>
    </StyledHomePage>
  );
};

const StyledHomePage = styled("div", {
  color: "$black80",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr4",

  h1: {
    marginBottom: "$gr5 !important",
  },
});

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default HomePage;
