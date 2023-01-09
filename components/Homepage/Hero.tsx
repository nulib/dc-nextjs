import Hero from "@/components/Hero/Hero";
import { HomepageHeroStyled } from "./Hero.styled";
import { defaultCollection } from "@/lib/constants/homepage";

const HomepageHero = () => {
  return (
    <HomepageHeroStyled>
      <Hero collection={defaultCollection} />
    </HomepageHeroStyled>
  );
};

export default HomepageHero;
