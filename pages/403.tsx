import Head from "next/head";
import Hero from "@/components/Hero/Hero";
import Layout from "@/components/layout";
import type { NextPage } from "next";
import { collection403 } from "@/lib/constants/error";
import { loadDefaultStructuredData } from "@/lib/json-ld";
import { styled } from "@/stitches.config";

const StyledAccessForbidden = styled("div", {
  minHeight: "60vh",
  position: "relative",
});

const AccessForbidden: NextPage = () => {
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
        <StyledAccessForbidden>
          <Hero collection={collection403} />
        </StyledAccessForbidden>
      </Layout>
    </>
  );
};

export default AccessForbidden;
