import Head from "next/head";
import Hero from "@/components/Hero/Hero";
import Layout from "@/components/layout";
import type { NextPage } from "next";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { collection404 } from "@/lib/constants/error";
import { loadDefaultStructuredData } from "@/lib/json-ld";
import { styled } from "@/stitches.config";

const StyledPageNotFound = styled("div", {
  minHeight: "60vh",
  position: "relative",
});

const PageNotFound: NextPage = () => {
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
      <Layout header="hero">
        <StyledPageNotFound>
          <Hero collection={collection404} />
        </StyledPageNotFound>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "404 page",
  });

  return {
    props: { dataLayer },
  };
}

export default PageNotFound;
