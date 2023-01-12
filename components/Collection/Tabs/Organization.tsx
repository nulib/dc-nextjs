import BloomIIIFWrapper from "@/components/BloomWrapper";
import ExpandableList from "@/components/Shared/ExpandableList";
import { GenericAggsReturn } from "@/lib/collection-helpers";
import Heading from "@/components/Heading/Heading";

interface CollectionTabsOrganizationProps {
  series: GenericAggsReturn[];
}

const url = process.env.NEXT_PUBLIC_DCAPI_ENDPOINT;

const CollectionTabsOrganization: React.FC<CollectionTabsOrganizationProps> = ({
  series,
}) => {
  return (
    <div data-testid="organization-wrapper">
      <section>
        <Heading as="h2">Explore Series</Heading>
        <ExpandableList>
          {series.map((entry, index) => {
            const { key, doc_count } = entry;
            const summary =
              doc_count > 1 ? `${doc_count} Items` : `${doc_count}  Item`;

            const sanitizedKey = key.replace(/&/g, "%26");
            const collectionId = `${url}/search?query=series:"${sanitizedKey}"&collectionLabel=${sanitizedKey}&collectionSummary=${summary}&as=iiif`;
            const value = `series-${index}`;
            const title = entry.key;
            const indicator = `${entry.doc_count} Items`;

            return (
              <ExpandableList.Item
                indicator={indicator}
                title={title}
                value={value}
                key={value}
              >
                <BloomIIIFWrapper collectionId={collectionId} />
              </ExpandableList.Item>
            );
          })}
        </ExpandableList>
      </section>
    </div>
  );
};

export default CollectionTabsOrganization;
