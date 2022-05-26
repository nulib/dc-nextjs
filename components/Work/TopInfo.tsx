import {
  ActionButtons,
  MetadataWrapper,
  TopInfoWrapper,
} from "@/components//Work/TopInfo.styled";
import { Button } from "@nulib/design-system";
import Card from "@/components/Shared/Card";
import { WorkShape } from "@/types/components/works";

interface TopInfoProps {
  work: WorkShape;
}
const WorkTopInfo: React.FC<TopInfoProps> = ({ work }) => {
  if (!work) return null;

  const { descriptions, title } = work;
  return (
    <TopInfoWrapper>
      <div data-testid="work-top-info-wrapper">
        <h1>{title}</h1>
        {descriptions.length === 0 && <p>No description exists</p>}
        {descriptions.map((d) => (
          <p key={d}>{d}</p>
        ))}
        <ActionButtons>
          <Button>Find this item</Button>
          <Button>Cite this item</Button>
          <Button>Download and share</Button>
        </ActionButtons>
        <MetadataWrapper>
          <p data-testid="metadata">Metadata displays here</p>
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
