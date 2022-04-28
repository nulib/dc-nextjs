import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const FilterTrigger = styled(Dialog.Trigger, {
  width: "81px",
  height: "38px",
  cursor: "pointer",
  backgroundColor: "$purple",
  border: "0",
  color: "$white",
  fontSize: "1rem",
});

const FilterOverlay = styled(Dialog.Overlay, {
  background: "rgba(0 0 0 / 0.5)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "grid",
  placeItems: "center",
  overflowY: "auto",
});

const FilterBody = styled("div", {
  padding: "1rem",
});

const FilterHeader = styled("header", {
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",

  h2: {
    fontSize: "25px",
    padding: "0",
    margin: "0",
  },
});

const FilterContent = styled(Dialog.Content, {
  width: "80vw",
  height: "60vh",
  background: "white",
  position: "fixed",
  top: "81px",
  left: "10vw",
  right: 0,
  bottom: 0,
  overflowY: "auto",
  zIndex: "1",
});

export {
  FilterBody,
  FilterContent,
  FilterHeader,
  FilterOverlay,
  FilterTrigger,
};
