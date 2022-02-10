import styles from "styles/Header.module.css";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/static-page">Static Page</Link>
        <Link href="/collection/list">Collection</Link>
      </nav>
    </header>
  );
};

export default Header;
