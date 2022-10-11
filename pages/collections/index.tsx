import React, { ChangeEvent, useEffect, useState } from "react";
import { StyledForm, StyledInput } from "@/components/Shared/Form.styled";
import CollectionItem from "@/components/Collection/Item/Item";
import { CollectionShape } from "@/types/components/collections";
import Container from "@/components/Shared/Container";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Head from "next/head";
import Heading from "@/components/Heading/Heading";
import Layout from "components/layout";
import { NextPage } from "next";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { getCollectionList } from "@/lib/collection-helpers";
import { loadDefaultStructuredData } from "@/lib/json-ld";

interface CollectionListProps {
  collections: CollectionShape[];
}

const CollectionList: NextPage<CollectionListProps> = ({ collections }) => {
  const [items, setItems] = useState<CollectionShape[]>([]);
  const [search, setSearch] = useState("");

  const handleSearch = (input: ChangeEvent<HTMLInputElement>) => {
    setSearch(input?.target?.value.toLowerCase());
  };

  useEffect(() => {
    const filtered = collections.filter((item) =>
      item.title.toLowerCase().includes(search)
    );
    setItems(filtered);
  }, [collections, search]);

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
          <StyledForm>
            <StyledInput
              placeholder="Filter collections"
              onChange={handleSearch}
            />
          </StyledForm>
          {items.length > 0 ? (
            items.map((item) => <CollectionItem {...item} key={item.id} />)
          ) : (
            <span>
              No results found for <strong>{search}</strong>.
            </span>
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

  let response;
  let collections: CollectionShape[] = [];
  let next_url: string | undefined = `${DCAPI_ENDPOINT}/collections`;

  /**
   *  temporarily use while() to build full list until completed:
   *  https://github.com/nulib/repodev_planning_and_docs/issues/3214
   */
  while (next_url) {
    response = await getCollectionList(next_url);
    collections = collections.concat(response?.data as CollectionShape[]);
    next_url = response?.pagination.next_url;
  }

  return {
    props: { collections, dataLayer },
  };
}

export default CollectionList;
