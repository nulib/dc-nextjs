import styles from "@/components/Hero/Basic.module.css";
import React, { CSSProperties } from "react";
interface Props {
  bgImage: string;
  children: React.ReactNode;
}
const HeroBasic: React.FC<Props> = ({ bgImage, children }) => {
  return (
    <section
      style={
        {
          "--hero-background": `url(${JSON.stringify(bgImage)})`,
        } as CSSProperties
      }
      className={styles.heroBasicStyled}
    >
      <div className={styles.content}>{children}</div>
    </section>
  );
};
export default HeroBasic;
