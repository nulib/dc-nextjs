import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const Description = styled("p", {
  fontSize: "$gr4",
  fontFamily: "$sansLight",
  lineHeight: "1.55em",
  margin: "0 0 $gr5",
});

const HeroWrapper = styled("div", {
  height: "350px",
  position: "relative",
});

export { Description, HeroWrapper };
