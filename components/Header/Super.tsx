import { IconClear, IconMenu } from "../Shared/SVG/Icons";
import {
  Login,
  Logout,
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
import { defaultAIState } from "@/hooks/useGenerativeAISearchToggle";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { query } = router;

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [ai, setAI] = useLocalStorage("ai", defaultAIState);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const userAuthContext = React.useContext(UserContext);
  const handleMenu = () => setIsExpanded(!isExpanded);

  const handleLogout = () => {
    // reset AI state and remove query param
    setAI(defaultAIState);
    delete query?.ai;
    router.push(router.pathname, { query });

    // logout
    window.location.href = `${DCAPI_ENDPOINT}/auth/logout`;
  };

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
              <Login onClick={userAuthContext.openSignInModal}>Sign in</Login>
            )}
            {userAuthContext?.user?.isLoggedIn && (
              <>
                <User>{userAuthContext.user.name}</User>
                <Logout onClick={handleLogout}>Logout</Logout>
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
