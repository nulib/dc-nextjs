import { DCAPI_ENDPOINT, DC_URL } from "@/lib/constants/endpoints";
import { GenericAggsReturn, sortAggsByKey } from "@/lib/collection-helpers";

import { Collection } from "@nulib/dcapi-types";
import ExpandableList from "@/components/Shared/ExpandableList";
import Heading from "@/components/Heading/Heading";
import { OrganizationStyled } from "@/components/Collection/Tabs/Organization.styled";
import SliderWrapper from "@/components/Clover/SliderWrapper";
import { appendHybridSearchParams } from "@/lib/chat-helpers";
import { pluralize } from "@/lib/utils/count-helpers";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";

interface CollectionTabsOrganizationProps {
  collection: Collection;
  series: GenericAggsReturn[];
}

const escapeDoubleQuotes = (key: string) => key.replaceAll(`"`, `\\"`);

const CollectionTabsOrganization: React.FC<CollectionTabsOrganizationProps> = ({
  collection,
  series,
}) => {
  const { isChecked: isAI } = useGenerativeAISearchToggle();

  const list = sortAggsByKey(series);

  // creates new API endpoint string that has a trailing
  // slash and is path friendly for a URL constructor
  const dcApiEndpoint = `${DCAPI_ENDPOINT}/`;

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

          const collectionId = new URL("search", dcApiEndpoint);
          collectionId.searchParams.append(
            "query",
            `series:"${escapeDoubleQuotes(key)}"`,
          );
          collectionId.searchParams.append("collectionLabel", key);
          collectionId.searchParams.append("collectionSummary", summary);
          collectionId.searchParams.append("as", "iiif");

          const value = `series-${index}`;
          const title = entry.key;
          const indicator = pluralize("Item", entry.doc_count);

          const searchUrl = new URL("/search", DC_URL);
          searchUrl.searchParams.append("collection", collection.title);
          searchUrl.searchParams.append("series", key);

          if (isAI) appendHybridSearchParams(searchUrl, key);

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
