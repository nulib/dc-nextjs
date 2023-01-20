import { ApiResponseBucket } from "@/types/api/response";
import { GroupedList } from "@/components/Collection/Tabs/Metadata.styled";
import Heading from "@/components/Heading/Heading";
import React from "react";
import { formatNumber } from "@/lib/utils/count-helpers";
import { useRouter } from "next/router";

interface CollectionTabsMetadataProps {
  metadata: ApiResponseBucket[];
}
interface Groups {
  [key: string]: ApiResponseBucket[];
}

const CollectionTabsMetadata: React.FC<CollectionTabsMetadataProps> = ({
  metadata,
}) => {
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
    router.push({ pathname: "/search", query: { subject: [key] } });
  };

  return (
    <div>
      <Heading as="h2">All Subjects</Heading>
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
    </div>
  );
};

export default CollectionTabsMetadata;
