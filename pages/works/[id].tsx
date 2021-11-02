import Layout from "components/layout";
import { NextPage } from "next";
import { getAllWorkIds, getWorkData } from "lib/elasticsearch-api";

const Work: NextPage = ({ workData }) => {
  return (
    <Layout>
      <h1>Dynamic page</h1>
      <h2>{workData.title}</h2>
      <p>Id: {workData.id}</p>
      <p>{workData.body}</p>
    </Layout>
  );
};

export default Work;

/**
 * Grab individual dynamic page content
 */
export async function getStaticProps({ params }) {
  const workData = await getWorkData(params.id);
  return {
    props: {
      workData,
    },
  };
}

/**
 * This function is what creates all the dynamic pages when NextJS builds
 */
export async function getStaticPaths() {
  const paths = await getAllWorkIds();
  return {
    paths,
    fallback: false,
  };
}
