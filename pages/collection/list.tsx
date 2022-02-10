import React from "react";
import Layout from "components/layout";
import { getAllCollections } from "lib/elasticsearch-api";
import { Collection } from "types";

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

const CollectionList: React.FC<CollectionListProps> = ({ collections }) => {
  return (
    <Layout>
      <h1>Collection List</h1>
      <p>This example is pulling Meadow data from our ESProxy at build time</p>
      <p>Num results: {collections.length}</p>
      <ul>
        {collections.map((collection: Collection) => (
          <li key={collection.id}>{collection.title}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default CollectionList;
