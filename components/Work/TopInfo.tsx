import definitionListStyles from "@/components/Shared/DefinitionList.module.css";
import shareStyles from "@/components/Shared/IIIF/Share.module.css";
import topInfoStyles from "@/components/Work/TopInfo.module.css";
import IIIFShare from "../Shared/IIIF/Share";
import {
  Label,
  RequiredStatement,
  Summary,
} from "@samvera/clover-iiif/primitives";
import React, { MouseEvent } from "react";
import { Button } from "@/components/Shared/Button/Button";
import Card from "@/components/Shared/Card";
import Expand from "@/components/Shared/Expand/Expand";
import Icon from "../Shared/Icon";
import { IconShare } from "../Shared/SVG/Icons";
import { Manifest } from "@iiif/presentation-3";
import WorkAIProvenance from "@/components/Work/AIProvenance";
import WorkActionsDialog from "@/components/Work/ActionsDialog/ActionsDialog";
import WorkCount from "@/components/Shared/WorkCount/WorkCount";
import WorkMetadata from "@/components/Work/Metadata";
import type { WorkTypeCountMap } from "@/lib/collection-helpers";
import type { WorkWithAIProvenance } from "@/types/api/ai-provenance";
import { useWorkState } from "@/context/work-context";
interface TopInfoProps {
  collectionWorkTypeCounts?: WorkTypeCountMap | null;
  manifest?: Manifest;
  work: WorkWithAIProvenance;
}
export interface ActionsDialog {
  activeDialog: "CITE" | "DOWNLOAD" | "FIND" | undefined;
}
const WorkTopInfo: React.FC<TopInfoProps> = ({
  collectionWorkTypeCounts,
  manifest,
  work,
}) => {
  const {
    workState: { contentState },
  } = useWorkState();
  const [actionsDialog, setActionsDialog] = React.useState<ActionsDialog>({
    activeDialog: undefined,
  });
  if (!work) return null;
  if (!manifest) return <p>Error grabbing manifest</p>;
  const handleActionsButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    switch (button.name) {
      case "cite":
        setActionsDialog({ activeDialog: "CITE" });
        break;
      case "find":
        setActionsDialog({ activeDialog: "FIND" });
        break;
      case "download":
        setActionsDialog({ activeDialog: "DOWNLOAD" });
        break;
      default:
        break;
    }
  };
  function buildWorkCounts() {
    if (!collectionWorkTypeCounts) return "";
    const { totalAudio, totalImage, totalVideo } = collectionWorkTypeCounts;
    return { audio: totalAudio, image: totalImage, video: totalVideo };
  }
  const contentStateUrl = new URL(window.location.href);
  contentStateUrl.pathname = `/items/${work.id}`;
  if (contentState)
    contentStateUrl.searchParams.set("iiif-content", contentState.encoded);
  return (
    <section className={topInfoStyles.topInfoWrapper}>
      <header>
        <div className={topInfoStyles.topInfoHeaderContent}>
          <div>
            <Label label={manifest.label} as="h1" data-testid="title" />
            {manifest?.summary && (
              <Summary
                summary={manifest.summary}
                as="p"
                data-testid="summary"
              />
            )}
          </div>
          <div>
            <div className={shareStyles.styledIIIFShare}>
              <button
                name="download"
                onClick={handleActionsButtonClick}
                className={topInfoStyles.override0}
              >
                <Icon>
                  <IconShare />
                </Icon>
                Share
              </button>
            </div>
            <IIIFShare uri={manifest.id} />
          </div>
        </div>

        <div className={topInfoStyles.actionButtons}>
          <Button
            name="find"
            onClick={handleActionsButtonClick}
            textCase="normal"
            variant="primary"
          >
            Find this item
          </Button>
          <Button
            name="cite"
            onClick={handleActionsButtonClick}
            textCase="normal"
            variant="primary"
          >
            Cite this item
          </Button>
          <Button
            name="download"
            onClick={handleActionsButtonClick}
            textCase="normal"
            variant="primary"
          >
            Download and share
          </Button>
        </div>

        <WorkActionsDialog
          actionsDialog={actionsDialog}
          close={() => setActionsDialog({ activeDialog: undefined })}
        />
      </header>
      <div className={topInfoStyles.topInfoContent}>
        <div className={topInfoStyles.topInfoMetadata}>
          <WorkAIProvenance work={work} />
          <Expand initialHeight={900} buttonText="Show More">
            <div data-testid="work-top-info-wrapper">
              <div className={definitionListStyles.definitionListWrapper}>
                {manifest?.metadata && (
                  <WorkMetadata metadata={manifest.metadata} />
                )}
                {manifest?.requiredStatement && (
                  <RequiredStatement
                    customValueDelimiter="<br /><br />"
                    requiredStatement={manifest.requiredStatement}
                  />
                )}
              </div>
            </div>
          </Expand>
        </div>

        <div className={topInfoStyles.topInfoCollection}>
          <Card
            title={work.collection?.title || ""}
            description={work.collection?.description}
            href={`/collections/${work.collection?.id}`}
            imageUrl={`${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/collections/${work.collection?.id}/thumbnail?aspect=square `}
            supplementalInfo={<WorkCount {...buildWorkCounts()} />}
          />
        </div>
      </div>
    </section>
  );
};
export default WorkTopInfo;
