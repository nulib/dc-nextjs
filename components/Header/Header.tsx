import {
  HeaderStyled,
  HeaderVariants,
} from "@/components/Header/Header.styled";
import HeaderHero from "@/components/Header/Hero";
import HeaderLockup from "@/components/Header/Lockup";
import HeaderPrimary from "@/components/Header/Primary";
import HeaderSuper from "@/components/Header/Super";
import { heroCollection } from "@/lib/constants/homepage";

interface HeaderProps {
  isHero?: boolean;
}

const Header: React.FC<HeaderProps & HeaderVariants> = ({ isHero }) => {
  return (
    <HeaderStyled isHero={isHero}>
      <HeaderSuper />
      <HeaderLockup />
      <HeaderPrimary />
      {isHero && <HeaderHero collection={heroCollection}></HeaderHero>}
    </HeaderStyled>
  );
};

export default Header;
