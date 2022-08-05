import RelatedItems from "@/components/Shared/RelatedItems";
import { getRelatedCollections } from "@/lib/iiif/collection-helpers";
import { sampleWork2 } from "@/mocks/sample-work2";

const CollectionTabsExplore = () => {
  const stubRelated = getRelatedCollections(sampleWork2);
  return (
    <RelatedItems collections={stubRelated} title="Stub Related Content" />
  );
};

export default CollectionTabsExplore;
