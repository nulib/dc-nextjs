import {
  ActionButtons,
  MetadataWrapper,
  TopInfoWrapper,
} from "@/components//Work/TopInfo.styled";
import {
  Label,
  Metadata,
  RequiredStatement,
  Summary,
} from "@samvera/nectar-iiif";
import { Button } from "@nulib/design-system";
import Card from "@/components/Shared/Card";
import { Manifest } from "@iiif/presentation-3";
import { WorkShape } from "@/types/components/works";

interface TopInfoProps {
  manifest?: Manifest;
  work: WorkShape;
}
const WorkTopInfo: React.FC<TopInfoProps> = ({ manifest, work }) => {
  if (!work) return null;
  if (!manifest) return <p>Error grabbing manifest</p>;

  return (
    <TopInfoWrapper>
      <div data-testid="work-top-info-wrapper">
        <Label label={manifest.label} as="h1" data-testid="title" />
        <Summary summary={manifest.summary} as="p" data-testid="summary" />
        <ActionButtons>
          <Button>Find this item</Button>
          <Button>Cite this item</Button>
          <Button>Download and share</Button>
        </ActionButtons>
        <MetadataWrapper>
          <Metadata metadata={manifest.metadata} data-testid="metadata" />
          <RequiredStatement requiredStatement={manifest.requiredStatement} />
        </MetadataWrapper>
      </div>
      <div>
        <h2>Collection</h2>
        <Card
          title={`Ima title`}
          description="Foo bar oh my"
          imageUrl={work.thumbnail}
          supplementalInfo="230 items"
        />
      </div>
    </TopInfoWrapper>
  );
};

export default WorkTopInfo;
