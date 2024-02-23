import { BlockStyled } from "@/components/Shared/BlockStyled";
import Container from "@/components/Shared/Container";
import CopyText from "@/components/Shared/CopyText";
import { HEAD_META } from "@/lib/constants/head-meta";
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
      <Layout
        title={HEAD_META["CONTACT"].title}
        description={HEAD_META["CONTACT"].description}
      >
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
              can be directed to:{" "}
              <CopyText
                textPrompt="repository@northwestern.edu"
                textToCopy="repository@northwestern.edu"
              />
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
    "og:title": HEAD_META["CONTACT"].title,
    "og:url": `${PRODUCTION_URL}/contact`,
  };

  return {
    props: { dataLayer, openGraphData },
  };
}

export default ContactPage;
