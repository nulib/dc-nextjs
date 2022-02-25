import React from "react";
import Layout from "components/Layout";
import { NextPage } from "next";
import { getWork, foo } from "lib/elasticsearch-api";
import { useRouter } from "next/router";
import Container from "components/Container";

const Work: NextPage = () => {
  const [work, setWork] = React.useState();
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    const fn = async () => {
      const result = await getWork(id as string);
      setWork(result);
    };
    fn();
  }, [id]);

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
