import {
  LinkItemStyled,
  MetadataStyled,
} from "@/components/Work/Metadata.styled";

import { DC_URL } from "@/lib/constants/endpoints";
import Link from "next/link";
import { MetadataItem } from "@iiif/presentation-3";
import { WORK_METADATA_LABELS } from "@/lib/constants/works";
import { appendHybridSearchParams } from "@/lib/chat-helpers";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";

interface WorkMetadataProps {
  metadata: MetadataItem[];
}

interface ValueAsListItemProps {
  searchParam?: string;
  value?: string;
}

export const ValueAsListItem: React.FC<ValueAsListItemProps> = ({
  searchParam,
  value,
}) => {
  if (!value) return <></>;

  const { isChecked } = useGenerativeAISearchToggle();
  const searchUrl = new URL("/search", DC_URL);

  if (searchParam) {
    searchUrl.searchParams.append(searchParam, value);

    if (isChecked) appendHybridSearchParams(searchUrl, value);
  }

  return (
    <LinkItemStyled>
      {searchParam ? (
        <Link href={searchUrl.toString()}>{value}</Link>
      ) : (
        <>
          <span dangerouslySetInnerHTML={{ __html: value }} />
        </>
      )}
    </LinkItemStyled>
  );
};

const WorkMetadata: React.FC<WorkMetadataProps> = ({ metadata }) => {
  const formattedValues = WORK_METADATA_LABELS.map((value) => {
    return {
      Content: <ValueAsListItem searchParam={value.searchParam} />,
      matchingLabel: { none: [value.label] },
    };
  });

  return (
    <MetadataStyled
      customValueContent={formattedValues}
      customValueDelimiter=""
      data-testid="metadata"
      metadata={metadata}
    />
  );
};

export default WorkMetadata;
