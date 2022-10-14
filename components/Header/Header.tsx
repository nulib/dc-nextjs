import {
  HeaderStyled,
  HeaderVariants,
} from "@/components/Header/Header.styled";
import HeaderLockup from "@/components/Header/Lockup";
import HeaderPrimary from "@/components/Header/Primary";
import HeaderSuper from "@/components/Header/Super";
import Hero from "@/components/Hero/Hero";
import { defaultCollection } from "@/lib/constants/homepage";

interface HeaderProps {
  isHero?: boolean;
}

const Header: React.FC<HeaderProps & HeaderVariants> = ({ isHero }) => {
  return (
    <HeaderStyled isHero={isHero}>
      <HeaderSuper />
      <HeaderLockup />
      <HeaderPrimary />
      {isHero && <Hero collection={defaultCollection}></Hero>}
    </HeaderStyled>
  );
};

export default Header;
