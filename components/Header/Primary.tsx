import { Primary, PrimaryInner } from "@/components/Header/Header.styled";
import Container from "../Container";
import Heading from "@/components/Heading/Heading";
import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import Search from "@/components/Search/Search";
import { useState } from "react";

const HeaderPrimary: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false);

  const handleIsSearchActive = (status: boolean) => {
    setSearchActive(status);
  };

  return (
    <Primary
      data-search-active={searchActive}
      data-testid="header-primary-ui-component"
    >
      <Container>
        <Heading as="span">Northwestern</Heading>
        <PrimaryInner>
          <Search isSearchActive={handleIsSearchActive} />
          <Nav>
            <Link href="/collections">Browse Collections</Link>
          </Nav>
        </PrimaryInner>
      </Container>
    </Primary>
  );
};

export default HeaderPrimary;
