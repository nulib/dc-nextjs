import * as Dialog from "@radix-ui/react-dialog";

import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const AuthDialogOverlay = styled(Dialog.Overlay, {
  background: "rgba(0 0 0 / 0.618)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "grid",
  placeItems: "center",
  overflowY: "auto",
  zIndex: "10",
});

const AuthDialogContent = styled(Dialog.Content, {
  backgroundColor: "white",
  borderRadius: "6px",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "500px",
  maxHeight: "85vh",
  padding: "$gr4",
  zIndex: "20",
  fontSize: "$gr3",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$gr4",

  "* + *": {
    margin: 0,
    padding: 0,
  },

  "&:focus": { outline: "none" },
});

const AuthDialogTitle = styled(Dialog.Title, {
  fontSize: "$gr5",
  lineHeight: "1.5rem",
  padding: "0",
  margin: "0",
  color: "$black80",
  fontFamily: "$sansBold",
  fontWeight: "400",
  letterSpacing: "-0.02em",
});

const AuthDialogDescription = styled(Dialog.Description, {
  color: "$black50",
});

const AuthDialogOptions = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$gr4",
  marginBottom: "$gr3",
  width: "100%",
});

const AuthDialogColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  "text-wrap": "balance",
  gap: "$gr2",
  width: "100%",

  "> *": {
    width: "100%",
  },

  [`> *[role=button]`]: {
    paddingInline: "0",
    margin: 0,
  },

  a: {
    color: "$white",
    width: "100%",
  },
});

const MagicLinkInput = styled("input", {
  height: "2.5rem",
  padding: "$gr2",
  border: "none !important",
  backgroundColor: "$gray6",
  fontSize: "$gr3",
  lineHeight: "1.5rem",
  color: "$black",
  fontFamily: "$sansRegular",

  "&::placeholder": {
    color: "$black50",
  },

  "&:user-invalid": {
    borderColor: "$brightRed",
  },
});

const AuthDialogDivider = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "100%",
  color: "$black50",
  fontSize: "$gr2",

  "&::before, &::after": {
    content: '""',
    flex: "1",
    height: "1px",
    backgroundColor: "$black10",
  },

  "&::before": {
    marginRight: "$gr3",
  },

  "&::after": {
    marginLeft: "$gr3",
  },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: "25px",
  width: "25px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$black50",
  position: "absolute",
  top: "10px",
  right: "10px",

  "&:hover": {
    backgroundColor: "$gray6",
  },

  "&:focus": {
    boxShadow: "0 0 0 2px $gray6",
  },
});

export {
  AuthDialogContent,
  AuthDialogColumn,
  AuthDialogDescription,
  AuthDialogDivider,
  AuthDialogOptions,
  AuthDialogOverlay,
  AuthDialogTitle,
  IconButton,
  MagicLinkInput,
};
