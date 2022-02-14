import Layout from "components/layout";
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAllCollectionIds, getCollectionData } from "lib/elasticsearch-api";
import { Collection } from "types/index";
import { useEffect, useState } from "react";

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
  const data = await getCollectionData(id);
  return { props: { data } };
};

interface CollectionProps {
  data: Collection;
}

const Collection: NextPage<CollectionProps> = ({ data }) => {
  const [mockData, setMockData] = useState();

  const { description, id, published, representativeImage, title, visibility } =
    data;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) => setMockData(json));
  }, []);

  return (
    <Layout>
      <pre>Data pulled in at build time</pre>
      <h1>{data.title}</h1>
      <p>{description}</p>
      <p>Published? {published ? "YES" : "NO"}</p>
      <p>Visibility: {visibility.label}</p>

      <hr />
      <pre>Data pulled in client side </pre>
      {mockData && (
        <ul>
          <li>Id: {mockData.id}</li>
          <li>Title: {mockData.title}</li>
          <li>Body: {mockData.body}</li>
        </ul>
      )}
    </Layout>
  );
};

export default Collection;
