import { ApiResponseBucket } from "@/types/api/response";
import { Collection } from "@nulib/dcapi-types";
import { GroupedList } from "@/components/Collection/Tabs/Metadata.styled";
import Heading from "@/components/Heading/Heading";
import React from "react";
import { formatNumber } from "@/lib/utils/count-helpers";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
import { useRouter } from "next/router";

interface CollectionTabsMetadataProps {
  collection: Collection;
  metadata: ApiResponseBucket[];
}
interface Groups {
  [key: string]: ApiResponseBucket[];
}

const CollectionTabsMetadata: React.FC<CollectionTabsMetadataProps> = ({
  collection,
  metadata,
}) => {
  const { isChecked: isAI } = useGenerativeAISearchToggle();
  const router = useRouter();
  const grouped: Groups = {};

  /**
   * Make the flat list of metadata aggs into an alphabetized, grouped list
   */
  metadata.forEach((item) => {
    const letter = item.key.charAt(0);
    grouped[letter] = grouped[letter] || [];
    grouped[letter].push(item);
  });

  const handleMetadataClick = (key: string) => {
    router.push({
      pathname: "/search",
      query: {
        subject: [key],
        collection: collection.title,
        ...(isAI === true && { q: [key], tab: "results" }),
      },
    });
  };

  return (
    <>
      <Heading as="h2" css={{ "@sm": { textAlign: "center" } }}>
        All Subjects
      </Heading>
      <GroupedList>
        {Object.keys(grouped).map((letter) => (
          <li key={letter}>
            <Heading as="h3">{letter}</Heading>
            <GroupedList>
              {grouped[letter].map(({ doc_count, key }) => (
                <li key={key}>
                  <a onClick={() => handleMetadataClick(key)}>
                    {key} ({formatNumber(doc_count)})
                  </a>
                </li>
              ))}
            </GroupedList>
          </li>
        ))}
      </GroupedList>
    </>
  );
};

export default CollectionTabsMetadata;
