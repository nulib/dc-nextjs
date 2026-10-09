import styles from "@/components/Shared/Facts.module.css";
import React, { ReactNode } from "react";
interface FactsItemProps {
  big: number | string;
  small: string;
}
const FactsItem: React.FC<FactsItemProps> = ({ big, small }) => {
  return (
    <div className={styles.factsItemStyled}>
      <span className={styles.factsItemBig}>{big}</span>
      <span className={styles.factsItemSmall}>{small}</span>
    </div>
  );
};
interface FactsComposition {
  Item: React.FC<FactsItemProps>;
}
interface FactsProps {
  children: ReactNode | ReactNode[];
}
const Facts: FactsComposition & React.FC<FactsProps> = ({ children }) => {
  return <div className={styles.factsStyled}>{children}</div>;
};
Facts.Item = FactsItem;
export default Facts;
