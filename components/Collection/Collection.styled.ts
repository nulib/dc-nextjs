import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const Description = styled("p", {
  fontSize: "$gr5",
  fontFamily: "$northwesternSansLight",
  lineHeight: "1.55em",
  margin: "$gr2 0 $gr5",
  color: "$black50",
});

const HeroWrapper = styled("div", {
  height: "375px",
  position: "relative",
});

const Interstitial = styled("div", {
  backgroundColor: "#f6f6f6",
  marginBottom: "$gr4",
  padding: "$gr3 0",
});

export { Description, Interstitial, HeroWrapper };
