import { GenericAggsReturn, sortAggsByKey } from "@/lib/collection-helpers";

import BloomIIIFWrapper from "@/components/Clover/SliderWrapper";
import ExpandableList from "@/components/Shared/ExpandableList";
import Heading from "@/components/Heading/Heading";
import { OrganizationStyled } from "@/components/Collection/Tabs/Organization.styled";
import { pluralize } from "@/lib/utils/count-helpers";

interface CollectionTabsOrganizationProps {
  series: GenericAggsReturn[];
}

const url = process.env.NEXT_PUBLIC_DCAPI_ENDPOINT;

const CollectionTabsOrganization: React.FC<CollectionTabsOrganizationProps> = ({
  series,
}) => {
  const list = sortAggsByKey(series);

  return (
    <OrganizationStyled data-testid="organization-wrapper">
      <Heading as="h2" css={{ "@sm": { textAlign: "center" } }}>
        Explore Series
      </Heading>
      <ExpandableList>
        {list.map((entry, index) => {
          const { key, doc_count } = entry;
          const summary =
            doc_count > 1 ? `${doc_count} Items` : `${doc_count}  Item`;

          const sanitizedKey = key.replace(/&/g, "%26");
          const collectionId = `${url}/search?query=series:"${sanitizedKey}"&collectionLabel=${sanitizedKey}&collectionSummary=${summary}&as=iiif`;
          const value = `series-${index}`;
          const title = entry.key;
          const indicator = pluralize("Item", entry.doc_count);

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
    </OrganizationStyled>
  );
};

export default CollectionTabsOrganization;
