import { ExpandableListItemStyled } from "@/components/Shared/ExpandableList.styled";
import { FigureTitle } from "@/components/Figure/Figure.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ActionsDialogAsideStyled = styled("aside", {
  width: "300px",
  flexShrink: 0,

  "@sm": {
    width: "100%",
    paddingRight: "0",
  },
});

const Content = styled("div", {
  paddingRight: "$gr4",
  flexGrow: 1,

  [`${ExpandableListItemStyled}`]: {
    "> div": {
      padding: "$gr2 0",
    },

    h3: {
      display: "none !important",
    },
  },
});

const ActionsDialogStyled = styled("div", {
  display: "flex",
  gap: "$gr5",

  [`${FigureTitle}`]: {
    fontFamily: "$northwesternSansBold !important",
    color: "$black80 !important",
    fontWeight: "400 !important",
  },

  h3: {
    fontSize: "$gr4 !important",
    fontWeight: "400 !important",
    fontFamily: "$northwesternSansRegular !important",
    color: "$black80 !important",
  },

  section: {
    paddingBottom: "$gr5",
  },

  "@sm": {
    flexDirection: "column",
  },
});

export { ActionsDialogStyled, ActionsDialogAsideStyled, Content };
