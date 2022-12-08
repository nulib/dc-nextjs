import {
  HelperStyled,
  JumpItem,
  SearchJumpToStyled,
} from "@/components/Search/JumpTo.styled";
import { IconReturnDownBack } from "@/components/Shared/SVG/Icons";
import Link from "next/link";
import { useRouter } from "next/router";

const SearchJumpTo = ({ searchValue }: { searchValue: string }) => {
  const router = useRouter();

  return (
    <SearchJumpToStyled data-testid="jump-to-wrapper" role="listbox">
      <JumpItem role="option">
        <Link
          href={{
            pathname: "/search",
            query: {
              collection: router.query.id,
              q: searchValue,
            },
          }}
        >
          <a tabIndex={0} data-testid="helper-anchor-collection">
            {searchValue} <Helper label="In this Collection" />
          </a>
        </Link>
      </JumpItem>
      <JumpItem role="option">
        <Link
          href={{
            pathname: "/search",
            query: {
              q: searchValue,
            },
          }}
        >
          <a tabIndex={0} data-testid="helper-anchor-all">
            {searchValue} <Helper label="All Digital Collections" />
          </a>
        </Link>
      </JumpItem>
    </SearchJumpToStyled>
  );
};

const Helper: React.FC<{ label: string }> = ({ label }) => {
  return (
    <HelperStyled data-testid="helper">
      <span>{label}</span> <IconReturnDownBack />
    </HelperStyled>
  );
};

export default SearchJumpTo;
