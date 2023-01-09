import { Primary, PrimaryInner } from "@/components/Header/Header.styled";
import { useEffect, useRef, useState } from "react";
import { AcademicN } from "@/components/Shared/SVG/Northwestern";
import Container from "@/components/Shared/Container";
import Heading from "@/components/Heading/Heading";
import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import Search from "@/components/Search/Search";
import SearchJumpTo from "@/components/Search/JumpTo";
import useElementPosition from "@/hooks/useElementPosition";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

const HeaderPrimary: React.FC = () => {
  const router = useRouter();
  const isCollectionPage = router.pathname.includes("collection");

  const [searchActive, setSearchActive] = useState<boolean>(false);

  const {
    searchDispatch,
    searchState: { searchFixed },
  } = useSearchState();

  const primaryRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useElementPosition(primaryRef);

  useEffect(
    () =>
      searchDispatch({
        searchFixed: scrollPosition > 0,
        type: "updateSearchFixed",
      }),
    [searchDispatch, scrollPosition]
  );

  const handleIsSearchActive = (status: boolean) => {
    setSearchActive(status);
  };

  return (
    <>
      <Primary
        data-search-active={searchActive}
        data-search-fixed={searchFixed}
        data-testid="header-primary-ui-component"
        ref={primaryRef}
      >
        <Container>
          <Heading as="span">
            <AcademicN />
          </Heading>
          <PrimaryInner>
            {!isCollectionPage && (
              <Search isSearchActive={handleIsSearchActive} />
            )}
            {isCollectionPage && (
              <SearchJumpTo isSearchActive={handleIsSearchActive} />
            )}
            <Nav>
              <Link href="/collections">Browse Collections</Link>
            </Nav>
          </PrimaryInner>
        </Container>
      </Primary>
    </>
  );
};

export default HeaderPrimary;
