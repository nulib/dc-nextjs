import styles from "@/components/Shared/SectionHeading.module.css";
import Heading from "../Heading/Heading";
import Icon from "./Icon";
import { IconArrowForward } from "./SVG/Icons";
import Link from "next/link";
interface SectionHeadingProps {
  headingText: string;
  linkText: string;
  linkHref: string;
}
const SectionHeading: React.FC<SectionHeadingProps> = ({
  headingText,
  linkText,
  linkHref,
}) => {
  return (
    <div className={styles.sectionHeadingStyled}>
      <Heading as="h2" className={styles.override0}>
        {headingText}
      </Heading>
      <Link href={linkHref}>
        <span className={styles.sectionHeadingExplore}>
          {linkText}
          <Icon>
            <IconArrowForward />
          </Icon>
        </span>
      </Link>
    </div>
  );
};
export default SectionHeading;
