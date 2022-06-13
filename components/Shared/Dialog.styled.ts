import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const DialogClose = styled(Dialog.Close, {});

const DialogOverlay = styled(Dialog.Overlay, {
  background: "rgba(0 0 0 / 0.618)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "grid",
  placeItems: "center",
  overflowY: "auto",
  zIndex: "1",
});

const DialogBody = styled("div", {
  margin: "3.5rem 0 4.5rem",
  maxHeight: "calc(100% - 8rem)",
  minHeight: "calc(100% - 8rem)",
  overflow: "scroll",
  padding: "1rem",

  "&:before": {
    position: "absolute",
    display: "block",
    width: "100%",
    height: "1px",
    backgroundColor: "$black10",
    margin: "-1rem 0 0 -1rem",
  },
});

const DialogHeader = styled("header", {
  position: "absolute",
  top: "0",
  padding: "1rem",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  backgroundColor: "$white",

  h2: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    padding: "0",
    margin: "0",
    color: "$black50",
  },

  em: {
    color: "$black80",
    lineHeight: "1.5rem",
    fontSize: "0.8333rem",
  },

  [`& ${DialogClose}`]: {
    display: "flex",
    height: "1.5rem",
    width: "1.5rem",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "transparent",
    zIndex: "1",
    border: "none",
    borderRadius: "50%",
    marginRight: "0.5rem",
    fill: "$black50",
    stroke: "$black50",
    transition: "all 200ms ease-in-out",
    flexShrink: "0",

    svg: {
      transition: "all 200ms ease-in-out",
      fill: "inherit",
      stroke: "inherit",
    },
  },
});

const DialogContent = styled(Dialog.Content, {
  width: "calc(100vw - 20rem)",
  height: "calc(100vh - 20rem)",
  background: "white",
  position: "fixed",
  top: "10rem",
  left: "10rem",
  right: 0,
  bottom: 0,
  overflowY: "auto",
  zIndex: "2",
  borderRadius: "3px",
  boxShadow: "5px 5px 11px #0002",

  "@sm": {
    width: "calc(100vw - 1rem)",
    height: "calc(100vh - 1rem)",
    top: "0.5rem",
    left: "0.5rem",
  },
});

export { DialogBody, DialogClose, DialogContent, DialogHeader, DialogOverlay };
