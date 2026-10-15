import styles from "@/pages/403.module.css";
import Head from "next/head";
import Hero from "@/components/Hero/Hero";
import Layout from "@/components/layout";
import type { NextPage } from "next";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { collection403 } from "@/lib/constants/error";
import { loadDefaultStructuredData } from "@/lib/json-ld";
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
        <div className={styles.styledAccessForbidden}>
          <Hero collection={collection403} />
        </div>
      </Layout>
    </>
  );
};
export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "403 page",
  });
  return {
    props: { dataLayer },
  };
}
export default AccessForbidden;
