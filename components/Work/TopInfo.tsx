import {
  ActionButtons,
  TopInfoCollection,
  TopInfoContent,
  TopInfoWrapper,
} from "@/components//Work/TopInfo.styled";
import {
  Label,
  RequiredStatement,
  Summary,
} from "@samvera/clover-iiif/primitives";
import React, { MouseEvent } from "react";
import { Button } from "@nulib/design-system";

import Card from "@/components/Shared/Card";
import { DefinitionListWrapper } from "@/components/Shared/DefinitionList.styled";
import Expand from "@/components/Shared/Expand/Expand";
import { Manifest } from "@iiif/presentation-3";
import { type Work } from "@nulib/dcapi-types";
import WorkActionsDialog from "@/components/Work/ActionsDialog/ActionsDialog";
import WorkCount from "@/components/Shared/WorkCount/WorkCount";
import WorkMetadata from "@/components/Work/Metadata";
import { type WorkTypeCountMap } from "@/lib/collection-helpers";

interface TopInfoProps {
  collectionWorkTypeCounts?: WorkTypeCountMap | null;
  manifest?: Manifest;
  work: Work;
}

export interface ActionsDialog {
  activeDialog: "CITE" | "DOWNLOAD" | "FIND" | undefined;
}

const WorkTopInfo: React.FC<TopInfoProps> = ({
  collectionWorkTypeCounts,
  manifest,
  work,
}) => {
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

  return (
    <TopInfoWrapper>
      <header>
        <Label label={manifest.label} as="h1" data-testid="title" />
        {manifest?.summary && (
          <Summary summary={manifest.summary} as="p" data-testid="summary" />
        )}
        <ActionButtons>
          <Button
            name="find"
            onClick={handleActionsButtonClick}
            isLowercase
            isPrimary
          >
            Find this item
          </Button>
          <Button
            name="cite"
            onClick={handleActionsButtonClick}
            isLowercase
            isPrimary
          >
            Cite this item
          </Button>
          <Button
            name="download"
            onClick={handleActionsButtonClick}
            isLowercase
            isPrimary
          >
            Download and share
          </Button>
        </ActionButtons>

        <WorkActionsDialog
          actionsDialog={actionsDialog}
          close={() => setActionsDialog({ activeDialog: undefined })}
        />
      </header>
      <TopInfoContent>
        <Expand initialHeight={900} buttonText="Show More">
          <div data-testid="work-top-info-wrapper">
            <DefinitionListWrapper>
              {manifest?.metadata && (
                <WorkMetadata metadata={manifest.metadata} />
              )}
              {manifest?.requiredStatement && (
                <RequiredStatement
                  customValueDelimiter="<br /><br />"
                  requiredStatement={manifest.requiredStatement}
                />
              )}
            </DefinitionListWrapper>
          </div>
        </Expand>

        <TopInfoCollection>
          {/* <Heading as="h2">Part of {work.collection?.title}</Heading> */}
          <Card
            title={work.collection?.title || ""}
            description={work.collection?.description}
            href={`/collections/${work.collection?.id}`}
            imageUrl={`${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/collections/${work.collection?.id}/thumbnail?aspect=square `}
            supplementalInfo={<WorkCount {...buildWorkCounts()} />}
          />
        </TopInfoCollection>
      </TopInfoContent>
    </TopInfoWrapper>
  );
};

export default WorkTopInfo;
