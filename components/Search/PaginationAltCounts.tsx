import paginationAltCountsStyles from "@/components/Search/PaginationAltCounts.module.css";
import paginationStyles from "@/components/Search/Pagination.module.css";
import { Button } from "@/components/Shared/Button/Button";
import { Pagination as PaginationShape } from "@/types/api/response";
import { pluralize } from "@/lib/utils/count-helpers";
import { useRouter } from "next/router";
interface PaginationProps {
  pagination: PaginationShape;
  showResultCounts?: boolean;
}
const PaginationAltCounts: React.FC<PaginationProps> = ({
  pagination,
  showResultCounts = true,
}) => {
  const { current_page, limit, total_hits, total_pages } = pagination;
  const router = useRouter();
  const pages = [];
  for (let i = 0; i < total_pages; i++) {
    pages.push(i + 1);
  }
  const handleNavClick = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };
  const startCount = current_page * limit - (limit - 1);
  const endCount =
    limit * current_page > total_hits ? total_hits : limit * current_page;
  return (
    <nav
      data-testid="pagination-alt-counts"
      className={[
        paginationStyles.paginationStyled,
        paginationAltCountsStyles.override0,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showResultCounts && (
        <div data-testid="results" className={paginationStyles.results}>
          Showing <span>{startCount}</span> to <span>{endCount}</span> of{" "}
          {pluralize("result", total_hits)}
        </div>
      )}

      <div className={paginationStyles.navWrapper}>
        {current_page > 2 && (
          <Button
            variant="text"
            textCase="normal"
            onClick={() => handleNavClick(1)}
            className={paginationAltCountsStyles.override1}
          >
            Start
          </Button>
        )}

        {current_page !== 1 && (
          <Button
            textCase="normal"
            onClick={() => handleNavClick(current_page - 1)}
          >
            Previous
          </Button>
        )}

        {current_page !== total_pages && (
          <Button
            textCase="normal"
            onClick={() => handleNavClick(current_page + 1)}
          >
            Next
          </Button>
        )}
      </div>
    </nav>
  );
};
export default PaginationAltCounts;
