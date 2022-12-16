import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
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

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  try {
    let cookie = req.headers.cookie;
    const workResponse = await axios.get(
      `${DCAPI_ENDPOINT}/shared-links/${params?.id}`,
      { headers: { cookie } }
    );

    if (workResponse) {
      const cookieHeader = workResponse.headers["set-cookie"];
      if (cookieHeader) {
        res.setHeader("set-cookie", cookieHeader);
        cookie = cookieHeader[0].split(/;\s+/)[0];
      }
    }

    // console.log("cookie", cookie);
    // console.log("req", req);

    const work: WorkShape = workResponse.data.data;

    const manifestResponse = await axios.get(work.iiif_manifest, {
      headers: { cookie },
    });
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
