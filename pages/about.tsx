import Container from "@/components/Shared/Container";
import Head from "next/head";
import Layout from "components/layout";
import { NextPage } from "next";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import { PlaceholderBlock } from "@/components/Shared/PlaceholderBlock.styled";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { loadDefaultStructuredData } from "@/lib/json-ld";

const AboutPage: NextPage = () => {
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
          <PlaceholderBlock>About page</PlaceholderBlock>
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "About page",
  });

  const openGraphData = {
    "og:url": `${PRODUCTION_URL}/about`,
  };

  return {
    props: { dataLayer, openGraphData },
  };
}

export default AboutPage;
