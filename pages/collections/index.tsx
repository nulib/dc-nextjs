import Container from "@/components/Shared/Container";
import Layout from "components/layout";
import { NextPage } from "next";
import Script from "next/script";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { loadDefaultStructuredData } from "@/lib/json-ld";

const CollectionList: NextPage = () => {
  return (
    <>
      <Script
        id="app-ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(loadDefaultStructuredData(), null, "\t"),
        }}
      />
      <Layout>
        <Container>Placeholder homepage for Collections</Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "Collections page",
  });

  return {
    props: { dataLayer },
  };
}

export default CollectionList;
