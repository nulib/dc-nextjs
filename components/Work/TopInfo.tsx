import {
  ActionButtons,
  TopInfoCollection,
  TopInfoContent,
  TopInfoHeaderContent,
  TopInfoWrapper,
} from "@/components//Work/TopInfo.styled";
import IIIFShare, { StyledIIIFShare } from "../Shared/IIIF/Share";
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
import Icon from "../Shared/Icon";
import { IconShare } from "../Shared/SVG/Icons";
import { Manifest } from "@iiif/presentation-3";
import type { Work } from "@nulib/dcapi-types";
import WorkActionsDialog from "@/components/Work/ActionsDialog/ActionsDialog";
import WorkCount from "@/components/Shared/WorkCount/WorkCount";
import WorkMetadata from "@/components/Work/Metadata";
import type { WorkTypeCountMap } from "@/lib/collection-helpers";
import { useWorkState } from "@/context/work-context";

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
    <TopInfoWrapper>
      <header>
        <TopInfoHeaderContent>
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
            <StyledIIIFShare>
              <button
                name="download"
                onClick={handleActionsButtonClick}
                style={{
                  paddingRight: "1em",
                }}
              >
                <Icon>
                  <IconShare />
                </Icon>
                Share
              </button>
            </StyledIIIFShare>
            <IIIFShare uri={manifest.id} />
          </div>
        </TopInfoHeaderContent>

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
