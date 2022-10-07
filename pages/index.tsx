import Layout from "@/components/layout";
import Overview from "@/components/Home/Overview";
import { PlaceholderBlock } from "@/components/Shared/PlaceholderBlock.styled";
import Script from "next/script";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { loadDefaultStructuredData } from "@/lib/json-ld";

const HomePage: React.FC = () => {
  return (
    <>
      <Script
        id="app-ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(loadDefaultStructuredData(), null, "\t"),
        }}
      />
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

  return {
    props: { dataLayer },
  };
}

export default HomePage;
