import type { CSSProperties } from "react";
import simpleSelectStyles from "@/components/Shared/SimpleSelect.module.css";
import downloadAndShareStyles from "@/components/Work/ActionsDialog/DownloadAndShare/DownloadAndShare.module.css";
import Announcement from "@/components/Shared/Announcement";
import CopyText from "@/components/Shared/CopyText";
import Heading from "@/components/Heading/Heading";
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
    ? `<iframe src="${window.location.origin}/embedded-viewer/${encodeURIComponent(encodeSearchParams())}" title="${work?.title?.replaceAll(`"`, `&quot;`) || work.accession_number}" width="100%" height="800"></iframe>`
    : "";
  return (
    <section>
      <Heading as="h3">Embed Viewer</Heading>
      {showEmbedWarning && <Announcement>{embedWarningMessage}</Announcement>}
      {!showEmbedWarning && (
        <div className={downloadAndShareStyles.embedViewer}>
          <pre data-testid="embed-html">
            {embedViewerHTML || "Error creating embed viewer HTML"}
          </pre>

          <p>Preview:</p>
          <div
            data-testid="preview-embed-viewer"
            className={downloadAndShareStyles.embedLayoutPreview}
          >
            <div className={downloadAndShareStyles.embedLayoutPreviewTitle}>
              <div data-testid="preview-title">
                {showTitle ? work.title || work.accession_number : ""}
              </div>
              <span></span>
            </div>

            <div className={downloadAndShareStyles.embedLayoutPreviewContent}>
              <span
                style={
                  {
                    "--embed-thumbnail": `url(${JSON.stringify(work.thumbnail)})`,
                  } as CSSProperties
                }
              ></span>
              {infoPanelDefaultOpen && (
                <div
                  data-testid="preview-info-panel"
                  className={downloadAndShareStyles.embedLayoutPreviewInfoPanel}
                >
                  Information Panel
                </div>
              )}
            </div>
          </div>

          <div className={downloadAndShareStyles.embedHTMLActionRow}>
            <CopyText textPrompt="Copy" textToCopy={embedViewerHTML} />
            <select
              name="show-title"
              onChange={(e) =>
                setShowTitle(e.target.value === "true" ? true : false)
              }
              className={simpleSelectStyles.simpleSelect}
            >
              {showTitleOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              name="show-info-panel"
              onChange={handleShowInfoPanelChange}
              className={simpleSelectStyles.simpleSelect}
            >
              {showInfoPanelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </section>
  );
};
export default EmbedViewer;
