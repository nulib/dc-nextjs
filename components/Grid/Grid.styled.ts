import * as Dialog from "@radix-ui/react-dialog";
import Masonry from "react-masonry-css";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

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

const GridStyled = styled(Masonry, {
  display: "flex",
  position: "relative",
  zIndex: "0",
  margin: "1rem",
});

export { GridFilter, GridItem, GridStyled };
