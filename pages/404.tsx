import Head from "next/head";
import Hero from "@/components/Hero/Hero";
import Layout from "@/components/layout";
import type { NextPage } from "next";
import { loadDefaultStructuredData } from "@/lib/json-ld";
import { pageNotFoundCollection } from "@/lib/constants/404";
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
          <Hero collection={pageNotFoundCollection} />
        </StyledPageNotFound>
      </Layout>
    </>
  );
};

export default PageNotFound;