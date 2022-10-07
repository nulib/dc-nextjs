import Container from "@/components/Shared/Container";
import Layout from "components/layout";
import { NextPage } from "next";
import { PlaceholderBlock } from "@/components/Shared/PlaceholderBlock.styled";
import { buildDataLayer } from "@/lib/ga/data-layer";

const ContactPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <PlaceholderBlock>Contact page</PlaceholderBlock>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "Contact page",
  });

  return {
    props: { dataLayer },
  };
}

export default ContactPage;
