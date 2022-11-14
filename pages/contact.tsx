import { BlockStyled } from "@/components/Shared/BlockStyled";
import Container from "@/components/Shared/Container";
import Head from "next/head";
import Heading from "@/components/Heading/Heading";
import Layout from "components/layout";
import { NextPage } from "next";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { loadDefaultStructuredData } from "@/lib/json-ld";

const ContactPage: NextPage = () => {
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
          <Heading as="h1">Contact</Heading>
          <BlockStyled>
            <p>
              Northwestern University Libraries&apos; Repository and Digital
              Curation department is located in the main library on our Evanston
              campus. The department is responsible for digitization of library
              collections, describing content, and creating the software that
              runs this website.
            </p>

            <p>
              Questions about digitization, description of items, or software
              can be directed here.{" "}
              <a
                href="mailto:repository@northwestern.edu"
                style={{
                  unicodeBidi: "bidi-override",
                }}
              >
                repository@northwestern.edu
              </a>
            </p>

            <p>
              The content on the site comes from multiple library collections,
              departments and units. Please visit{" "}
              <a
                href="https://www.library.northwestern.edu/research/research-support/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Research Support
              </a>{" "}
              to find the contact information for the library department that
              can best offer research assistance.
            </p>
          </BlockStyled>
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "Contact page",
  });

  const openGraphData = {
    "og:url": `${PRODUCTION_URL}/contact`,
  };

  return {
    props: { dataLayer, openGraphData },
  };
}

export default ContactPage;
