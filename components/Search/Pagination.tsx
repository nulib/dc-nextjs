import styles from "@/components/Search/Pagination.module.css";
import { IconArrowBack, IconArrowForward } from "@/components/Shared/SVG/Icons";
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
    <nav className={styles.paginationStyled}>
      <div data-active={!!prev_url} className={styles.leftNav}>
        <Link
          href={{
            pathname,
            query: { ...query, page: current_page - 1 },
          }}
        >
          <IconArrowBack aria-hidden="true" />
          Previous
        </Link>
      </div>
      <div className={styles.paginationLinks}>
        {pages.map((page) => (
          <Link
            key={page}
            href={{
              pathname,
              query: { ...query, page },
            }}
            legacyBehavior
          >
            <a
              data-is-current={page === current_page}
              className={styles.pageNumber}
            >
              {page}
            </a>
          </Link>
        ))}
      </div>
      <div data-active={!!next_url} className={styles.rightNav}>
        <Link
          href={{
            pathname,
            query: { ...query, page: current_page + 1 },
          }}
        >
          Next
          <IconArrowForward aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
};
