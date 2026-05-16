import GeoGuess from "@/components/GeoGuess/GeoGuess";
import Head from "next/head";
import Layout from "@/components/layout";
import { NextPage } from "next";
import { loadDefaultStructuredData } from "@/lib/json-ld";

const GeoGuessPage: NextPage = () => {
  const title = "GeoGuess DC";

  return (
    <>
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

      <Layout
        title={title}
        description="Help Northwestern Libraries identify geographic coordinates for images in Digital Collections."
      >
        <GeoGuess />
      </Layout>
    </>
  );
};

export default GeoGuessPage;
