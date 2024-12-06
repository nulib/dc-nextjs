import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const CollectionHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1.5em",
  gap: "$gr4",

  "div:last-child": {
    flexShrink: 0,
    flexGrow: 0,
    marginBottom: "$gr2",
  },

  "@sm": {
    flexDirection: "column",
    gap: "0",
  },
});

const Description = styled("p", {
  lineHeight: "1.55em",
  margin: "$gr2 0 $gr6",
  color: "$black50",

  "@sm": {
    fontSize: "$gr3",
  },
});

const HeroWrapper = styled("div", {
  height: "375px",
  position: "relative",
  pointerEvents: "none",
});

const Interstitial = styled("div", {
  backgroundColor: "#f6f6f6",
  marginBottom: "$gr4",
  padding: "$gr3 0",
});

export { CollectionHeader, Description, Interstitial, HeroWrapper };
