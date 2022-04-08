import Link from "next/link";
import { Lockup } from "@/components/Header/Header.styled";

export default function HeaderLockup() {
  return (
    <Lockup>
      <Link href="/">Libraries | Digital Collections</Link>
    </Lockup>
  );
}
