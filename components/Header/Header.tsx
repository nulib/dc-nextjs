import styles from "@/components/Header/Header.module.css";
import HeaderLockup from "@/components/Header/Lockup";
import HeaderPrimary from "@/components/Header/Primary";
import HeaderSuper from "@/components/Header/Super";
interface HeaderProps {
  isHero?: boolean;
}
const Header: React.FC<HeaderProps> = ({ isHero }) => {
  return (
    <header data-is-hero={isHero} className={styles.headerStyled}>
      <HeaderSuper />
      <HeaderLockup />
      <HeaderPrimary />
    </header>
  );
};
export default Header;
