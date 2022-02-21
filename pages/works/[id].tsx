import Layout from "components/Layout";
import { GetStaticProps, NextPage } from "next";
import {
  getAllWorkIds,
  getWorkData,
  makeIIIFEndpoint,
  Work,
} from "lib/art-institute-api";
import { ParsedUrlQuery } from "querystring";

interface WorkProps {
  workData: Work;
}

const Work: NextPage<WorkProps> = ({ workData: { id, image_id, title } }) => {
  return (
    <Layout>
      <h2>I am a dynamic page which has been pre-rendered</h2>
      <img src={makeIIIFEndpoint(image_id)} />
      <h1>{title}</h1>
      <h2></h2>
      <p>Id: {id}</p>
    </Layout>
  );
};

export default Work;

/**
 * Grab individual dynamic page content from an external API.
 * This will never run on the client side, and won't be included with the JS bundle for the browser.
 */
interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const workData = await getWorkData(id);
  return {
    props: {
      workData,
    },
  };
};

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
