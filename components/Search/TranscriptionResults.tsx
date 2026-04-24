import { useContext, useState } from "react";
import Link from "next/link";
import { FileSetSearchResult, Pagination } from "@/types/api/response";
import { groupByWork } from "@/lib/utils/fileset-helpers";
import { IconLock } from "@/components/Shared/SVG/Icons";
import {
  FileSetLabel,
  FileSetRow,
  SnippetText,
  ThumbnailImage,
  ThumbnailLink,
  ThumbnailLQIP,
  ThumbnailWrapper,
  WorkFilesets,
  WorkGroup,
  WorkHeader,
  Wrapper,
} from "@/components/Search/TranscriptionResults.styled";
import { UserContext } from "@/context/user-context";
import Figure from "../Figure/Figure";
import TranscriptionPagination from "@/components/Search/TranscriptionPagination";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";

interface TranscriptionResultsProps {
  results: FileSetSearchResult[];
  pagination: Pagination;
  searchTerm: string;
  onPageChange: (url: string) => void;
}

function getSnippet(text: string, term: string, maxLength = 200): string {
  const idx = text.toLowerCase().indexOf(term.toLowerCase());
  if (idx === -1)
    return text.slice(0, maxLength) + (text.length > maxLength ? "…" : "");
  const start = Math.max(0, idx - 60);
  const end = Math.min(text.length, idx + term.length + 140);
  return (
    (start > 0 ? "…" : "") +
    text.slice(start, end) +
    (end < text.length ? "…" : "")
  );
}

function highlightTerm(text: string, term: string): React.ReactNode {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    ),
  );
}

const FileSetThumbnail: React.FC<{ src: string; restricted: boolean }> = ({
  src,
  restricted,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <ThumbnailWrapper>
      <ThumbnailLQIP src={`${src}?size=3`} alt="" />
      <ThumbnailImage
        src={src}
        alt=""
        isLoaded={isLoaded}
        onLoad={() => setIsLoaded(true)}
      />
      {restricted && <IconLock aria-hidden="true" />}
    </ThumbnailWrapper>
  );
};

const TranscriptionResults: React.FC<TranscriptionResultsProps> = ({
  results,
  pagination,
  searchTerm,
  onPageChange,
}) => {
  const groups = groupByWork(results);
  const { user } = useContext(UserContext);
  const isRestricted = (visibility: string) =>
    !(user?.scopes?.includes(`read:${visibility}`) ?? false);

  return (
    <Wrapper>
      {groups.map((group) => (
        <WorkGroup key={group.work_id}>
          <WorkHeader>
            <Link
              href={`/items/${group.work_id}?q=${encodeURIComponent(searchTerm)}`}
            >
              <Figure
                data={{
                  aspectRatio: 1,
                  isRestricted: isRestricted(
                    group.fileSets[0]?.visibility ?? "",
                  ),
                  src: `${DCAPI_ENDPOINT}/works/${group.work_id}/thumbnail`,
                  supplementalInfo:
                    group.fileSets.length > 1
                      ? `${group.fileSets.length} matches`
                      : "1 match",
                  title: group.work_title || "No Title",
                }}
              />
            </Link>
          </WorkHeader>

          <WorkFilesets>
            {group.fileSets.map((fs) => {
              const snippet = getSnippet(fs.annotation.content, searchTerm);
              const href = `/items/${group.work_id}?q=${encodeURIComponent(searchTerm)}&canvas=${fs.id}&label=${encodeURIComponent(fs.label)}&snippet=${encodeURIComponent(snippet)}`;
              const restricted = isRestricted(fs.visibility);
              const thumbnailUrl = `${DCAPI_ENDPOINT}/file-sets/${fs.id}/thumbnail`;

              return (
                <FileSetRow key={fs.id}>
                  <ThumbnailLink href={href} tabIndex={-1} aria-hidden="true">
                    <FileSetThumbnail
                      src={thumbnailUrl}
                      restricted={restricted}
                    />
                  </ThumbnailLink>
                  <FileSetLabel>
                    <Link href={href}>{fs.label}</Link>
                  </FileSetLabel>
                  <SnippetText>
                    {highlightTerm(snippet, searchTerm)}
                  </SnippetText>
                </FileSetRow>
              );
            })}
          </WorkFilesets>
        </WorkGroup>
      ))}

      <TranscriptionPagination
        pagination={pagination}
        onPageChange={onPageChange}
      />
    </Wrapper>
  );
};

export default TranscriptionResults;
