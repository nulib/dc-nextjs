import {
  ActionsDialogStyled,
  Content,
} from "@/components/Work/ActionsDialog/ActionsDialog.styled";
import { Canvas, IIIFExternalWebResource } from "@iiif/presentation-3";
import {
  EmbedViewer,
  ItemActions,
  ItemContent,
  ItemStyled,
  ItemThumbnail,
} from "@/components/Work/ActionsDialog/DownloadAndShare.styled";
import { Label, Thumbnail } from "@samvera/nectar-iiif";
import ActionsDialogAside from "@/components/Work/ActionsDialog/Aside";
import CopyText from "@/components/Shared/CopyText";

import { DefinitionListWrapper } from "@/components/Shared/DefinitionList.styled";
import React from "react";
import SharedSocial from "@/components/Shared/Social";
import { getInfoResponse } from "@/lib/iiif/manifest-helpers";
import { useWorkState } from "@/context/work-context";

const DownloadAndShare: React.FC = () => {
  const { workState } = useWorkState();
  const { manifest, work } = workState;

  const embedViewerHTML = `<iframe src=“https://dc.library.northwestern.edu/embedded-viewer/${manifest?.id}” title=“${work?.title}” width=“100%” height=“800”></iframe>`;

  if (!manifest || !work) return <></>;

  return (
    <ActionsDialogStyled>
      <ActionsDialogAside>
        <SharedSocial />
      </ActionsDialogAside>
      <Content>
        <DefinitionListWrapper>
          <dl>
            <dt>IIIF Manifest</dt>
            <dd>
              <a href={manifest.id} target="_blank" rel="noreferrer">
                {manifest.id}
              </a>
            </dd>
          </dl>
        </DefinitionListWrapper>

        <h3>Embed Viewer</h3>
        <EmbedViewer>
          <pre>{embedViewerHTML}</pre>
          <CopyText textPrompt="Copy" textToCopy={embedViewerHTML} />
        </EmbedViewer>

        <h3>Download and Embed</h3>
        <div>
          {manifest.items.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </div>
      </Content>
    </ActionsDialogStyled>
  );
};

const Item: React.FC<Record<"item", Canvas>> = ({ item }) => {
  return (
    <ItemStyled>
      <ItemThumbnail>
        {item.thumbnail && (
          <Thumbnail thumbnail={item.thumbnail as IIIFExternalWebResource[]} />
        )}
      </ItemThumbnail>
      <ItemContent>
        {item.label && <Label label={item.label} as="span" />}
        <ItemActions>
          <li>
            <a
              href={`${getInfoResponse(item)}/full/1000,/0/default.jpg`}
              download
              rel="noreferrer"
              target="_blank"
            >
              Download JPG
            </a>
          </li>
          <li>
            <a href="">Embed HTML</a>
          </li>
        </ItemActions>
      </ItemContent>
    </ItemStyled>
  );
};

export default DownloadAndShare;
