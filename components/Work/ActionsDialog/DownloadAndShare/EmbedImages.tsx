import type { Canvas, IIIFExternalWebResource } from "@iiif/presentation-3";
import {
  EmbedHTML,
  EmbedHTMLActionRow,
  ItemActions,
  ItemContent,
  ItemRow,
  ItemStyled,
  ItemThumbnail,
} from "@/components/Work/ActionsDialog/DownloadAndShare/DownloadAndShare.styled";
import { Label, Thumbnail } from "@samvera/clover-iiif/primitives";
import {
  getAnnotationBodyType,
  getInfoResponse,
} from "@/lib/iiif/manifest-helpers";
import { makeBlob, mimicDownload } from "@samvera/image-downloader";

import Announcement from "@/components/Shared/Announcement";
import CopyText from "@/components/Shared/CopyText";
import Heading from "@/components/Heading/Heading";
import IIIFLogo from "@/components/Shared/SVG/IIIF";
import type { Manifest } from "@iiif/presentation-3";
import React from "react";
import SimpleSelect from "@/components/Shared/SimpleSelect.styled";
import type { Work } from "@nulib/dcapi-types";
import { embedWarningMessage } from "./DownloadAndShare";
import { useRouter } from "next/router";
import useWorkAuth from "@/hooks/useWorkAuth";

interface EmbedImagesProps {
  manifest: Manifest;
  showEmbedWarning: boolean;
  work: Work;
}

const EmbedImages: React.FC<EmbedImagesProps> = ({
  manifest,
  showEmbedWarning,
  work,
}) => {
  const router = useRouter();
  const [imageCanvases, setImageCanvases] = React.useState<Canvas[]>([]);
  const { isWorkRestricted } = useWorkAuth(work);
  const isSharedLinkPage = router.pathname.includes("/shared");

  React.useEffect(() => {
    if (manifest?.items && Array.isArray(manifest?.items)) {
      const imageCanvases = manifest.items.filter(
        (item) => getAnnotationBodyType(item) === "Image"
      );
      setImageCanvases(imageCanvases);
    }
  }, [manifest]);

  return (
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
  );
};

export default EmbedImages;

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
