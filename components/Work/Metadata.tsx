import { Metadata as CloverMetadata } from "@nulib/clover";
import styles from "@/components/Work/Metadata.module.css";
import { DC_URL } from "@/lib/constants/endpoints";
import Link from "next/link";
import { InternationalString, MetadataItem } from "@iiif/presentation-3";
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
    <div className={styles.linkItemStyled}>
      {searchParam ? (
        <Link href={searchUrl.toString()}>{value}</Link>
      ) : (
        <>
          <span dangerouslySetInnerHTML={{ __html: value }} />
        </>
      )}
    </div>
  );
};
const allStrings = (value?: InternationalString | null) =>
  value ? Object.values(value).flat() : [];

// Clover 4 replaces 3.x's `customValueContent` label matching with a
// `renderValue` callback; returning undefined falls back to Clover's rendering.
const renderValue = (item: MetadataItem) => {
  const labels = allStrings(item.label);
  const match = WORK_METADATA_LABELS.find(({ label }) =>
    labels.includes(label),
  );
  if (!match) return undefined;
  return (
    <>
      {allStrings(item.value).map((value, index) => (
        <ValueAsListItem
          key={`${value}-${index}`}
          searchParam={match.searchParam}
          value={value}
        />
      ))}
    </>
  );
};

const WorkMetadata: React.FC<WorkMetadataProps> = ({ metadata }) => {
  return (
    <CloverMetadata
      renderValue={renderValue}
      data-testid="metadata"
      value={metadata}
      className={styles.metadataStyled}
    />
  );
};
export default WorkMetadata;
