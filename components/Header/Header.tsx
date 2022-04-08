import HeaderLockup from "./Lockup";
import HeaderPrimary from "./Primary";
import HeaderSuper from "./Super";
import { StyledHeader } from "./Header.styled";

export default function Header() {
  return (
    <StyledHeader>
      <HeaderSuper />
      <HeaderLockup />
      <HeaderPrimary />
    </StyledHeader>
  );
}
