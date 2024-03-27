import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const AlertDialogOverlay = styled(AlertDialog.Overlay, {
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

const AlertDialogContent = styled(AlertDialog.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "500px",
  maxHeight: "85vh",
  padding: 25,
  zIndex: "2",

  "&:focus": { outline: "none" },
});

const AlertDialogTitle = styled(AlertDialog.Title, {
  fontSize: "$gr4",
  lineHeight: "1.5rem",
  padding: "0",
  margin: "0",
  color: "$black50",
  fontWeight: "400",
});

const AlertDialogButtonRow = styled("div", {
  display: "flex",
  justifyContent: "flex-end",

  "& > *:not(:last-child)": {
    marginRight: "$gr3",
  },
});

export {
  AlertDialogButtonRow,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogTitle,
};
