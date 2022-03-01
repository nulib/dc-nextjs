import { Lockup } from "components/Header/Header.styled";
import Link from "next/link";

export default function HeaderLockup() {
  return (
    <Lockup>
      <Link href="/">Libraries | Digital Collections</Link>
    </Lockup>
  );
}
