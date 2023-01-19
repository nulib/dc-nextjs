import {
  NavWrapper,
  PaginationStyled,
  Results,
} from "@/components/Search/Pagination.styled";
import { Button } from "@nulib/design-system";
import { Pagination as PaginationShape } from "@/types/api/response";
import { useRouter } from "next/router";

interface PaginationProps {
  pagination: PaginationShape;
}

const PaginationAltCounts: React.FC<PaginationProps> = ({ pagination }) => {
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
    <PaginationStyled
      css={{ borderTopWidth: "1px", paddingTop: "$gr2" }}
      data-testid="pagination-alt-counts"
    >
      <Results data-testid="results">
        Showing <span>{startCount}</span> to <span>{endCount}</span> of{" "}
        <span>{total_hits}</span> results
      </Results>

      <NavWrapper>
        {current_page > 2 && (
          <Button
            isText
            isLowercase
            onClick={() => handleNavClick(1)}
            css={{ marginRight: "$3" }}
          >
            Start
          </Button>
        )}

        {current_page !== 1 && (
          <Button isLowercase onClick={() => handleNavClick(current_page - 1)}>
            Previous
          </Button>
        )}

        {current_page !== total_pages && (
          <Button isLowercase onClick={() => handleNavClick(current_page + 1)}>
            Next
          </Button>
        )}
      </NavWrapper>
    </PaginationStyled>
  );
};

export default PaginationAltCounts;
