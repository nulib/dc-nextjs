import { NavStyled } from "./Nav.styled";

const Nav: React.FC = ({ children }) => {
  return <NavStyled>{children}</NavStyled>;
};

export default Nav;
