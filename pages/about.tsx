import Container from "@/components/Shared/Container";
import Layout from "components/layout";
import { NextPage } from "next";
import { PlaceholderBlock } from "@/components/Shared/PlaceholderBlock.styled";
import { buildDataLayer } from "@/lib/ga/data-layer";

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <PlaceholderBlock>About page</PlaceholderBlock>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "About page",
  });

  return {
    props: { dataLayer },
  };
}

export default AboutPage;
