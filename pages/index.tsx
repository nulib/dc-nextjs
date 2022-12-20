import Head from "next/head";
import Layout from "@/components/layout";
import Overview from "@/components/Home/Overview";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import { PlaceholderBlock } from "@/components/Shared/PlaceholderBlock.styled";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { loadDefaultStructuredData } from "@/lib/json-ld";

const HomePage: React.FC = () => {
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
      <Layout header="hero">
        <Overview />
        <PlaceholderBlock css={{ height: "100vh" }} />
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "Homepage",
  });

  const openGraphData = {
    "og:url": PRODUCTION_URL,
  };

  return {
    props: { dataLayer, openGraphData },
  };
}

export default HomePage;
