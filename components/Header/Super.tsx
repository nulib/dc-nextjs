import navStyles from "@/components/Nav/Nav.module.css";
import headerStyles from "@/components/Header/Header.module.css";
import { IconClear, IconMenu } from "../Shared/SVG/Icons";
import Container from "../Shared/Container";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Link from "next/link";
import Nav from "@/components/Nav/Nav";
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
    <div className={headerStyles.super}>
      <Container>
        <Link href="https://www.northwestern.edu/">
          {isLoaded && <NorthwesternWordmark />}
        </Link>
        <div data-is-expanded={isExpanded} className={headerStyles.menu}>
          <div className={navStyles.navResponsiveOnly}>
            <Link href="/search">Explore Works</Link>
            <Link href="/collections">Browse Collections</Link>
          </div>
          <Nav>
            {nav.map(({ href, label }) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
            {!userAuthContext?.user?.isLoggedIn && (
              <button
                onClick={userAuthContext.openSignInModal}
                className={headerStyles.login}
              >
                Sign in
              </button>
            )}
            {userAuthContext?.user?.isLoggedIn && (
              <>
                <span className={headerStyles.user}>
                  {userAuthContext.user.name}
                </span>
                <button onClick={handleLogout} className={headerStyles.logout}>
                  Logout
                </button>
              </>
            )}
          </Nav>
        </div>
        <button onClick={handleMenu} className={headerStyles.menuToggle}>
          {isExpanded ? <IconClear /> : <IconMenu />}
        </button>
      </Container>
    </div>
  );
}
