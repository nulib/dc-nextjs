import styles from "@/components/Heading/Subhead.module.css";
interface HeadingSubheadProps {
  children: React.ReactNode;
}
const HeadingSubhead: React.FC<HeadingSubheadProps> = ({ children }) => {
  return (
    <p data-dc-slot="heading-subhead" className={styles.headingSubheadStyled}>
      {children}
    </p>
  );
};
export default HeadingSubhead;
