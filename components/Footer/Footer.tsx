import styles from "@/components/Footer/Footer.module.css";
import Container from "@/components/Shared/Container";
import { FooterContent } from "@/components/Footer/Content";
export default function Footer() {
  return (
    <footer className={styles.footerStyled}>
      <Container data-testid="footer">
        <FooterContent />
      </Container>
    </footer>
  );
}
