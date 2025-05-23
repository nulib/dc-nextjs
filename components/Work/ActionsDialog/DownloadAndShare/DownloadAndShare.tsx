import {
  ActionsDialogStyled,
  Content,
} from "@/components/Work/ActionsDialog/ActionsDialog.styled";
import ExpandableList, {
  ExpandableListItem,
} from "@/components/Shared/ExpandableList";
import {
  LabeledContentResource,
  NULWorkManifest,
} from "@/types/components/works";
import React, { useEffect, useState } from "react";

import ActionsDialogAside from "@/components/Work/ActionsDialog/Aside";
import { Canvas } from "@iiif/presentation-3";
import ContentStateActiveCanvas from "../ContentState/ActiveCanvas";
import EmbedResources from "./EmbedResources";
import EmbedViewer from "@/components/Work/ActionsDialog/DownloadAndShare/EmbedViewer";
import IIIFManifest from "./IIIFManifest";
import WorkDialogContentState from "../ContentState/ContentState";
import { getAnnotationBodyType } from "@/lib/iiif/manifest-helpers";
import { useRouter } from "next/router";
import useWorkAuth from "@/hooks/useWorkAuth";
import { useWorkState } from "@/context/work-context";

export const embedWarningMessage =
  "Embed is not available for works restricted to the Northwestern University community";

const DownloadAndShare: React.FC = () => {
  const { workState } = useWorkState();
  const { manifest, work, contentState } = workState;
  const [imageCanvases, setImageCanvases] = useState<Canvas[]>([]);
  const [alternateFormatItems, setAlternateFormatItems] = useState<
    LabeledContentResource[]
  >([]);

  const router = useRouter();
  const isSharedLinkPage = router.pathname.includes("/shared");

  const { isWorkPrivate, isWorkInstitution } = useWorkAuth(work);

  const showEmbedWarning = Boolean(isWorkPrivate || isWorkInstitution);

  useEffect(() => {
    if (manifest?.items && Array.isArray(manifest?.items)) {
      const imageCanvases = manifest.items.filter(
        (item) => getAnnotationBodyType(item) === "Image",
      );
      const alternateFormatItems = manifest.rendering
        ? [...manifest.rendering]
        : [];
      setImageCanvases(imageCanvases);
      setAlternateFormatItems(alternateFormatItems);
    }
  }, [manifest]);

  if (!manifest || !work) return <></>;

  return (
    <ActionsDialogStyled>
      <ActionsDialogAside>
        {contentState && <ContentStateActiveCanvas />}
      </ActionsDialogAside>
      <Content>
        <ExpandableList defaultValue="share-url">
          {!isSharedLinkPage && (
            <ExpandableListItem title="Share Url" value="share-url">
              <WorkDialogContentState />
            </ExpandableListItem>
          )}
          {!isSharedLinkPage && (
            <ExpandableListItem title="IIIF Manifest" value="iiif">
              <IIIFManifest manifest={manifest} work={work} />
            </ExpandableListItem>
          )}
          <ExpandableListItem title="Embed Viewer" value="embed-viewer">
            <EmbedViewer
              manifestId={work.iiif_manifest}
              showEmbedWarning={showEmbedWarning}
              work={work}
            />
          </ExpandableListItem>
          {(imageCanvases.length > 0 || alternateFormatItems.length > 0) && (
            <ExpandableListItem
              title="Download and Embed"
              value="embed-resources"
            >
              <EmbedResources
                manifest={manifest as NULWorkManifest}
                alternateFormatItems={alternateFormatItems}
                showEmbedWarning={showEmbedWarning}
                work={work}
              />
            </ExpandableListItem>
          )}
        </ExpandableList>
      </Content>
    </ActionsDialogStyled>
  );
};

export default DownloadAndShare;
