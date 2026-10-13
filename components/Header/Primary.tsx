import styles from "@/components/Header/Header.module.css";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/Shared/Container";
import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import Search from "@/components/Search/Search";
import useElementPosition from "@/hooks/useElementPosition";
import { useLayoutState } from "@/context/layout-context";
const HeaderPrimary: React.FC = () => {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const {
    layoutDispatch,
    layoutState: { searchFixed },
  } = useLayoutState();
  const primaryRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useElementPosition(primaryRef);
  useEffect(
    () =>
      layoutDispatch({
        searchFixed: scrollPosition > 0,
        type: "updateSearchFixed",
      }),
    [layoutDispatch, scrollPosition],
  );
  const handleIsSearchActive = (status: boolean) => {
    setSearchActive(status);
  };
  return (
    <div
      data-search-active={searchActive}
      data-search-fixed={searchFixed}
      data-testid="header-primary-ui-component"
      ref={primaryRef}
      className={styles.primary}
    >
      <Container>
        <div className={styles.primaryInner}>
          <Search isSearchActive={handleIsSearchActive} />
          <Nav>
            <Link href="/collections">Browse Collections</Link>
          </Nav>
        </div>
      </Container>
    </div>
  );
};
export default HeaderPrimary;
