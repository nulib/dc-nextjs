import { Collection } from "types";
import Container from "components/Container";
import Layout from "components/layout";
import Link from "next/link";
import { NextPage } from "next";
import React from "react";
import { getAllCollections } from "lib/elasticsearch-api";

export async function getStaticProps() {
  const response = await getAllCollections();

  return {
    props: {
      collections: response,
    },
  };
}

interface CollectionListProps {
  collections: Array<Collection>;
}

const CollectionList: NextPage<CollectionListProps> = ({ collections }) => {
  return (
    <Layout>
      <Container>
        <h1>Collection List</h1>
        <p>
          This example is pulling Meadow data from our ESProxy at build time
        </p>
        <p>Num results: {collections.length}</p>
        <ul>
          {collections.map((collection: Collection) => (
            <li key={collection.id}>
              <Link href={`/collection/${collection.id}`}>
                {collection.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
};

export default CollectionList;
