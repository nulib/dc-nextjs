import {
  HeaderStyled,
  HeaderVariants,
} from "@/components/Header/Header.styled";
import HeaderLockup from "@/components/Header/Lockup";
import HeaderPrimary from "@/components/Header/Primary";
import HeaderSuper from "@/components/Header/Super";

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
