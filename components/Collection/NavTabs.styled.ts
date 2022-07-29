import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const NavTabsStyled = styled("section", {
  display: "grid",
  gap: "1rem",
  gridAutoFlow: "column",
  gridAutoColumns: "1fr",
  paddingBottom: "2rem",

  "@xs": {
    gridAutoFlow: "inherit",
    gridAutoColumns: "inherit",
  },
});

const NavTab = styled("div", {
  background: "$black50",
  color: "$white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  height: "10rem",
  width: "100%",
});

const NavTabTitle = styled("span", {
  display: "inline-block",
  padding: "1rem",
});

export { NavTab, NavTabTitle, NavTabsStyled };
