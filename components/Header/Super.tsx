import Container from "../Shared/Container";
import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import React from "react";
import { Super } from "@/components/Header/Header.styled";

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
  {
    href: "/#",
    label: "Sign In",
  },
];

export default function HeaderSuper() {
  return (
    <Super>
      <Container>
        <a>Northwestern</a>
        <Nav>
          {nav.map(({ href, label }) => (
            <Link key={label} href={href}>
              <a>{label}</a>
            </Link>
          ))}
        </Nav>
      </Container>
    </Super>
  );
}
