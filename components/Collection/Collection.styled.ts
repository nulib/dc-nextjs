import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const CulturalContextStyled = styled("div", {
  border: "1px solid $black10",
  color: "$black50",
  margin: "2rem 0",
  padding: "1rem",
});

const HeroStyled = styled("div", {
  background: "$black80",
  color: "$white",
  display: "grid",
  gap: "10px",
  gridAutoColumns: "1fr",
  gridAutoFlow: "column",

  "@sm": {
    gridAutoFlow: "row",
  },
});

const HeroContent = styled("div", {
  padding: "$4",
});

const HeroContentWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});

const HeroImageStyled = styled("div", {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
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
  HeroContentWrapper,
  HeroImageStyled,
  HeroStyled,
  ItemsLabel,
};
