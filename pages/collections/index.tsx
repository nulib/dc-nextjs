import { type Collection, type Visibility } from "dcapi-types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { StyledForm, StyledInput } from "@/components/Shared/Form.styled";
import CollectionItem from "@/components/Collection/Item/Item";
import { type CollectionRepresentativeImage } from "@/types/components/collections";
import Container from "@/components/Shared/Container";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Head from "next/head";
import Heading from "@/components/Heading/Heading";
import Layout from "components/layout";
import { NextPage } from "next";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import axios from "axios";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { getCollectionWorkCounts } from "@/lib/collection-helpers";
import { loadDefaultStructuredData } from "@/lib/json-ld";

export type CollectionListShape = {
  description?: string;
  id: string;
  representativeImage: CollectionRepresentativeImage;
  thumbnail?: string;
  title: string;
  totalWorks?: number;
  totalImage?: number;
  totalAudio?: number;
  totalVideo?: number;
  visibility: Visibility;
};
interface CollectionListProps {
  collectionList: CollectionListShape[];
}

const CollectionList: NextPage<CollectionListProps> = ({ collectionList }) => {
  const [items, setItems] = useState<CollectionListShape[]>([]);
  const [search, setSearch] = useState("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event?.target?.value.toLowerCase());
  };

  useEffect(() => {
    const filtered = collectionList.filter((item) =>
      item.title.toLowerCase().includes(search)
    );
    setItems(filtered);
  }, [collectionList, search]);

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
          <Heading as="h1">All Collections</Heading>
          <StyledForm onSubmit={(e) => e.preventDefault()}>
            <StyledInput
              placeholder="Filter collections"
              onChange={handleSearch}
            />
          </StyledForm>
          {items.length > 0 ? (
            items.map((item) => <CollectionItem {...item} key={item.id} />)
          ) : (
            <p>
              No results found for <strong>{search}</strong>.
            </p>
          )}
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "Collections page",
  });
  let collections: Collection[] = [];
  let collectionList: CollectionListShape[] = [];
  const defaultCountTotals = {
    totalAudio: 0,
    totalImage: 0,
    totalVideo: 0,
    totalWorks: 0,
  };

  try {
    /** Get all Collections */
    const response = await axios(
      `${DCAPI_ENDPOINT}/collections?size=100&sort=title:asc`
    );
    collections = response.data.data;

    /** Get Work counts (Image / Audio / Video) for each Collection */
    const workCountMap = await getCollectionWorkCounts();

    /** Stitch together only the Collection list info this page requires */
    collectionList = collections.map((collection) => {
      return {
        description: collection.description,
        id: collection.id,
        representativeImage: collection.representative_image,
        thumbnail: collection.thumbnail,
        title: collection.title,
        visibility: collection.visibility,
        ...(workCountMap && workCountMap[collection.id]
          ? { ...workCountMap[collection.id] }
          : { ...defaultCountTotals }),
      };
    });
  } catch (err) {
    console.error(err);
  }

  const openGraphData = {
    "og:url": `${PRODUCTION_URL}/collections`,
  };

  return {
    props: { collectionList, dataLayer, openGraphData },
  };
}

export default CollectionList;
