import {
  HomepageCollections as Collections,
  HomepageHero as Hero,
  HomepageOverview as Overview,
  HomepageWorks as Works,
} from "@/components/Homepage";

import Head from "next/head";
import { HomeContextProvider } from "@/context/home-context";
import Layout from "@/components/layout";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { loadDefaultStructuredData } from "@/lib/json-ld";

const HomePage: React.FC = () => {
  return (
    <>
      <HomeContextProvider>
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
          <Hero />
          <Overview />
          <Collections />
          <Works />
        </Layout>
      </HomeContextProvider>
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
