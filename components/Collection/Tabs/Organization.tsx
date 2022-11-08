import { useEffect, useState } from "react";
import { GenericAggsReturn } from "@/lib/collection-helpers";
import RelatedItems from "@/components/Shared/RelatedItems";

interface CollectionTabsOrganizationProps {
  collectionId: string;
  series: GenericAggsReturn[];
}

const url = process.env.NEXT_PUBLIC_DCAPI_ENDPOINT;

const CollectionTabsOrganization: React.FC<CollectionTabsOrganizationProps> = ({
  collectionId,
  series,
}) => {
  const [urls, setUrls] = useState<string[]>([]);

  console.log(`series`, series);

  useEffect(() => {
    setUrls(
      series.map((value) => {
        const { key, doc_count } = value;
        const summary =
          doc_count > 1 ? `${doc_count} Items` : `${doc_count}  Item`;
        return `${url}/search?query=series:"${key}"&collectionLabel=${key}&collectionSummary=${summary}&as=iiif`;
      })
    );
  }, [collectionId, series]);

  return (
    <div data-testid="organization-wrapper">
      {urls.length > 0 && (
        <RelatedItems collectionUris={urls} title="By Series" />
      )}
    </div>
  );
};

export default CollectionTabsOrganization;
