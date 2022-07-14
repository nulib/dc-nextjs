import Container from "../Shared/Container";
import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import { NorthwesternWordmark } from "@/components/Shared/SVG/Northwestern";
import React from "react";
import { Super } from "@/components/Header/Header.styled";
import { UserContext } from "@/pages/_app";

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

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const userAuthContext = React.useContext(UserContext);

  return (
    <Super>
      <Container>
        <Link href="https://www.northwestern.edu/">
          <a>{isLoaded && <NorthwesternWordmark />}</a>
        </Link>
        <Nav>
          {nav.map(({ href, label }) => (
            <Link key={label} href={href}>
              <a>{label}</a>
            </Link>
          ))}
          {!userAuthContext?.user && (
            <Link href="/api/auth/login">
              <a>Sign in</a>
            </Link>
          )}
          {userAuthContext?.user && (
            <>
              <a onClick={userAuthContext.logout} style={{ cursor: "pointer" }}>
                Logout
              </a>
              <span>{userAuthContext.user.displayName}</span>
            </>
          )}
        </Nav>
      </Container>
    </Super>
  );
}
