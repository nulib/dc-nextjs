import { useEffect, useState } from "react";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Head from "next/head";
import Layout from "@/components/layout";
import { Manifest } from "@iiif/presentation-3";
import { NextPage } from "next";
import SharedLink from "@/components/SharedLink/SharedLink";
import { WorkProvider } from "@/context/work-context";
import { WorkShape } from "@/types/components/works";
import axios from "axios";
import { loadDefaultStructuredData } from "@/lib/json-ld";
import { useRouter } from "next/router";

const SharedPage: NextPage = () => {
  const [work, setWork] = useState<WorkShape>();
  const [manifest, setManifest] = useState<Manifest>();
  const router = useRouter();

  async function getWorkAndManifest(id: string) {
    try {
      const workResponse = await axios.get(
        `${DCAPI_ENDPOINT}/shared-links/${id}`,
        { withCredentials: true }
      );

      const work: WorkShape = workResponse?.data?.data;
      const manifestResponse = await axios.get(work.iiif_manifest, {
        withCredentials: true,
      });
      const manifest: Manifest = manifestResponse.data;

      setWork(work);
      setManifest(manifest);
    } catch (err) {
      console.error("err", err);
    }

    console.log("made it past the catch");
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
