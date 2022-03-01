import React from "react";
import Layout from "components/Layout";
import { GetStaticProps, NextPage } from "next";
import { getWork, getWorkIds } from "lib/elasticsearch-api";
import Container from "components/Container";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
  id: string;
}

/**
 * Pre-build all Work routes at build time
 */
export async function getStaticPaths() {
  const ids = await getWorkIds();
  const paths = ids.map((id) => ({
    params: {
      id: id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

/**
 * Get individual Work data at build time
 */
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const work = await getWork(id);

  return { props: { work }, revalidate: 10 };
};

interface WorkProps {
  work: any;
}

const Work: NextPage<WorkProps> = ({ work }) => {
  return (
    <Layout>
      <Container>
        <h1>{work?.descriptiveMetadata?.title}</h1>
        {work && (
          <dl>
            <dt>Accession Number</dt>
            <dd>{work.accessionNumber}</dd>
            <dt>Create Date</dt>
            <dd>{work.createDate}</dd>
            ...more here
          </dl>
        )}
      </Container>
    </Layout>
  );
};

export default Work;
