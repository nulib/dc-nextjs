import { StyledHeader } from "./Header.styled";
import HeaderLockup from "./Lockup";
import HeaderPrimary from "./Primary";
import HeaderSuper from "./Super";

export default function Header() {
  return (
    <StyledHeader>
      <HeaderSuper />
      <HeaderLockup />
      <HeaderPrimary />
    </StyledHeader>
  );
}
