import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ActionsDialogAsideStyled = styled("aside", {
  width: "25%",
  padding: "0 2rem 0 0 ",

  "@sm": {
    width: "100%",
    paddingRight: "0",
  },
});

const Content = styled("div", {
  width: "75%",

  "@sm": {
    width: "100%",
  },
});

const ActionsDialogStyled = styled("section", {
  display: "flex",

  "@sm": {
    flexDirection: "column",
  },
});

export { ActionsDialogStyled, ActionsDialogAsideStyled, Content };
