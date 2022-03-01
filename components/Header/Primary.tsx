import { useState } from "react";
import Sticky from "react-sticky-el";
import { Primary } from "components/Header/Header.styled";
import Nav from "components/Nav/Nav";
import Search from "components/Search/Search";
import Link from "next/link";

const HeaderPrimary: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false);

  const handleIsSearchActive = (status: boolean) => {
    setSearchActive(status);
  };

  return (
    <Sticky stickyClassName="sticky-primary">
      <Primary data-search-active={searchActive}>
        <span>Northwestern</span>
        <div>
          <Nav>
            <a>Items</a>
            <Link href="/collection/list">Collections</Link>
          </Nav>
          <Search isSearchActive={handleIsSearchActive} />
        </div>
      </Primary>
    </Sticky>
  );
};

export default HeaderPrimary;
