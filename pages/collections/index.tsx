import Container from "@/components/Shared/Container";
import Layout from "components/layout";
import { NextPage } from "next";
import { buildDataLayer } from "@/lib/ga/data-layer";

const CollectionList: NextPage = () => {
  return (
    <Layout>
      <Container>Placeholder homepage for Collections</Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "Collections page",
  });

  return {
    props: { dataLayer },
  };
}

export default CollectionList;
