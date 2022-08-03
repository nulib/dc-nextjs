import { HeaderStyled, HeaderVariants } from "./Header.styled";
import HeaderLockup from "./Lockup";
import HeaderPrimary from "./Primary";
import HeaderSuper from "./Super";

interface HeaderProps {
  isHero?: boolean;
}

const Header: React.FC<HeaderProps & HeaderVariants> = ({ isHero }) => {
  return (
    <HeaderStyled isHero={isHero}>
      <HeaderSuper />
      <HeaderLockup />
      <HeaderPrimary />
    </HeaderStyled>
  );
};

export default Header;
