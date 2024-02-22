import { HeroTitle, Subhead } from "@/components/Hero/Basic.styled";
import SectionTop, {
  SectionSubhead,
  SectionTitle,
} from "@/components/Shared/SectionTop/SectionTop";

import AboutCollectionGrid from "@/components/About/CollectionGrid";
import { BlockStyled } from "@/components/Shared/BlockStyled";
import Container from "@/components/Shared/Container";
import { HEAD_META } from "@/lib/constants/head-meta";
import Head from "next/head";
import Heading from "components/Heading/Heading";
import HeroBasic from "@/components/Hero/Basic";
import Layout from "@/components/layout";
import { LinkStyled } from "@/components/Shared/LinkStyled";
import { NextPage } from "next";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import { PhotoFeatureProps } from "@/components/Shared/PhotoFeature/PhotoFeature";
import { UnorderedListStyled } from "@/components/Shared/UnorderedList";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { loadDefaultStructuredData } from "@/lib/json-ld";

const baseUrl = "https://iiif.stack.rdc.library.northwestern.edu/iiif/2";

const featuredCollections: PhotoFeatureProps[] = [
  {
    callToAction: "View Collection",
    href: "https://dc.library.northwestern.edu/collections/55ff2504-dd53-4943-b2cb-aeea46e77bc3",
    imgAlt: "",
    imgSrc: `${baseUrl}/1633c547-5ad2-4e5c-b01a-0801eb728fe4/full/600,/0/default.jpg`,
    shortDescription: "",
    title: "Edward S. Curtis's The North American Indian",
  },
  {
    callToAction: "View Collection",
    href: "https://dc.library.northwestern.edu/collections/ecacd539-fe38-40ec-bbc0-590acee3d4f2",
    imgAlt: "",
    imgSrc: `${baseUrl}/bcddd594-2e64-4511-be6c-99f9423c163a/full/1000,/0/default.jpg`,
    shortDescription: "",
    title: "Africa Embracing Obama",
  },
  {
    callToAction: "View Collection",
    href: "https://dc.library.northwestern.edu/collections/c2a8a3e0-af0f-4e04-8721-91698fc14574",
    imgAlt: "",
    imgSrc: `${baseUrl}/27ece596-0a71-44cb-8951-3d8205d23535/square/600,/0/default.jpg`,
    shortDescription:
      "Images documenting the 1968 takeover of the Northwestern University Bursar's office.",
    title: "Records of the Bursar’s Office Takeover, May 1968",
  },
  {
    callToAction: "View Collection",
    href: "https://dc.library.northwestern.edu/collections/4ed2338d-c715-4a86-8ac6-6b4030a42be5",
    imgAlt: "",
    imgSrc: `${baseUrl}/fe0d93f2-db15-4136-ac2d-820fa4ea4f87/full/720,350/0/default.jpg`,
    shortDescription: "Posters depicting the social history of Iranian cinema.",
    title: "Hamid Naficy Iranian Movie Posters Collection",
  },
  {
    callToAction: "View Collection",
    href: "https://dc.library.northwestern.edu/collections/faf4f60e-78e0-4fbf-96ce-4ca8b4df597a",
    imgAlt: "",
    imgSrc: `${baseUrl}/1eb99e98-c1ca-4c1c-938b-a497f5ad76d0/full/600,/0/default.jpg`,
    shortDescription: "US Government posters from WWII.",
    title: "World War II Poster Collection at Northwestern University Library",
  },
  {
    callToAction: "View Collection",
    href: "https://dc.library.northwestern.edu/collections/1d849df1-eb32-43f4-b7b9-e435cff18f7c",
    imgAlt: "",
    imgSrc: `${baseUrl}/24982246-7401-43ce-8788-fbfcb93ce81b/full/600,/0/default.jpg`,
    shortDescription:
      "Photographs representing colonialism in East Africa over the span of 100 years.",
    title: "Vernon McKay Photographs",
  },

  {
    callToAction: "View Collection",
    href: "https://dc.library.northwestern.edu/collections/ba35820a-525a-4cfa-8f23-4891c9f798c4",
    imgAlt: "",
    imgSrc: `${baseUrl}/5f72738c-f3b1-471a-9259-8df09f72f1ad/full/600,/0/default.jpg`,
    shortDescription: "Late sketches from modernist artist Ramón Casas.",
    title: "Ramón Casas sketchbooks",
  },
  {
    callToAction: "View Collection",
    href: "https://dc.library.northwestern.edu/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7",
    imgAlt: "",
    imgSrc: `${baseUrl}/8b0b9666-4278-42eb-b08e-314078ce2253/full/600,/0/default.jpg`,
    shortDescription: "",
    title: "Berkeley Folk Music Festival",
  },
];

const AboutPage: NextPage = () => {
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
        title={HEAD_META["ABOUT"].title}
        description={HEAD_META["ABOUT"].description}
      >
        <HeroBasic bgImage="/images/liz__O8A9903_final.jpg">
          <HeroTitle>Repository and Digital Curation</HeroTitle>
          <Subhead>Digitizing Our Distinctive Collections</Subhead>
        </HeroBasic>

        <SectionTop>
          <SectionTitle>Collection Highlights</SectionTitle>
          <SectionSubhead>
            Our collections are comprised of a range of media covering many
            topics
          </SectionSubhead>

          <p>
            Digital Collections contains thousands of items from Northwestern
            University Libraries. While only a fraction of materials from the
            Libraries&apos; collections are represented, the site is
            representative of the distinction and diversity of collections from
            the{" "}
            <LinkStyled
              href="https://www.library.northwestern.edu/libraries-collections/government-collection/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Northwestern Government and Geographic Information collection
            </LinkStyled>
            ,{" "}
            <LinkStyled
              href="https://www.library.northwestern.edu/libraries-collections/herskovits-library/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Herskovits Library of African Studies
            </LinkStyled>
            ,{" "}
            <LinkStyled
              href="https://www.library.northwestern.edu/libraries-collections/music/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Music Library
            </LinkStyled>
            ,{" "}
            <LinkStyled
              href="https://www.library.northwestern.edu/libraries-collections/special-collections/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              McCormick Library of Special Collections
            </LinkStyled>
            ,{" "}
            <LinkStyled
              href="https://www.library.northwestern.edu/libraries-collections/transportation/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Transportation Library
            </LinkStyled>
            , and{" "}
            <LinkStyled
              href="https://www.library.northwestern.edu/libraries-collections/university-archives/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              University Archives
            </LinkStyled>
            . Highlights include:
          </p>
        </SectionTop>

        <BlockStyled as="section">
          <Container maxWidth={1440}>
            <AboutCollectionGrid items={featuredCollections} />
          </Container>
        </BlockStyled>

        <Container>
          <BlockStyled as="section">
            <Heading as="h2">Using the collections</Heading>
            <article data-testid="rights-statement-article">
              <Heading as="h3">Rights Statement</Heading>
              <p data-testid="rights-statement-text">
                We offer support to the Northwestern community on copyright and
                fair use in scholarly research, publishing, teaching and other
                areas. Our Copyright Librarian is available to answer questions
                regarding clearing permissions for publications, making public
                domain determinations, copyright registration, publication
                agreements, and more.
              </p>
              <p>
                For more information, visit{" "}
                <LinkStyled
                  href="https://www.library.northwestern.edu/research/scholarly/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Scholarly Research Services
                </LinkStyled>
                .
              </p>
            </article>
            <article data-testid="IIIF-article">
              <Heading as="h3">
                International Image Interoperability Framework (IIIF)
              </Heading>
              <p data-testid="IIIF-text">
                We currently make all content metadata and images available as{" "}
                <LinkStyled
                  href="https://iiif.io/api/presentation/2.1/#manifest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IIIF manifests
                </LinkStyled>{" "}
                backed by LinkStyled IIIF compliant image server. This allows
                researchers to see detailed, zoomable images on this site as
                well as use the content in outside tools such as{" "}
                <LinkStyled
                  href="http://projectmirador.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mirador
                </LinkStyled>
                , embed on third-party websites, and programmatically query the
                data.
              </p>
              <p>
                More information about IIIF and related projects is available on
                on the{" "}
                <LinkStyled
                  href="https://iiif.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IIIF website
                </LinkStyled>
                .
              </p>
            </article>
          </BlockStyled>

          <BlockStyled as="section" data-testid="api-section">
            <Heading as="h2" css={{ marginBottom: "0 !important" }}>
              Digital Collections API and Collections as Data
            </Heading>
            <p>
              Northwestern University Libraries supports the use of our
              collections as data to further research. We offer a full-featured
              API for accessing our collection data in your own applications and
              workflows. The{" "}
              <LinkStyled
                href="https://api.dc.library.northwestern.edu/docs/v2/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Digital Collections API
              </LinkStyled>{" "}
              allows users to search, aggregate, and use data from Northwestern
              Collections in a simple RESTful inteface. All results can be
              returned as generic JSON data or IIIF-compliant manifests and
              collections. Code examples and more information are available on
              the{" "}
              <LinkStyled
                href="https://api.dc.library.northwestern.edu/docs/v2/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Digital Collections API page
              </LinkStyled>
              .
            </p>

            <p>
              In addition to the full-featured API, we publish a{" "}
              <LinkStyled
                href="https://github.com/nulib/nuldc"
                target="_blank"
                rel="noopener noreferrer"
              >
                command-line interface (CLI) application
              </LinkStyled>{" "}
              with built-in features for querying, aggregating, and accessing
              works. The nuldc cli application allows users to return any
              results available in Digital Collections via the terminal for
              further processing.
            </p>

            <p>
              For researchers looking to work with the full, public dataset, we
              offer static downloads in csv, json, and xml format. The dataset
              is{" "}
              <LinkStyled
                href="https://github.com/nulib/nuldc-metadata"
                target="_blank"
                rel="noopener noreferrer"
              >
                published on Github
              </LinkStyled>
              . Using this dataset is a simple way to browse and analyze the
              data without having to collect the information yourself. The
              dataset is updated weekly.
            </p>

            <p>Let us know what you build!</p>
          </BlockStyled>

          <BlockStyled as="section" data-testid="platform-section">
            <Heading as="h2" css={{ marginBottom: "0 !important" }}>
              Platform
            </Heading>
            <p>
              The Digital Collection platform is open source and standards
              based. Hosted on AWS infrastructure, it uses an array of
              serverless tooling and acts as a showcase of{" "}
              <LinkStyled
                href="https://samvera.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Samvera
              </LinkStyled>{" "}
              and{" "}
              <LinkStyled
                href="https://iiif.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                IIIF
              </LinkStyled>{" "}
              concepts and technologies. The preservation-first backend Meadow
              is built using Elixir and Node.js and makes extensive use of
              serverless tools for processing and preservation. The Digital
              Collections frontend and associated API are built using
              Javascript, React, Next.JS, Radix UI, and Stitches. It leverages
              the IIIF standard for display of metadata and digital assets and
              Opensearch as the basis of its API. Core Samvera and IIIF
              community components and experimental projects were envisioned as
              part of and are used by Digital Collections, Meadow, and our
              processing pipeline.
            </p>
            <Heading as="h3">Components and Projects</Heading>
            <UnorderedListStyled>
              <li>
                <LinkStyled
                  href="https://github.com/nulib/dc-nextjs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Digital Collections
                </LinkStyled>
              </li>

              <li>
                <LinkStyled
                  href="https://github.com/nulib/meadow/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meadow
                </LinkStyled>
              </li>

              <li>
                <LinkStyled
                  href="https://github.com/nulib/authoritex"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Authoritex
                </LinkStyled>
              </li>

              <li>
                <LinkStyled
                  href="https://github.com/nulib/dc-api-v2/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DC API
                </LinkStyled>
              </li>

              <li>
                <LinkStyled
                  href="https://github.com/samvera/serverless-iiif"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Serverless IIIF
                </LinkStyled>
              </li>

              <li>
                <LinkStyled
                  href="https://github.com/samvera-labs/clover-iiif"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Clover IIIF
                </LinkStyled>
              </li>

              <li>
                <LinkStyled
                  href="https://github.com/samvera-labs/bloom-iiif"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bloom IIIF
                </LinkStyled>
              </li>

              <li>
                <LinkStyled
                  href="https://github.com/samvera-labs/nectar-iiif"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nectar IIIF
                </LinkStyled>
              </li>
            </UnorderedListStyled>
          </BlockStyled>
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "About page",
  });

  const openGraphData = {
    "og:title": HEAD_META["ABOUT"].title,
    "og:url": `${PRODUCTION_URL}/about`,
  };

  return {
    props: { dataLayer, openGraphData },
  };
}

export default AboutPage;
