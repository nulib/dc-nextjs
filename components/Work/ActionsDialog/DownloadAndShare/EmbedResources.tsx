import {
  AlternateFormatList,
  EmbedHTML,
  EmbedHTMLActionRow,
  EmbedResourcesWrapper,
  ItemActions,
  ItemContent,
  ItemRow,
  ItemStyled,
  ItemThumbnail,
  PdfLabel,
} from "@/components/Work/ActionsDialog/DownloadAndShare/DownloadAndShare.styled";
import type { Canvas, IIIFExternalWebResource } from "@iiif/presentation-3";
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
import { NULWorkManifest } from "@/types/components/works";
import React from "react";
import SimpleSelect from "@/components/Shared/SimpleSelect.styled";
import { StyledCopyText } from "@/components/Shared/CopyText.styled";
import type { Work } from "@nulib/dcapi-types";
import { embedWarningMessage } from "./DownloadAndShare";
import { useRouter } from "next/router";
import useWorkAuth from "@/hooks/useWorkAuth";

interface EmbedResourcesProps {
  manifest: NULWorkManifest;
  alternateFormatItems: NULWorkManifest["rendering"];
  showEmbedWarning: boolean;
  work: Work;
}

const EmbedResources: React.FC<EmbedResourcesProps> = ({
  manifest,
  alternateFormatItems,
  showEmbedWarning,
  work,
}) => {
  const router = useRouter();
  const [imageCanvases, setImageCanvases] = React.useState<Canvas[]>([]);
  const { userCanRead, loginRequired: hookLoginRequired } = useWorkAuth(work);
  const isSharedLinkPage = router.pathname.includes("/shared");
  const loginRequired = hookLoginRequired && !isSharedLinkPage;

  React.useEffect(() => {
    if (manifest?.items && Array.isArray(manifest?.items)) {
      const imageCanvases = manifest.items.filter(
        (item) => getAnnotationBodyType(item) === "Image",
      );
      setImageCanvases(imageCanvases);
    }
  }, [manifest]);

  return (
    <EmbedResourcesWrapper>
      <Heading as="h3">Download and Embed</Heading>

      {loginRequired && (
        <Announcement>
          Download requires Northwestern University NetID authentication{" "}
        </Announcement>
      )}

      {(userCanRead || isSharedLinkPage) && (
        <>
          {alternateFormatItems && alternateFormatItems.length > 0 && (
            <>
              <Heading as="h4">Alternate Formats</Heading>
              <AlternateFormatList>
                {alternateFormatItems.map((item) => (
                  <li key={item.id}>
                    {item.label && (
                      <a href={item.id} target="_blank" rel="noreferrer">
                        <Label label={item.label} as="span" />
                        {/* @ts-ignore  */}
                        {item.format?.includes("application/pdf") && (
                          <PdfLabel>(pdf)</PdfLabel>
                        )}
                      </a>
                    )}
                  </li>
                ))}
              </AlternateFormatList>
            </>
          )}

          <Heading as="h4">Images</Heading>
          <div data-testid="download-embed-items">
            {imageCanvases.map((item) => (
              <Item
                item={item}
                key={item.id}
                showEmbedWarning={showEmbedWarning}
              />
            ))}
          </div>
        </>
      )}
    </EmbedResourcesWrapper>
  );
};

export default EmbedResources;

interface ItemProps {
  item: Canvas;
  showEmbedWarning: boolean;
}

const Item: React.FC<ItemProps> = ({ item, showEmbedWarning }) => {
  const [embedHTMLOpen, setEmbedHTMLOpen] = React.useState(false);
  const [color, setColor] = React.useState("default");

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

  // Cap whichever dimension is longer, so a narrow-but-tall image doesn't
  // download/embed at its full (potentially huge) height.
  const isPortrait = !!(item.width && item.height && item.height > item.width);
  const longestDimension = isPortrait ? item.height : item.width;

  const toSizeParam = (value: number) => {
    const upscalePrefix = longestDimension ? "" : "^";
    return isPortrait
      ? `${upscalePrefix},${value}`
      : `${upscalePrefix}${value},`;
  };

  const widths = [3000, 1800, 900, 450]
    .filter((value) => !longestDimension || value <= longestDimension)
    .map((value) => ({ label: `${value}px`, value }));

  if (widths.length === 0 && longestDimension) {
    widths.push({ label: `${longestDimension}px`, value: longestDimension });
  }

  const [width, setWidth] = React.useState(widths[0]?.value ?? 3000);

  const thumbId = item.thumbnail ? item.thumbnail[0].id : "";
  const embedHTMLStringArray = thumbId?.split("/");
  const isValidStringArray =
    embedHTMLStringArray?.length && embedHTMLStringArray.length > 0;

  if (isValidStringArray) {
    embedHTMLStringArray[7] = toSizeParam(width);
    embedHTMLStringArray[9] = `${color}.jpg`;
  }

  const embedHTMLString = `<img src="${embedHTMLStringArray?.join(
    "/",
  )}" alt="Northwestern Libraries Digital Collections Fileset image for ${
    isValidStringArray ? embedHTMLStringArray[5] : ""
  }" />`;

  const handleDownloadClick = async (
    e: React.SyntheticEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    const downloadFilename =
      item.label?.none && item.label.none.length > 0
        ? item.label.none[0].replace(/\.[^/.]+$/, "")
        : "nul_fileset";

    const infoResponse = getInfoResponse(item);
    const downloadSize = longestDimension
      ? Math.min(3000, longestDimension)
      : 3000;
    const imageUrl = `${infoResponse}/full/${toSizeParam(downloadSize)}/0/default.jpg`;
    const response = await makeBlob(imageUrl, { credentials: "include" });

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
              <StyledCopyText onClick={handleDownloadClick}>
                Download JPG
              </StyledCopyText>
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
