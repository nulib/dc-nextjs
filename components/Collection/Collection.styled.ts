import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const CulturalContextStyled = styled("div", {
  border: "1px solid $black10",
  color: "$black50",
  margin: "2rem 0",
  padding: "1rem",
});

const HeroStyledWrapper = styled("section", {
  background: "$black50",
  color: "$white",
});

const HeroStyled = styled("div", {
  display: "grid",
  gridAutoColumns: "1fr",
  gridAutoFlow: "column",

  "@sm": {
    gridAutoFlow: "row",
  },
});

const HeroContent = styled("div", {
  padding: "$",
});

const HeroImageStyled = styled("div", {
  backgroundPositionX: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  minHeight: "300px",

  "@sm": {
    backgroundSize: "cover",
    gridRow: "1",
  },
});

const ItemsLabel = styled("p", {
  fontSize: "0.75rem",
  textTransform: "uppercase",
});

export {
  CulturalContextStyled,
  HeroContent,
  HeroImageStyled,
  HeroStyled,
  HeroStyledWrapper,
  ItemsLabel,
};
