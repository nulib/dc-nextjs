import Link from "next/link";
import styles from "styles/Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/static-page">Static Page</Link>
        <Link href="/collection/list">Collections</Link>
        <Link href="/local-api">Local API</Link>
      </nav>
    </header>
  );
};

export default Header;
