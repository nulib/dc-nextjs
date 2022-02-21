import type { NextPage } from "next";
import Layout from "components/Layout";
import { getData, makeIIIFEndpoint } from "lib/art-institute-api";
import styles from "styles/StaticPage.module.css";
import Link from "next/link";
import FilterWorks from "components/FilterWorks";
import Input from "components/Input";
import Sticky from "react-sticky-el";
import { styled } from "@stitches/react";

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
      <Header>
        <div style={{ marginBottom: "1rem" }}>
          <Tabs>
            <li>Works</li>
            <li>Collections</li>
            <li>Exhibits</li>
          </Tabs>
          <span>All Results</span>
        </div>
        <Sticky className="sticky-filters">
          <Filters>
            <Input />
            <div className="sticky-tray">
              <FilterWorks />
              <OfInterest>
                <label>Of Interest</label>
                <nav>
                  <a>
                    <figure>
                      <span></span>
                      <figcaption>Africa</figcaption>
                    </figure>
                  </a>
                  <a>
                    <figure>
                      <span></span>
                      <figcaption>Baez, Joan</figcaption>
                    </figure>
                  </a>
                  <a>
                    <figure>
                      <span></span>
                      <figcaption>Historical Maps</figcaption>
                    </figure>
                  </a>
                  <a>
                    <figure>
                      <span></span>
                      <figcaption>Nez Percé</figcaption>
                    </figure>
                  </a>
                  <a>
                    <figure>
                      <span></span>
                      <figcaption>Washington, D.C.</figcaption>
                    </figure>
                  </a>
                </nav>
              </OfInterest>
            </div>
          </Filters>
        </Sticky>
      </Header>
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

const Header = styled("header", {
  backgroundColor: "white",
  padding: "1rem 0",

  "> div": {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    " > * ": {
      alignSelf: "flex-end",
    },
  },

  ".sticky-filters > div": {
    width: "100%",

    input: {
      width: "100%",
    },
    "> div": {
      width: "100%",
      transition: "all 200ms ease-in-out",
      backgroundColor: "#fff",
      boxShadow: "none",

      ".sticky-tray": {
        padding: "0 0 1rem",
        display: "flex",
        justifyContent: "space-between",
        transition: "all 200ms ease-in-out",
      },
    },

    "&.sticky": {
      boxShadow: "0px 0px 1rem #00000033",

      "> div": {
        width: "calc(100% + 4rem)",
        marginLeft: "-2rem",

        ".sticky-tray": {
          padding: "0 2rem 1rem",
        },
      },
    },
  },
});

const Filters = styled("div", {});

const OfInterest = styled("div", {
  display: "flex",
  fontWeight: "300",

  label: {
    fontSize: "0.7222rem",
    textTransform: "uppercase",
    lineHeight: "21px",
    color: "#777",
  },

  nav: {
    display: "flex",

    a: {
      display: "flex",
      marginLeft: "1rem",
    },

    figure: {
      span: {
        display: "block",
        width: "21px",
        height: "21px",
        backgroundColor: "#aaa",
        borderRadius: "100%",
        marginRight: "0.5rem",
      },
      display: "flex",
      padding: "0",
      margin: "0",
      lineHeight: "21px",
    },
  },
});

const Tabs = styled("ul", {
  margin: "0",
  padding: "0",
  display: "flex",

  li: {
    margin: "0",
    marginRight: "1rem",
    padding: "0",
    listStyle: "none",
    fontSize: "24px",
    fontWeight: "200",
    color: "#777",

    "&:first-child": {
      color: "#000",
      fontWeight: "600",
    },
  },
});

export default StaticPage;
