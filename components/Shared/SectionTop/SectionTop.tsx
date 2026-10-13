import titleStyles from "@/components/Heading/SlashTitle.module.css";
import subheadStyles from "@/components/Heading/Subhead.module.css";
import type { HTMLAttributes } from "react";
import styles from "@/components/Shared/SectionTop/SectionTop.module.css";
import Container from "@/components/Shared/Container";
/* eslint sort-keys: 0 */
interface SectionTopProps {
  children: React.ReactNode;
}
const SectionTop: React.FC<SectionTopProps> = ({ children }) => {
  return (
    <section className={styles.sectionTopStyled}>
      <Container maxWidth={1120}>{children}</Container>
    </section>
  );
};
const SectionTitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    {...props}
    data-dc-slot="heading-slash-title"
    className={[titleStyles.headingSlashTitleStyled, className]
      .filter(Boolean)
      .join(" ")}
  />
);
const SectionSubhead = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    {...props}
    data-dc-slot="heading-subhead"
    className={[subheadStyles.headingSubheadStyled, className]
      .filter(Boolean)
      .join(" ")}
  />
);
export { SectionSubhead, SectionTitle };
export default SectionTop;
