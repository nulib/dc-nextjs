import {
  EmbedHTMLActionRow,
  EmbedLayoutPreview,
  EmbedLayoutPreviewContent,
  EmbedLayoutPreviewInfoPanel,
  EmbedLayoutPreviewTitle,
  EmbedViewer as EmbedViewerStyled,
} from "@/components/Work/ActionsDialog/DownloadAndShare/DownloadAndShare.styled";

import Announcement from "@/components/Shared/Announcement";
import CopyText from "@/components/Shared/CopyText";
import Heading from "@/components/Heading/Heading";
import SimpleSelect from "@/components/Shared/SimpleSelect.styled";
import { Work } from "@nulib/dcapi-types";
import { embedWarningMessage } from "@/components/Work/ActionsDialog/DownloadAndShare/DownloadAndShare";
import { useState } from "react";

interface EmbedViewerProps {
  manifestId: Work["iiif_manifest"];
  showEmbedWarning: boolean;
  work: Work;
}

type SelectOptionState = boolean;

const showInfoPanelOptions = [
  {
    label: "Show Info Panel: Closed",
    value: "show initially closed",
  },
  {
    label: "Show Info Panel: Open",
    value: "show initially open",
  },
];
const showTitleOptions = [
  {
    label: "Show Title",
    value: "true",
  },
  {
    label: "Hide Title",
    value: "false",
  },
];

const EmbedViewer: React.FC<EmbedViewerProps> = ({
  manifestId,
  showEmbedWarning,
  work,
}) => {
  const [infoPanelDefaultOpen, setInfoPanelDefaultOpen] =
    useState<SelectOptionState>(false);
  const [showTitle, setShowTitle] = useState<SelectOptionState>(true);

  function encodeSearchParams() {
    const params = [manifestId];
    if (infoPanelDefaultOpen)
      params.push(`informationPanelOpen=${infoPanelDefaultOpen.toString()}`);
    if (!showTitle) params.push(`showTitle=${showTitle.toString()}`);

    return params.join("&");
  }

  function handleShowInfoPanelChange(e: React.ChangeEvent<HTMLSelectElement>) {
    switch (e.target.value) {
      case "show initially open":
        setInfoPanelDefaultOpen(true);
        break;
      case "show initially closed":
        setInfoPanelDefaultOpen(false);
        break;
      default:
        break;
    }
  }

  const embedViewerHTML = manifestId
    ? `<iframe src="${
        window.location.origin
      }/embedded-viewer/${encodeURIComponent(encodeSearchParams())}" title="${
        work?.title?.replaceAll(`"`, `&quot;`) || work.accession_number
      }" width="100%" height="800"></iframe>`
    : "";

  return (
    <section>
      <Heading as="h3">Embed Viewer</Heading>
      {showEmbedWarning && <Announcement>{embedWarningMessage}</Announcement>}
      {!showEmbedWarning && (
        <EmbedViewerStyled>
          <pre data-testid="embed-html">
            {embedViewerHTML || "Error creating embed viewer HTML"}
          </pre>

          <p>Preview:</p>
          <EmbedLayoutPreview data-testid="preview-embed-viewer">
            <EmbedLayoutPreviewTitle>
              <div data-testid="preview-title">
                {showTitle ? work.title || work.accession_number : ""}
              </div>
              <span></span>
            </EmbedLayoutPreviewTitle>

            <EmbedLayoutPreviewContent>
              <span
                style={{
                  backgroundImage: `url(${work.thumbnail})`,
                }}
              ></span>
              {infoPanelDefaultOpen && (
                <EmbedLayoutPreviewInfoPanel data-testid="preview-info-panel">
                  Information Panel
                </EmbedLayoutPreviewInfoPanel>
              )}
            </EmbedLayoutPreviewContent>
          </EmbedLayoutPreview>

          <EmbedHTMLActionRow>
            <CopyText textPrompt="Copy" textToCopy={embedViewerHTML} />
            <SimpleSelect
              name="show-title"
              onChange={(e) =>
                setShowTitle(e.target.value === "true" ? true : false)
              }
            >
              {showTitleOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SimpleSelect>
            <SimpleSelect
              name="show-info-panel"
              onChange={handleShowInfoPanelChange}
            >
              {showInfoPanelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SimpleSelect>
          </EmbedHTMLActionRow>
        </EmbedViewerStyled>
      )}
    </section>
  );
};

export default EmbedViewer;
