import { CollectionListShape, getCollections } from "@/lib/collection-helpers";
import React, {
  ChangeEvent,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { StyledForm, StyledInput } from "@/components/Shared/Form.styled";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import CollectionItem from "@/components/Collection/Item/Item";
import Container from "@/components/Shared/Container";
import { HEAD_META } from "@/lib/constants/head-meta";
import Head from "next/head";
import Heading from "@/components/Heading/Heading";
import Layout from "components/layout";
import { NextPage } from "next";
import { PRODUCTION_URL } from "@/lib/constants/endpoints";
import { buildDataLayer } from "@/lib/ga/data-layer";
import { loadDefaultStructuredData } from "@/lib/json-ld";

const CollectionList: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ collections }) => {
  const [entireCollectionsList, setEntireCollectionsList] = useState<
    CollectionListShape[]
  >([]);
  const [cacheCollectionsList, setCacheCollectionsList] = useState<
    CollectionListShape[]
  >([]);
  const [renderedCollectionsList, setRenderedCollectionsList] = useState<
    CollectionListShape[]
  >([]);
  const [search, setSearch] = useState("");
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCollectionElementRef = useRef<HTMLDivElement | null>(null);

  function spliceArray<T>(array: T[], start: number, end: number) {
    const newArray = [...array];
    const splicedArray = newArray.splice(start, end);
    return [splicedArray, newArray];
  }

  const loadInitialCollections = useCallback(async () => {
    const [first, rest] = spliceArray(collections, 0, 5);
    setRenderedCollectionsList(first);
    setCacheCollectionsList(rest);
    setEntireCollectionsList(collections);
  }, []);

  useEffect(() => {
    loadInitialCollections();
  }, [loadInitialCollections]);

  const loadMoreCollections = useCallback(() => {
    const [first, rest] = spliceArray(cacheCollectionsList, 0, 10);
    setRenderedCollectionsList([...renderedCollectionsList, ...first]);
    setCacheCollectionsList(rest);
  }, [cacheCollectionsList, renderedCollectionsList]);

  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && cacheCollectionsList.length > 0) {
          loadMoreCollections();
        }
      },
      { threshold: 0 },
    );

    // Observe the last collection element unless search is active
    if (!search && lastCollectionElementRef.current) {
      observer.current.observe(lastCollectionElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [renderedCollectionsList, cacheCollectionsList, loadMoreCollections]);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const search = event?.target?.value.toLowerCase();

    if (!search) {
      setRenderedCollectionsList(entireCollectionsList);
      return;
    }

    const filteredList = entireCollectionsList.filter((collection) =>
      collection.title.toLowerCase().includes(search),
    );
    setSearch(search);
    setRenderedCollectionsList(filteredList);
  };

  return (
    <>
      {/* Google Structured Data via JSON-LD */}
      <Head>
        <script
          key="app-ld-json"
          id="app-ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(loadDefaultStructuredData(), null, "\t"),
          }}
        />
      </Head>

      <Layout title={HEAD_META["COLLECTIONS"].title}>
        <Container>
          <Heading as="h1">All Collections</Heading>
          <StyledForm onSubmit={(e) => e.preventDefault()}>
            <StyledInput
              placeholder="Filter titles"
              onChange={handleFilterChange}
            />
          </StyledForm>
          {
            <>
              {renderedCollectionsList.length > 0 ? (
                <>
                  {renderedCollectionsList.map((item, index) => (
                    <div
                      key={item.id}
                      ref={
                        index === renderedCollectionsList.length - 1
                          ? lastCollectionElementRef
                          : null
                      }
                    >
                      <CollectionItem
                        {...item}
                        // set the priority for the first 3 images
                        priority={[0, 1, 2].includes(index)}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <p>
                  No results found for <strong>{search}</strong>.
                </p>
              )}
            </>
          }
        </Container>
      </Layout>
    </>
  );
};

export const getServerSideProps = (async () => {
  const dataLayer = buildDataLayer({
    pageTitle: "Collections page",
  });

  const openGraphData = {
    "og:title": HEAD_META["COLLECTIONS"].title,
    "og:url": `${PRODUCTION_URL}/collections`,
  };

  const collections = await getCollections();

  return {
    props: { dataLayer, openGraphData, collections },
  };
}) satisfies GetServerSideProps<{ collections: CollectionListShape[] }>;

export default CollectionList;
