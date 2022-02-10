import React from "react";
import Layout from "components/layout";

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/api/collection");
  const json = await response.json();

  return {
    props: { data: JSON.stringify(json) },
  };
}

interface CollectionListProps {
  data: CollectionData;
}
interface CollectionData {
  name: string;
}

const CollectionList: React.FC<CollectionListProps> = ({ data }) => {
  console.log("data", data);
  // React.useEffect(() => {
  //   async function fn() {
  //     const response = await fetch("http://localhost:3000/api/collection");
  //     const json = await response.json();
  //     console.log("json", json);
  //   }
  //   fn();
  // }, []);
  return (
    <Layout>
      <h1>Collection List</h1>
    </Layout>
  );
};

export default CollectionList;
