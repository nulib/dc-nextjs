import { NavStyled } from "./Nav.styled";
import { ReactNode } from "react";

interface NavProps {
  children: ReactNode;
}

const Nav: React.FC<NavProps> = ({ children }) => {
  return <NavStyled data-testid="super-nav">{children}</NavStyled>;
};

export default Nav;
