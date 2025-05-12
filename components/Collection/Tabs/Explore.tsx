import { DCAPI_ENDPOINT, DC_URL } from "@/lib/constants/endpoints";
import { useEffect, useState } from "react";

import { Collection } from "@nulib/dcapi-types";
import type { GetTopMetadataAggsReturn } from "@/lib/collection-helpers";
import RelatedItems from "@/components/Shared/RelatedItems";
import { WorkSliders } from "@/lib/work-helpers";
import { appendHybridSearchParams } from "@/lib/chat-helpers";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";

interface CollectionTabsExploreProps {
  collection: Collection;
  topMetadata: GetTopMetadataAggsReturn[] | [];
}

const CollectionTabsExplore: React.FC<CollectionTabsExploreProps> = ({
  collection,
  topMetadata,
}) => {
  const [subjectWorkSliders, setSubjectWorkSliders] = useState<WorkSliders[]>(
    [],
  );

  const { isChecked: isAI } = useGenerativeAISearchToggle();

  useEffect(() => {
    /**
     * In the future we could  support multiple metadata fields, but for
     * now we'll just assume passing in 3 Subject collections to the Slider
     */
    const subject = topMetadata[0];

    // Build "as=iiif" urls for each subject which will feed into the Slider
    setSubjectWorkSliders(
      subject.value.map((subjectValue) => {
        const iiifCollectionId = `${DCAPI_ENDPOINT}/search?query=collection.id:"${collection.id}" AND ${subject.field}:"${subjectValue}"&collectionLabel=${subjectValue}&collectionSummary=${""}&size=10&as=iiif`;

        const searchUrl = new URL("/search", DC_URL);
        searchUrl.searchParams.append("subject", subjectValue);
        searchUrl.searchParams.append("collection", collection.title);

        if (isAI) appendHybridSearchParams(searchUrl, subjectValue);

        return {
          iiifCollectionId,
          customViewAll: searchUrl.toString(),
        };
      }),
    );
  }, [collection.id, topMetadata]);

  return (
    <div data-testid="explore-wrapper">
      {subjectWorkSliders.length > 0 && (
        <RelatedItems collections={subjectWorkSliders} title="Top Subjects" />
      )}
    </div>
  );
};

export default CollectionTabsExplore;
