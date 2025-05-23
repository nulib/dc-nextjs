import { GetServerSideProps, NextPage } from "next";
import { apiGetRawRequest, getIIIFResource } from "@/lib/dc-api";
import { setCookie } from "cookies-next";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Head from "next/head";
import Layout from "@/components/layout";
import { Manifest } from "@iiif/presentation-3";
import SharedLink from "@/components/SharedLink/SharedLink";
import type { Work } from "@nulib/dcapi-types";
import { ApiResponse } from "@/types/api/response";
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
  const sharedId = decodeURIComponent(context?.params?.id as string);

  try {
    const url = `${DCAPI_ENDPOINT}/shared-links/${sharedId}`;
    const response = await apiGetRawRequest<ApiResponse>({
      url,
    });

    if (!response) throw new Error("No response from API");

    const responseHeadersCookie = response.headers["set-cookie"];

    if (!responseHeadersCookie)
      throw new Error(`No shared link response for ${url}`);

    const dcApiCookie = responseHeadersCookie[0].split(" ")[0].split("=");
    const dcApiCookieKey = dcApiCookie[0];
    const dcApiCookieValue = dcApiCookie[1].slice(0, -1);

    const headers = {
      Cookie: `${dcApiCookieKey}=${dcApiCookieValue}`,
    };

    const { req, res } = context;
    setCookie(dcApiCookieKey, dcApiCookieValue, {
      req,
      res,
      domain: ".library.northwestern.edu",
      secure: true,
    });

    const work = response.data.data;

    function isWork(work: any): work is Work {
      return work && typeof work === "object" && "id" in work;
    }

    if (!isWork(work)) {
      throw new Error("Invalid work data");
    }

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
