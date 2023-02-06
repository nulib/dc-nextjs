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
import { makeBlob, mimicDownload } from "@samvera/image-downloader";
import ActionsDialogAside from "@/components/Work/ActionsDialog/Aside";
import Announcement from "@/components/Shared/Announcement";
import CopyText from "@/components/Shared/CopyText";
import { DefinitionListWrapper } from "@/components/Shared/DefinitionList.styled";
import React from "react";
import SharedSocial from "@/components/Shared/Social";
import SimpleSelect from "@/components/Shared/SimpleSelect.styled";
import { getInfoResponse } from "@/lib/iiif/manifest-helpers";
import { useRouter } from "next/router";
import useWorkAuth from "@/hooks/useWorkAuth";
import { useWorkState } from "@/context/work-context";

const embedWarningMessage =
  "Embed is not available for works restricted to the Northwestern University community";

const DownloadAndShare: React.FC = () => {
  const { workState } = useWorkState();
  const { manifest, work } = workState;
  const router = useRouter();
  const isSharedLinkPage = router.pathname.includes("/shared");
  const { isUserLoggedIn, isWorkInstitution, isWorkRestricted } =
    useWorkAuth(work);

  const showEmbedWarning = Boolean(
    isWorkRestricted || (isUserLoggedIn && isWorkInstitution)
  );
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
        {work.title && work.thumbnail && (
          <SharedSocial
            title={work.title}
            media={work.thumbnail}
            description={work.description}
          />
        )}
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
        {showEmbedWarning && <Announcement>{embedWarningMessage}</Announcement>}
        {!showEmbedWarning && (
          <EmbedViewer>
            <pre>{embedViewerHTML || "Error creating embed viewer HTML"}</pre>
            <CopyText textPrompt="Copy" textToCopy={embedViewerHTML} />
          </EmbedViewer>
        )}

        {Array.isArray(manifest?.items) && (
          <>
            <h3>Download and Embed</h3>

            {isWorkRestricted && (
              <Announcement>
                Download requires Northwestern University NetID authentication{" "}
              </Announcement>
            )}

            {!isWorkRestricted && (
              <div>
                {manifest.items.map((item) => (
                  <Item
                    item={item}
                    key={item.id}
                    showEmbedWarning={showEmbedWarning}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Content>
    </ActionsDialogStyled>
  );
};

interface ItemProps {
  item: Canvas;
  showEmbedWarning: boolean;
}

const Item: React.FC<ItemProps> = ({ item, showEmbedWarning }) => {
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

  const thumbId = item.thumbnail ? item.thumbnail[0].id : "";
  const embedHTMLStringArray = thumbId?.split("/");
  const isValidStringArray =
    embedHTMLStringArray?.length && embedHTMLStringArray.length > 0;

  if (isValidStringArray) {
    embedHTMLStringArray[7] = `${width},`;
    embedHTMLStringArray[9] = `${color}.jpg`;
  }

  const embedHTMLString = `<img src="${embedHTMLStringArray?.join(
    "/"
  )}" alt="Northwestern Libraries Digital Collections Fileset image for ${
    isValidStringArray ? embedHTMLStringArray[5] : ""
  }" />`;

  const handleDownloadClick = async (
    e: React.SyntheticEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    const downloadFilename =
      item.label?.none && item.label.none.length > 0
        ? item.label.none[0].replace(/\.[^/.]+$/, "")
        : "nul_fileset";

    const response = await makeBlob(
      `${getInfoResponse(item)}/full/3000,/0/default.jpg`,
      { credentials: "include" }
    );

    if (!response || response.error) {
      alert("Error fetching the image");
      return;
    }

    mimicDownload(response, downloadFilename);
  };

  return (
    <ItemStyled>
      <ItemRow>
        <ItemThumbnail>
          {item.thumbnail && (
            <Thumbnail
              altAsLabel={item.label ? item.label : { none: [item.id] }}
              thumbnail={item.thumbnail as IIIFExternalWebResource[]}
            />
          )}
        </ItemThumbnail>
        <ItemContent>
          {item.label && <Label label={item.label} as="span" />}
          <ItemActions>
            <li>
              <a onClick={handleDownloadClick} href="#">
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
        <>
          {showEmbedWarning && (
            <div style={{ marginTop: "1rem" }}>
              <Announcement>{embedWarningMessage}</Announcement>
            </div>
          )}

          {!showEmbedWarning && (
            <EmbedHTML>
              <pre>{embedHTMLString}</pre>
              <EmbedHTMLActionRow>
                <CopyText textPrompt="Copy" textToCopy={embedHTMLString} />
                <SimpleSelect
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                >
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
        </>
      )}
    </ItemStyled>
  );
};

export default DownloadAndShare;
