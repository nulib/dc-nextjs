import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import { Primary } from "@/components/Header/Header.styled";
import Search from "@/components/Search/Search";
import { useState } from "react";

const HeaderPrimary: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false);

  const handleIsSearchActive = (status: boolean) => {
    setSearchActive(status);
  };

  return (
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
  );
};

export default HeaderPrimary;
