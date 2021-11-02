import type { NextPage } from "next";
import Layout from "components/layout";
import { getData, makeIIIFEndpoint } from "lib/art-institute-api";
import styles from "styles/StaticPage.module.css";
import Link from "next/link";

interface Item {
  id: string;
  title: string;
  image_id: string;
}

interface MyProps {
  items: Array<Item>;
}

const StaticPage: NextPage<MyProps> = ({ items }) => {
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
      <code>https://api.artic.edu/api/v1/artworks</code>
      <ul className={styles.grid}>
        {items.map((item: Item) => (
          <li key={item.id}>
            <Link href={`/works/${item.id}`}>
              <a>
                <img src={makeIIIFEndpoint(item.image_id)} alt="an image" />
                <p>{item.title}</p>
                <p>{item.image_id}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const items = await getData();

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: { items },
  };
}

export default StaticPage;
