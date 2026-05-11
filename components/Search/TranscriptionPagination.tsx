import {
  NavWrapper,
  PaginationStyled,
  Results,
} from "@/components/Search/Pagination.styled";

import { Button } from "@nulib/design-system";
import { Pagination as PaginationShape } from "@/types/api/response";
import { pluralize } from "@/lib/utils/count-helpers";

interface TranscriptionPaginationProps {
  pagination: PaginationShape;
  onPageChange: (url: string) => void;
}

const getPageUrl = (queryUrl: string, page: number) => {
  const url = new URL(queryUrl);
  url.searchParams.set("page", page.toString());
  return url.toString();
};

const TranscriptionPagination: React.FC<TranscriptionPaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const {
    current_page,
    limit,
    next_url,
    offset,
    prev_url,
    query_url,
    total_pages,
    collapsed_by,
  } = pagination;

  const handleNavClick = (page: number, url?: string) => {
    onPageChange(url || getPageUrl(query_url, page));
  };

  const total_hits = collapsed_by?.total_hits || pagination.total_hits;
  const startCount = total_hits ? offset + 1 : 0;
  const endCount = offset + limit > total_hits ? total_hits : offset + limit;

  return (
    <PaginationStyled
      css={{ borderTopWidth: "1px", paddingTop: "$gr2" }}
      data-testid="transcription-pagination"
    >
      <Results data-testid="results">
        Showing <span>{startCount}</span> to <span>{endCount}</span> of{" "}
        {pluralize("matching item", total_hits)}
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
          <Button
            isLowercase
            onClick={() => handleNavClick(current_page - 1, prev_url)}
          >
            Previous
          </Button>
        )}

        {current_page !== total_pages && (
          <Button
            isLowercase
            onClick={() => handleNavClick(current_page + 1, next_url)}
          >
            Next
          </Button>
        )}
      </NavWrapper>
    </PaginationStyled>
  );
};

export default TranscriptionPagination;
