import Layout from "components/layout";
import { NextPage } from "next";
import { getData } from "lib/elasticsearch-api";
import { Post } from "lib/elasticsearch-api";
import Link from "next/link";
import styles from "styles/Works.module.css";

const WorksList: NextPage = ({ posts }) => {
  return (
    <Layout>
      <h1>Works List</h1>
      <p>This renders out a list of content fetched from an API</p>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/works/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default WorksList;

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const posts = await getData();

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: { posts },
  };
}
