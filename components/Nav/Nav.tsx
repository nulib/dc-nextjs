import styles from "@/components/Nav/Nav.module.css";
import { ReactNode } from "react";
interface NavProps {
  children: ReactNode;
}
const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <nav
      data-testid="super-nav"
      data-dc-slot="nav"
      className={styles.navStyled}
    >
      {children}
    </nav>
  );
};
export default Nav;
