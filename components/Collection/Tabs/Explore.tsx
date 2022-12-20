import { useEffect, useState } from "react";
import type { GetTopMetadataAggsReturn } from "@/lib/collection-helpers";
import RelatedItems from "@/components/Shared/RelatedItems";

interface CollectionTabsExploreProps {
  collectionId: string;
  description?: string;
  topMetadata: GetTopMetadataAggsReturn[] | [];
}

const url = process.env.NEXT_PUBLIC_DCAPI_ENDPOINT;

const CollectionTabsExplore: React.FC<CollectionTabsExploreProps> = ({
  collectionId,
  topMetadata,
}) => {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    /**
     * In the future we could  support multiple metadata fields, but for
     * now we'll just assume passing in 3 Subject collections to Bloom
     */
    const subject = topMetadata[0];

    setUrls(
      subject.value.map((subjectValue) => {
        const str = `${url}/search?query=collection.id:"${collectionId}" AND ${
          subject.field
        }:"${subjectValue}"&collectionLabel=${subjectValue}&collectionSummary=${""}&as=iiif`;
        return str;
      })
    );
  }, [collectionId, topMetadata]);

  return (
    <div data-testid="explore-wrapper">
      {urls.length > 0 && (
        <RelatedItems collectionUris={urls} title="Top Subjects" />
      )}
    </div>
  );
};

export default CollectionTabsExplore;
