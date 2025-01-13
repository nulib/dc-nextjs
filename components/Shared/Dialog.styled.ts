import * as Dialog from "@radix-ui/react-dialog";

import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const DialogClose = styled(Dialog.Close, {
  svg: {
    width: "100%",
    height: "100%",
  },
});

const DialogOverlay = styled(Dialog.Overlay, {
  background: "rgba(0 0 0 / 0.382)",
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
  margin: "3.5rem 0 0",
  maxHeight: "calc(100% - 3.5rem)",
  minHeight: "calc(100% - 3.5rem)",
  overflow: "scroll",
  padding: "$gr3 $gr4 $gr4",

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
  padding: "$gr4",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  backgroundColor: "$white",

  h2: {
    fontSize: "$gr4",
    lineHeight: "1.5rem",
    padding: "0",
    margin: "0",
    color: "$black50",
    fontWeight: "400",
  },

  em: {
    color: "$black80",
    lineHeight: "1.5rem",
    fontSize: "$gr1",
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
    width: "calc(100vw - 1rem) !important",
    height: "calc(100vh - 1rem) !important",
    top: "0.5rem !important",
    left: "0.5rem !important",
  },

  variants: {
    size: {
      small: {
        top: "12rem",
        left: "12rem",
        width: "calc(100vw - 24rem)",
        height: "calc(100vh - 24rem)",
        minHeight: "300px",

        [`& ${DialogBody}`]: {
          display: "flex",
        },
      },
      large: {
        top: "5rem",
        left: "5rem",
        width: "calc(100vw - 10rem)",
        height: "calc(100vh - 10rem)",
      },
    },
  },
});

export { DialogBody, DialogClose, DialogContent, DialogHeader, DialogOverlay };
