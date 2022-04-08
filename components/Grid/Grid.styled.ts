import * as Dialog from "@radix-ui/react-dialog";
import Masonry from "react-masonry-css";
import { styled } from "@/stitches.config";

const GridControls = styled("div", {
  display: "flex",
  margin: "2.618rem 5vw 1.618rem",
  maxWidth: "90vw",
  justifyContent: "space-between",

  div: {
    transition: "$all",
    left: "0",
    position: "relative",
  },

  ".sticky-filter": {
    top: "81px !important",
    zIndex: "1",
    left: "calc(50% - 40.5px)",
  },
});

const GridFilter = styled(Dialog.Trigger, {
  width: "81px",
  height: "38px",
  cursor: "pointer",
  backgroundColor: "$slate12",
  border: "0",
  color: "$slate1",
  fontSize: "1rem",
});

const GridItem = styled("div", {
  margin: "0 1rem 0.618rem",
  zIndex: "1",
});

const GridStyled = styled(Masonry as any, {
  display: "flex",
  margin: "auto calc(5vw - 1rem)",
  maxWidth: "calc(90vw + 2rem)",
  position: "relative",
  zIndex: "0",
});

export { GridControls, GridFilter, GridItem, GridStyled };
