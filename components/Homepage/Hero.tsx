import styles from "@/components/Homepage/Hero.module.css";
import Hero from "@/components/Hero/Hero";
import { defaultCollection } from "@/lib/constants/homepage";
const HomepageHero = () => {
  return (
    <div className={styles.homepageHeroStyled}>
      <Hero collection={defaultCollection} />
    </div>
  );
};
export default HomepageHero;
