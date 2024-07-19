import { GetServerSideProps, NextPage } from "next";
import { apiGetRequest, getIIIFResource } from "@/lib/dc-api";
import { getCookies, setCookie } from "cookies-next";

import { AxiosResponse } from "axios";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Head from "next/head";
import Layout from "@/components/layout";
import { Manifest } from "@iiif/presentation-3";
import SharedLink from "@/components/SharedLink/SharedLink";
import type { Work } from "@nulib/dcapi-types";
import { WorkProvider } from "@/context/work-context";
import { buildWorkDataLayer } from "@/lib/ga/data-layer";
import { loadDefaultStructuredData } from "@/lib/json-ld";

interface SharedPageProps {
  linkExpiration: string;
  manifest: Manifest;
  work: Work;
}

const SharedPage: NextPage<SharedPageProps> = ({
  linkExpiration,
  manifest,
  work,
}) => {
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
      <Layout title={work?.title || ""}>
        <SharedLink
          manifest={manifest}
          work={work}
          linkExpiration={linkExpiration}
        />
      </Layout>
    </WorkProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const cookies = getCookies({ req, res });

  // are these cookies properly set?
  const headers = {
    Cookie: Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join("; "),
  };
  console.log(`headers`, headers);

  const sharedId = decodeURIComponent(context?.params?.id as string);

  try {
    const response = await apiGetRequest<AxiosResponse>(
      {
        url: `${DCAPI_ENDPOINT}/shared-links/${sharedId}`,
        headers,
      },
      true,
    );

    // console.log(`response`, response);

    if (!response) throw new Error("No response from API");

    const work = response.data.data as Work;

    const manifest =
      (await getIIIFResource<Manifest>(work.iiif_manifest, headers)) || null;

    const dataLayer = buildWorkDataLayer(work);

    return {
      props: {
        dataLayer,
        linkExpiration: (response.data.info.link_expiration as string) || "",
        manifest,
        work,
      },
    };
  } catch (err) {
    console.error("err", err);
    return {
      props: {
        dataLayer: [],
        linkExpiration: "",
        manifest: null,
        work: null,
      },
    };
  }
};

export default SharedPage;
