import { BlockStyled } from "@/components/Shared/BlockStyled";
import Container from "@/components/Shared/Container";
import Head from "next/head";
import Heading from "@/components/Heading/Heading";
import Layout from "components/layout";
import { NextPage } from "next";
import { loadDefaultStructuredData } from "@/lib/json-ld";
import { useEffect } from "react";

const This403: NextPage = () => {
  const info403 =
    "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/cdf5571d-2c52-406f-baad-a8fb37750497/info.json";
  const image403 =
    "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/cdf5571d-2c52-406f-baad-a8fb37750497/full/600,/0/default.jpg";

  // add useEffect that makes axios head request for status code
  // if 403, then set state to true
  // if state is true, then render this page
  // if state is false, then render the page that was requested

  useEffect(() => {
    fetch(info403, {
      credentials: "omit",
      method: "GET",
    })
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error.response.status));
  }, []);

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
          <Heading as="h1">This Should 403</Heading>
          <BlockStyled>
            <a href={image403}>This should 403...</a>
            <img src={image403} />
          </BlockStyled>
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default This403;
