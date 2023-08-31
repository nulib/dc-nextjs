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
  ShareURL,
  ShareURLActions,
} from "@/components/Work/ActionsDialog/DownloadAndShare.styled";
import { Label, Thumbnail } from "@samvera/clover-iiif/primitives";
import React, { useEffect, useState } from "react";
import {
  getAnnotationBodyType,
  getInfoResponse,
} from "@/lib/iiif/manifest-helpers";
import { makeBlob, mimicDownload } from "@samvera/image-downloader";

import ActionsDialogAside from "@/components/Work/ActionsDialog/Aside";
import Announcement from "@/components/Shared/Announcement";
import CopyText from "@/components/Shared/CopyText";
import Heading from "@/components/Heading/Heading";
import IIIFLogo from "@/components/Shared/SVG/IIIF";
import SharedSocial from "@/components/Shared/Social";
import SimpleSelect from "@/components/Shared/SimpleSelect.styled";
import { useRouter } from "next/router";
import useWorkAuth from "@/hooks/useWorkAuth";
import { useWorkState } from "@/context/work-context";

const embedWarningMessage =
  "Embed is not available for works restricted to the Northwestern University community";

function MiradorLink({
  showWarning,
  manifestId,
}: {
  showWarning: boolean;
  manifestId: string;
}) {
  return showWarning ? (
    <span>View in Mirador</span>
  ) : (
    <a
      href={`https://projectmirador.org/embed/?iiif-content=${manifestId}`}
      target="_blank"
      rel="noreferrer"
    >
      View in Mirador
    </a>
  );
}

const DownloadAndShare: React.FC = () => {
  const { workState } = useWorkState();
  const { manifest, work } = workState;
  const [imageCanvases, setImageCanvases] = useState<Canvas[]>([]);
  const router = useRouter();
  const isSharedLinkPage = router.pathname.includes("/shared");
  const { isUserLoggedIn, isWorkInstitution, isWorkPrivate, isWorkRestricted } =
    useWorkAuth(work);

  const showEmbedWarning = Boolean(
    isWorkRestricted || (isUserLoggedIn && isWorkInstitution)
  );
  const embedViewerHTML = manifest?.id
    ? `<iframe src="${
        window.location.origin
      }/embedded-viewer/${encodeURIComponent(
        manifest.id
      )}" title="${work?.title}" width="100%" height="800"></iframe>`
    : "";

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
        {!isSharedLinkPage && (
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
              {(isWorkInstitution || isWorkPrivate) && (
                <Announcement
                  css={{
                    marginTop: "1rem",
                  }}
                  data-testid="mirador-announcement"
                >
                  Opening in external tools like Mirador is not supported for
                  works that require authentication.
                </Announcement>
              )}
            </ShareURL>
          </>
        )}

        <Heading as="h3">Embed Viewer</Heading>
        {showEmbedWarning && <Announcement>{embedWarningMessage}</Announcement>}
        {!showEmbedWarning && (
          <EmbedViewer>
            <pre>{embedViewerHTML || "Error creating embed viewer HTML"}</pre>
            <CopyText textPrompt="Copy" textToCopy={embedViewerHTML} />
          </EmbedViewer>
        )}

        {imageCanvases.length > 0 && (
          <>
            <Heading as="h3">Download and Embed Images</Heading>

            {isWorkRestricted && !isSharedLinkPage && (
              <Announcement>
                Download requires Northwestern University NetID authentication{" "}
              </Announcement>
            )}

            {(!isWorkRestricted || isSharedLinkPage) && (
              <div data-testid="download-embed-items">
                {imageCanvases.map((item) => (
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

  const iiifImageInfo = `${getInfoResponse(item)}/info.json`;

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
            <li>
              <CopyText
                renderIcon={IIIFLogo}
                textPrompt="Copy IIIF"
                textToCopy={iiifImageInfo}
              />
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
