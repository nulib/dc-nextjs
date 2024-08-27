import { DCAPI_ENDPOINT, DC_URL } from "@/lib/constants/endpoints";
import { GenericAggsReturn, sortAggsByKey } from "@/lib/collection-helpers";

import { Collection } from "@nulib/dcapi-types";
import ExpandableList from "@/components/Shared/ExpandableList";
import Heading from "@/components/Heading/Heading";
import { OrganizationStyled } from "@/components/Collection/Tabs/Organization.styled";
import SliderWrapper from "@/components/Clover/SliderWrapper";
import { pluralize } from "@/lib/utils/count-helpers";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";

interface CollectionTabsOrganizationProps {
  collection: Collection;
  series: GenericAggsReturn[];
}

const CollectionTabsOrganization: React.FC<CollectionTabsOrganizationProps> = ({
  collection,
  series,
}) => {
  const { isChecked: isAI } = useGenerativeAISearchToggle();

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
          const collectionId = `${DCAPI_ENDPOINT}/search?query=series:"${sanitizedKey}"&collectionLabel=${sanitizedKey}&collectionSummary=${summary}&as=iiif`;
          const value = `series-${index}`;
          const title = entry.key;
          const indicator = pluralize("Item", entry.doc_count);

          const searchUrl = new URL("/search", DC_URL);
          searchUrl.searchParams.append("collection", collection.title);
          searchUrl.searchParams.append("q", `series:"${sanitizedKey}"`);

          if (isAI) searchUrl.searchParams.append("tab", "results");

          return (
            <ExpandableList.Item
              indicator={indicator}
              title={title}
              value={value}
              key={value}
            >
              <SliderWrapper
                collectionId={collectionId}
                customViewAll={searchUrl.toString()}
              />
            </ExpandableList.Item>
          );
        })}
      </ExpandableList>
    </OrganizationStyled>
  );
};

export default CollectionTabsOrganization;
