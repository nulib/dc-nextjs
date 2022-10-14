import { Description } from "@/components/Collection/Collection.styled";
import ReadMore from "@/components/Shared/ReadMore";
import RelatedItems from "@/components/Shared/RelatedItems";
import { getRelatedCollections } from "@/lib/iiif/collection-helpers";
import { sampleWork2 } from "@/mocks/sample-work2";
interface CollectionTabsExploreProps {
  description?: string;
}

const CollectionTabsExplore: React.FC<CollectionTabsExploreProps> = ({
  description,
}) => {
  const stubRelated = getRelatedCollections(sampleWork2);
  return (
    <>
      {description && (
        <Description>
          <ReadMore text={description} words={55} />
        </Description>
      )}

      <RelatedItems collections={stubRelated} title="Explore Collection" />
    </>
  );
};

export default CollectionTabsExplore;
