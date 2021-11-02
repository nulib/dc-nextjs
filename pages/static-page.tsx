import type { NextPage } from "next";
import Layout from "components/layout";
import { getData } from "lib/elasticsearch-api";
import styles from "styles/StaticPage.module.css";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface MyProps {
  Posts: Array<Post>;
}

const StaticPage: NextPage<MyProps> = ({ posts }) => {
  return (
    <Layout>
      <h1>I am a static page</h1>
      <p>
        We recommend using Static Generation (with and without data) whenever
        possible because your page can be built once and served by CDN, which
        makes it much faster than having a server render the page on every
        request.
      </p>

      <p>You can use Static Generation for many types of pages, including:</p>

      <ul>
        <li>Marketing pages</li>
        <li>Blog posts</li>
        <li>E-commerce product listings</li>
        <li>Help and documentation</li>
      </ul>

      <p>
        You should ask yourself: "Can I pre-render this page ahead of a
        user&apos s request?" If the answer is yes, then you should choose
        Static Generation.
      </p>

      <p>
        On the other hand, Static Generation is not a good idea if you cannot
        pre-render a page ahead of a user&apos s request. Maybe your page shows
        frequently updated data, and the page content changes on every request.
      </p>

      <h2>Here's some data I fetched</h2>
      <code>https://jsonplaceholder.typicode.com/posts</code>
      <ul className={styles.grid}>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <p>{post.title}</p>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const posts = await getData();

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: { posts },
  };
}

export default StaticPage;
