import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ActionsDialogAsideStyled = styled("aside", {
  width: "33.33%",

  variants: {
    dialogSize: {
      small: {
        width: "33.33%",
      },
    },
  },

  "@sm": {
    width: "100%",
  },
});

const Content = styled("div", {
  flexGrow: 1,
});

const ActionsDialogStyled = styled("section", {
  display: "flex",
  gap: "$gr4",
  width: "100%",

  "@sm": {
    flexDirection: "column",
  },
});

export { ActionsDialogStyled, ActionsDialogAsideStyled, Content };
