import {
  ActionsDialogStyled,
  Content,
} from "@/components/Work/ActionsDialog/ActionsDialog.styled";
import { Canvas, IIIFExternalWebResource } from "@iiif/presentation-3";
import {
  EmbedHTML,
  EmbedHTMLActionRow,
  EmbedViewer,
  ItemActions,
  ItemContent,
  ItemRow,
  ItemStyled,
  ItemThumbnail,
} from "@/components/Work/ActionsDialog/DownloadAndShare.styled";
import { Label, Thumbnail } from "@samvera/nectar-iiif";
import ActionsDialogAside from "@/components/Work/ActionsDialog/Aside";
import CopyText from "@/components/Shared/CopyText";
import { DefinitionListWrapper } from "@/components/Shared/DefinitionList.styled";
import React from "react";
import SharedSocial from "@/components/Shared/Social";
import SimpleSelect from "@/components/Shared/SimpleSelect.styled";
import { getInfoResponse } from "@/lib/iiif/manifest-helpers";
import { useRouter } from "next/router";
import { useWorkState } from "@/context/work-context";

const DownloadAndShare: React.FC = () => {
  const { workState } = useWorkState();
  const { manifest, work } = workState;
  const router = useRouter();
  const isSharedLinkPage = router.pathname.includes("/shared");

  const embedViewerHTML = manifest?.id
    ? `<iframe src="${
        window.location.origin
      }/embedded-viewer/${encodeURIComponent(manifest.id)}" title="${
        work?.title
      }" width="100%" height="800"></iframe>`
    : "";

  if (!manifest || !work) return <></>;

  return (
    <ActionsDialogStyled>
      <ActionsDialogAside>
        <SharedSocial />
      </ActionsDialogAside>
      <Content>
        {!isSharedLinkPage && (
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
        )}

        <h3>Embed Viewer</h3>
        <EmbedViewer>
          <pre>{embedViewerHTML || "Error creating embed viewer HTML"}</pre>
          <CopyText textPrompt="Copy" textToCopy={embedViewerHTML} />
        </EmbedViewer>

        {Array.isArray(manifest?.items) && (
          <>
            <h3>Download and Embed</h3>
            <div>
              {manifest.items.map((item) => (
                <Item item={item} key={item.id} />
              ))}
            </div>
          </>
        )}
      </Content>
    </ActionsDialogStyled>
  );
};

const Item: React.FC<Record<"item", Canvas>> = ({ item }) => {
  const [embedHTMLOpen, setEmbedHTMLOpen] = React.useState(false);
  const [color, setColor] = React.useState("default");
  const [width, setWidth] = React.useState(3000);

  const colors = [
    {
      label: "Default",
      value: "default",
    },
    {
      label: "Bitonal",
      value: "bitonal",
    },
    {
      label: "Gray",
      value: "gray",
    },
  ];

  const widths = [
    {
      label: "3000px - 100%",
      value: 3000,
    },
    {
      label: "1800px - 50%",
      value: 1800,
    },
    {
      label: "900px - 25%",
      value: 900,
    },
    {
      label: "450px - 12.5%",
      value: 450,
    },
  ];

  const embedHTMLString = `<img src="https://iiif.stack.rdc.library.northwestern.edu/iiif/2/017962ae-0cc5-4e1f-899d-ab102aad71b7/full/${width},/0/${color}.jpg" alt="inu-dil-8ab680fc-4940-4c8e-a0bf-96844a27f5a5.tif" />`;

  return (
    <ItemStyled>
      <ItemRow>
        <ItemThumbnail>
          {item.thumbnail && (
            <Thumbnail
              thumbnail={item.thumbnail as IIIFExternalWebResource[]}
            />
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
              <a
                style={{ cursor: "pointer" }}
                onClick={() => setEmbedHTMLOpen(!embedHTMLOpen)}
              >
                Embed HTML
              </a>
            </li>
          </ItemActions>
        </ItemContent>
      </ItemRow>
      {embedHTMLOpen && (
        <EmbedHTML>
          <pre>{embedHTMLString}</pre>
          <EmbedHTMLActionRow>
            <CopyText textPrompt="Copy" textToCopy={embedHTMLString} />
            <SimpleSelect onChange={(e) => setWidth(parseInt(e.target.value))}>
              {widths.map((width) => (
                <option key={width.value} value={width.value}>
                  {width.label}
                </option>
              ))}
            </SimpleSelect>
            <SimpleSelect onChange={(e) => setColor(e.target.value)}>
              {colors.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </SimpleSelect>
          </EmbedHTMLActionRow>
        </EmbedHTML>
      )}
    </ItemStyled>
  );
};

export default DownloadAndShare;
