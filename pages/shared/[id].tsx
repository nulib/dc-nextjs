import { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "@/components/layout";
import { Manifest } from "@iiif/presentation-3";
import { NextPage } from "next";
import SharedLink from "@/components/SharedLink/SharedLink";
import { WorkProvider } from "@/context/work-context";
import { WorkShape } from "@/types/components/works";
import axios from "axios";
import { loadDefaultStructuredData } from "@/lib/json-ld";

interface SharedPageProps {
  manifest: Manifest;
  work: WorkShape;
}

const SharedPage: NextPage<SharedPageProps> = ({ manifest, work }) => {
  return (
    <WorkProvider initialState={{ manifest: manifest, work: work }}>
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
      <Layout>
        <SharedLink manifest={manifest} work={work} />
      </Layout>
    </WorkProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const workResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/shared-links/${params?.id}`
    );
    const work: WorkShape = workResponse.data.data;

    /**
     * For a restricted Work (Private or Institution), this manifest URL returns a non 200
     * So, work is being done to make this endpoint work, which we'll need to pass through
     * to child components to allow access to a manifest:
     *
     * `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/shared-links/${params?.id}?as=iiif`
     */
    const manifestResponse = await axios.get(work.iiif_manifest);
    const manifest = manifestResponse.data;

    return {
      props: {
        manifest,
        work,
      },
    };
  } catch (err) {
    console.error("err", err);
    return {
      props: {
        manifest: null,
        work: null,
      },
    };
  }
};

export default SharedPage;
