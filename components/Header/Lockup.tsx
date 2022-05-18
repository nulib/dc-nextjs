import Container from "@/components/Container";
import Link from "next/link";
import { Lockup } from "@/components/Header/Header.styled";

export default function HeaderLockup() {
  return (
    <Lockup>
      <Container>
        <Link href="/">Libraries | Digital Collections</Link>
      </Container>
    </Lockup>
  );
}
