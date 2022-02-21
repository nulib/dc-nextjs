import React from "react";
import Layout from "components/Layout";

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/api/collection");
  const json = await response.json();

  return {
    props: { data: json },
  };
}

interface CollectionListProps {
  data: CollectionData;
}
interface CollectionData {
  name: string;
}

const CollectionList: React.FC<CollectionListProps> = ({ data }) => {
  return (
    <Layout>
      <h1>Local API</h1>
      <p>
        This example calls a local REST API route located in the /api directory.
      </p>
      <p>
        One use case could be if this app was running in the same environment as
        our ElasticSearch index, we might be able to bypass ESProxy and pull in
        ElasticSearch JavaScript client here.
      </p>
      <h2>API Response: </h2>
      <p>{data.name}</p>
    </Layout>
  );
};

export default CollectionList;
