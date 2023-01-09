import {
  LinkItemStyled,
  MetadataStyled,
} from "@/components/Work/Metadata.styled";
import { DC_URL } from "@/lib/constants/endpoints";
import { FACETS_WORK_LINK } from "@/lib/constants/works";
import Link from "next/link";
import { MetadataItem } from "@iiif/presentation-3";

interface WorkMetadataProps {
  metadata: MetadataItem[];
}

interface ValueAsSearchLinkProps {
  param: string;
  value?: string;
}

export const ValueAsSearchLink: React.FC<ValueAsSearchLinkProps> = ({
  param,
  value,
}) => {
  if (!value) return <></>;
  const search = `${DC_URL}/search?${param}=`;
  return (
    <LinkItemStyled>
      <Link href={search.concat(encodeURIComponent(value))}>
        <a>{value}</a>
      </Link>
    </LinkItemStyled>
  );
};

const WorkMetadata: React.FC<WorkMetadataProps> = ({ metadata }) => {
  const customValues = FACETS_WORK_LINK.map((value) => {
    return {
      Content: <ValueAsSearchLink param={value.param} />,
      matchingLabel: { none: [value.label] },
    };
  });

  return (
    <MetadataStyled
      customValueContent={customValues}
      customValueDelimiter=""
      data-testid="metadata"
      metadata={metadata}
    />
  );
};

export default WorkMetadata;
