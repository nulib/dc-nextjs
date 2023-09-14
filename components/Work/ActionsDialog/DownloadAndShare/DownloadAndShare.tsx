import {
  ActionsDialogStyled,
  Content,
} from "@/components/Work/ActionsDialog/ActionsDialog.styled";
import React, { useEffect, useState } from "react";

import ActionsDialogAside from "@/components/Work/ActionsDialog/Aside";
import { Canvas } from "@iiif/presentation-3";
import EmbedImages from "./EmbedImages";
import EmbedViewer from "@/components/Work/ActionsDialog/DownloadAndShare/EmbedViewer";
import IIIFManifest from "./IIIFManifest";
import SharedSocial from "@/components/Shared/Social";
import { getAnnotationBodyType } from "@/lib/iiif/manifest-helpers";
import { useRouter } from "next/router";
import useWorkAuth from "@/hooks/useWorkAuth";
import { useWorkState } from "@/context/work-context";

export const embedWarningMessage =
  "Embed is not available for works restricted to the Northwestern University community";

const DownloadAndShare: React.FC = () => {
  const { workState } = useWorkState();
  const { manifest, work } = workState;
  const [imageCanvases, setImageCanvases] = useState<Canvas[]>([]);
  const router = useRouter();
  const isSharedLinkPage = router.pathname.includes("/shared");
  const { isUserLoggedIn, isWorkInstitution, isWorkRestricted } =
    useWorkAuth(work);

  const showEmbedWarning = Boolean(
    isWorkRestricted || (isUserLoggedIn && isWorkInstitution)
  );

  useEffect(() => {
    if (manifest?.items && Array.isArray(manifest?.items)) {
      const imageCanvases = manifest.items.filter(
        (item) => getAnnotationBodyType(item) === "Image"
      );
      setImageCanvases(imageCanvases);
    }
  }, [manifest]);

  if (!manifest || !work) return <></>;

  return (
    <ActionsDialogStyled>
      <ActionsDialogAside>
        {work.title && work.thumbnail && (
          <SharedSocial
            title={work.title}
            media={work.thumbnail}
            description={work.description}
          />
        )}
      </ActionsDialogAside>
      <Content>
        {!isSharedLinkPage && <IIIFManifest manifest={manifest} work={work} />}

        <EmbedViewer
          manifestId={work.iiif_manifest}
          showEmbedWarning={showEmbedWarning}
          work={work}
        />

        {imageCanvases.length > 0 && (
          <EmbedImages
            manifest={manifest}
            showEmbedWarning={showEmbedWarning}
            work={work}
          />
        )}
      </Content>
    </ActionsDialogStyled>
  );
};

export default DownloadAndShare;
