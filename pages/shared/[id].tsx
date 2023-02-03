import { apiGetRequest, getIIIFResource } from "@/lib/dc-api";
import { useEffect, useState } from "react";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Head from "next/head";
import Layout from "@/components/layout";
import { Manifest } from "@iiif/presentation-3";
import { NextPage } from "next";
import SharedLink from "@/components/SharedLink/SharedLink";
import { type Work } from "@nulib/dcapi-types";
import { WorkProvider } from "@/context/work-context";
import { loadDefaultStructuredData } from "@/lib/json-ld";
import { useRouter } from "next/router";

const SharedPage: NextPage = () => {
  const [work, setWork] = useState<Work>();
  const [manifest, setManifest] = useState<Manifest>();
  const router = useRouter();

  async function getWorkAndManifest(id: string) {
    try {
      const work = await apiGetRequest<Work>({
        url: `${DCAPI_ENDPOINT}/shared-links/${id}`,
      });
      if (!work) return;
      setWork(work);
      const manifest = await getIIIFResource<Manifest>(work.iiif_manifest);
      setManifest(manifest);
    } catch (err) {
      console.error("err", err);
    }
    return true;
  }

  useEffect(() => {
    getWorkAndManifest(router.query?.id as string);
  }, [router]);

  if (!(work && manifest)) return <></>;

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

export default SharedPage;
