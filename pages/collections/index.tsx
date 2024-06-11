import { CollectionListShape, getCollections } from "@/lib/collection-helpers";
import React, { ChangeEvent, useEffect, useState } from "react";
import { StyledForm, StyledInput } from "@/components/Shared/Form.styled";

import CollectionItem from "@/components/Collection/Item/Item";
import Container from "@/components/Shared/Container";
import { HEAD_META } from "@/lib/constants/head-meta";
import Head from "next/head";
import Heading from "@/components/Heading/Heading";
import Layout from "components/layout";
import { NextPage } from "next";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import { SpinLoader } from "@/components/Shared/Loader.styled";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { loadDefaultStructuredData } from "@/lib/json-ld";

const CollectionList: NextPage = () => {
  const [collectionList, setCollectionList] = useState<CollectionListShape[]>(
    [],
  );
  const [filteredList, setFilteredList] = useState<CollectionListShape[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const list = await getCollections();
      setCollectionList(list);
      setFilteredList(list);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event?.target?.value.toLowerCase());
  };

  useEffect(() => {
    if (!collectionList) return;
    setFilteredList(
      collectionList.filter((collection) =>
        collection.title.toLowerCase().includes(search),
      ),
    );
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

      <Layout title={HEAD_META["COLLECTIONS"].title}>
        <Container>
          <Heading as="h1">All Collections</Heading>
          <StyledForm onSubmit={(e) => e.preventDefault()}>
            <StyledInput
              placeholder="Filter titles"
              onChange={handleFilterChange}
            />
          </StyledForm>

          {isLoading && (
            <SpinLoader css={{ marginLeft: "$gr4", marginTop: "$gr2" }} />
          )}
          {!isLoading && (
            <>
              {filteredList.length > 0 ? (
                filteredList.map((item) => (
                  <CollectionItem {...item} key={item.id} />
                ))
              ) : (
                <p>
                  No results found for <strong>{search}</strong>.
                </p>
              )}
            </>
          )}
        </Container>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "Collections page",
  });

  const openGraphData = {
    "og:title": HEAD_META["COLLECTIONS"].title,
    "og:url": `${PRODUCTION_URL}/collections`,
  };

  return {
    props: { dataLayer, openGraphData },
  };
}

export default CollectionList;
