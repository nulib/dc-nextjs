import { FigureImageWrapper } from "@/components/Figure/Figure.styled";
import Masonry from "react-masonry-css";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const GridItem = styled("div", {
  zIndex: "1",

  a: {
    textDecoration: "none !important",

    "&:hover, &:focus": {
      [`& ${FigureImageWrapper}`]: {
        backgroundColor: "$purple10",
        outline: "2px solid $purple60",
        boxShadow: "2px 2px 5px #0003",
      },
    },
  },
});

const GridStyled = styled(Masonry, {
  display: "flex",
  position: "relative",
  zIndex: "0",
  padding: "0",

  "@xxl": {
    padding: "0 $gr4",
  },

  "@xl": {
    padding: "0 $gr4",
  },

  "@lg": {
    padding: "0",
  },

  [`.grid-column`]: {
    marginLeft: "$gr4",

    "@xxs": {
      marginLeft: "$gr2",
    },

    "@xs": {
      marginLeft: "$gr2",
    },

    "@sm": {
      marginLeft: "$gr3",
    },

    "@md": {
      marginLeft: "$gr3",
    },

    "&:first-child": {
      marginLeft: "0",
    },
  },
});

export { GridItem, GridStyled };
