import {
  ActionHeader,
  GroupedList,
} from "@/components/Collection/Tabs/Metadata.styled";
import { ApiResponseBucket } from "@/types/api/response";
import React from "react";
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
      <ActionHeader>
        <h2>Subjects</h2>
      </ActionHeader>
      <GroupedList>
        {Object.keys(grouped).map((letter) => (
          <li key={letter}>
            <h3>{letter}</h3>
            <GroupedList>
              {grouped[letter].map(({ doc_count, key }) => (
                <li key={key}>
                  <a onClick={() => handleMetadataClick(key)}>
                    {key} ({doc_count})
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
