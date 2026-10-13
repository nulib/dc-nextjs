import styles from "@/components/Header/Header.module.css";
import Container from "@/components/Shared/Container";
import Link from "next/link";
export default function HeaderLockup() {
  return (
    <div className={styles.lockup}>
      <Container>
        <Link href="/">Libraries | Digital Collections</Link>
      </Container>
    </div>
  );
}
