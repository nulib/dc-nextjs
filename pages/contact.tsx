import Container from "@/components/Shared/Container";
import Head from "next/head";
import Layout from "components/layout";
import { NextPage } from "next";
import { PlaceholderBlock } from "@/components/Shared/PlaceholderBlock.styled";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { loadDefaultStructuredData } from "@/lib/json-ld";

const ContactPage: NextPage = () => {
  return (
    <>
      {/* Google Structured Data via JSON-LD */}
      <Head>
        <script
          key="app-ld-json"
          id="app-ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(loadDefaultStructuredData(), null, "\t"),
          }}
        />
      </Head>
      <Layout>
        <Container>
          <PlaceholderBlock>Contact page</PlaceholderBlock>
        </Container>
      </Layout>
    </>
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
