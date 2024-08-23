import {
  ShareURL,
  ShareURLActions,
} from "@/components/Work/ActionsDialog/DownloadAndShare/DownloadAndShare.styled";

import Announcement from "@/components/Shared/Announcement";
import CopyText from "@/components/Shared/CopyText";
import Heading from "@/components/Heading/Heading";
import IIIFLogo from "@/components/Shared/SVG/IIIF";
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
    <>
      <Heading as="h3" css={{ marginTop: "0" }}>
        IIIF Manifest
      </Heading>
      <ShareURL>
        <a href={manifest.id} target="_blank" rel="noreferrer">
          {manifest.id}
        </a>
        <ShareURLActions>
          <CopyText
            renderIcon={IIIFLogo}
            textPrompt="Copy Manifest Link"
            textToCopy={manifest.id}
          />
          <a
            href="https://iiif.io/get-started/why-iiif/"
            target="_blank"
            rel="noreferrer"
          >
            What is IIIF?
          </a>
          <MiradorLink
            showWarning={isWorkInstitution || isWorkPrivate}
            manifestId={manifest.id}
          />
        </ShareURLActions>
      </ShareURL>

      {(isWorkInstitution || isWorkPrivate) && (
        <Announcement
          css={{
            marginTop: "1rem",
          }}
          data-testid="mirador-announcement"
        >
          Opening in external tools like Mirador is not supported for works that
          require authentication.
        </Announcement>
      )}
    </>
  );
};

export default IIIFManifest;
