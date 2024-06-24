import { IconArrowBack, IconArrowForward } from "@/components/Shared/SVG/Icons";
import {
  LeftNav,
  PageNumber,
  PaginationLinks,
  PaginationStyled,
  RightNav,
} from "@/components/Search/Pagination.styled";
import Link from "next/link";
import { Pagination as PaginationShape } from "@/types/api/response";
import { useRouter } from "next/router";

interface PaginationProps {
  pagination: PaginationShape;
}

export const Pagination: React.FC<PaginationProps> = ({ pagination }) => {
  const { current_page, next_url, prev_url, total_pages } = pagination;
  const { query, pathname } = useRouter();

  const pages = [];
  for (let i = 0; i < total_pages; i++) {
    pages.push(i + 1);
  }

  return (
    <PaginationStyled>
      <LeftNav active={!!prev_url}>
        <Link
          href={{
            pathname,
            query: { ...query, page: current_page - 1 },
          }}
        >
          <IconArrowBack aria-hidden="true" />
          Previous
        </Link>
      </LeftNav>
      <PaginationLinks>
        {pages.map((page) => (
          <Link
            key={page}
            href={{
              pathname,
              query: { ...query, page },
            }}
            legacyBehavior
          >
            <PageNumber isCurrent={page === current_page}>{page}</PageNumber>
          </Link>
        ))}
      </PaginationLinks>
      <RightNav active={!!next_url}>
        <Link
          href={{
            pathname,
            query: { ...query, page: current_page + 1 },
          }}
        >
          Next
          <IconArrowForward aria-hidden="true" />
        </Link>
      </RightNav>
    </PaginationStyled>
  );
};
