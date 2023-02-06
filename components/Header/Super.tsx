import { IconClear, IconMenu } from "../Shared/SVG/Icons";
import {
  Menu,
  MenuToggle,
  Super,
  User,
} from "@/components/Header/Header.styled";
import Container from "../Shared/Container";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import { NavResponsiveOnly } from "@/components/Nav/Nav.styled";
import { NorthwesternWordmark } from "@/components/Shared/SVG/Northwestern";
import React from "react";
import { UserContext } from "@/context/user-context";

const nav = [
  {
    href: "https://www.library.northwestern.edu/",
    label: "Libraries",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export default function HeaderSuper() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const userAuthContext = React.useContext(UserContext);

  const handleMenu = () => setIsExpanded(!isExpanded);

  return (
    <Super>
      <Container>
        <Link href="https://www.northwestern.edu/">
          {isLoaded && <NorthwesternWordmark />}
        </Link>
        <Menu isExpanded={isExpanded}>
          <NavResponsiveOnly>
            <Link href="/search">Explore Works</Link>
            <Link href="/collections">Browse Collections</Link>
          </NavResponsiveOnly>
          <Nav>
            {nav.map(({ href, label }) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
            {!userAuthContext?.user?.isLoggedIn && (
              <Link
                href={`${DCAPI_ENDPOINT}/auth/login?goto=${window.location}`}
              >
                Sign in
              </Link>
            )}
            {userAuthContext?.user?.isLoggedIn && (
              <>
                <User>{userAuthContext.user.name}</User>
                <a
                  href={`${DCAPI_ENDPOINT}/auth/logout`}
                  style={{
                    cursor: "pointer",
                    paddingLeft: "8px",
                    textDecoration: "underline",
                  }}
                >
                  Logout
                </a>
              </>
            )}
          </Nav>
        </Menu>
        <MenuToggle onClick={handleMenu}>
          {isExpanded ? <IconClear /> : <IconMenu />}
        </MenuToggle>
      </Container>
    </Super>
  );
}
