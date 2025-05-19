import {
  ShareURL,
  ShareURLActions,
  StyledShareURL,
} from "@/components/Work/ActionsDialog/DownloadAndShare/DownloadAndShare.styled";

import Announcement from "@/components/Shared/Announcement";
import CopyText from "@/components/Shared/CopyText";
import Heading from "@/components/Heading/Heading";
import IIIFShare from "@/components/Shared/IIIF/Share";
import IIIFShareHelperLink from "@/components/Shared/IIIF/HelperLink";
import { Manifest } from "@iiif/presentation-3";
import MiradorLink from "./MiradorLink";
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
      <Heading as="h3" css={{ marginTop: "0" }}>
        IIIF Manifest
      </Heading>
      <StyledShareURL>
        <input type="text" value={manifest.id} readOnly />
        <IIIFShare uri={manifest.id} />
      </StyledShareURL>

      <div
        style={{
          display: "flex",
          padding: "0.5rem 1rem",
          justifyContent: "flex-end",
        }}
      >
        <IIIFShareHelperLink />
      </div>

      {(isWorkInstitution || isWorkPrivate) && (
        <Announcement
          css={{
            marginTop: "1rem",
          }}
          data-testid="mirador-announcement"
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
