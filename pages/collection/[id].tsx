import Layout from "components/layout";
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  getAllCollectionIds,
  getCollectionData,
  getCollectionItems,
} from "lib/elasticsearch-api";
import { Collection } from "types/index";
import { useEffect, useState } from "react";
import Container from "components/Container";
import Link from "next/link";

// Gets called at build time
export async function getStaticPaths() {
  const ids = await getAllCollectionIds();

  // Per the NextJS API of how to build up static paths
  const paths = ids.map((id) => ({
    params: {
      id: id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

// Gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const collection = await getCollectionData(id);
  const collectionItems = await getCollectionItems(id, 5000);

  return { props: { collection, items: collectionItems } };
};

interface CollectionProps {
  collection: Collection;
  items: Array<any>;
}

const Collection: NextPage<CollectionProps> = ({ collection, items }) => {
  const { description, id, published, representativeImage, title, visibility } =
    collection;

  return (
    <Layout>
      <Container>
        <pre>Data pulled in at build time</pre>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>Published? {published ? "YES" : "NO"}</p>
        <p>Visibility: {visibility.label}</p>
        <hr />
        <h2>Collection items</h2>
        <ul>
          {items.map(({ id, descriptiveMetadata }) => (
            <li key={id}>
              <Link href={`/works/${id}`}>{descriptiveMetadata.title}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
};

export default Collection;
