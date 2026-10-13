import downloadAndShareStyles from "@/components/Work/ActionsDialog/DownloadAndShare/DownloadAndShare.module.css";
import iIIFManifestStyles from "@/components/Work/ActionsDialog/DownloadAndShare/IIIFManifest.module.css";
import Announcement from "@/components/Shared/Announcement";
import Heading from "@/components/Heading/Heading";
import IIIFShare from "@/components/Shared/IIIF/Share";
import IIIFShareHelperLink from "@/components/Shared/IIIF/HelperLink";
import { Manifest } from "@iiif/presentation-3";
import React from "react";
import type { Work } from "@nulib/dcapi-types";
import useWorkAuth from "@/hooks/useWorkAuth";
interface IIIFManifestProps {
  manifest: Manifest;
  work: Work;
}
const IIIFManifest: React.FC<IIIFManifestProps> = ({ manifest, work }) => {
  const { isWorkInstitution, isWorkPrivate } = useWorkAuth(work);
  return (
    <section>
      <Heading as="h3" className={iIIFManifestStyles.override0}>
        IIIF Manifest
      </Heading>
      <div className={downloadAndShareStyles.styledShareURL}>
        <input type="text" value={manifest.id} readOnly />
        <IIIFShare uri={manifest.id} />
      </div>

      <div className={iIIFManifestStyles.override1}>
        <IIIFShareHelperLink />
      </div>

      {(isWorkInstitution || isWorkPrivate) && (
        <Announcement
          data-testid="mirador-announcement"
          className={iIIFManifestStyles.override2}
        >
          Opening in external applications using IIIF Viewers such as Clover,
          Mirador, and Theseus is not supported for works that require
          authentication.
        </Announcement>
      )}
    </section>
  );
};
export default IIIFManifest;
