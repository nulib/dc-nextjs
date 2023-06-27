import Container from "@/components/Shared/Container";
import Heading from "@/components/Heading/Heading";
import SearchPrototype from "@/components/SearchPrototype";
import { styled } from "@/stitches.config";

const HomePage: React.FC = () => {
  return (
    <StyledHomePage>
      <Container>
        <Heading as="h1">Chat Search Prototype</Heading>
        <SearchPrototypeWrapper>
          <SearchPrototype />
        </SearchPrototypeWrapper>
      </Container>
    </StyledHomePage>
  );
};

/* eslint sort-keys: 0 */

const StyledHomePage = styled("div", {
  color: "$black80",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr3",

  h1: {
    marginBottom: "$gr5 !important",

    "&::before": {
      backgroundColor: "$brightBlueB !important",
    },
  },
});

const SearchPrototypeWrapper = styled("div", {
  margin: "$gr4 -$gr4",
  padding: "$gr4",
});

export default HomePage;
