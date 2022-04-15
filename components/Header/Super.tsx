import Nav from "@/components/Nav/Nav";
import { Super } from "@/components/Header/Header.styled";
import Container from "../Container";

export default function HeaderSuper() {
  return (
    <Super>
      <Container>
        <a>Northwestern</a>
        <Nav>
          <a>Libraries</a>
          <a>About</a>
          <a>Contact</a>
          <a>Sign In</a>
        </Nav>
      </Container>
    </Super>
  );
}
