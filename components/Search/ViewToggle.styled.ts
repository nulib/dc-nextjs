import { styled } from "@/stitches.config";

export const ContentResultsHeader = styled("div", {
  padding: "$gr3 $gr4 $gr4",
  fontSize: "$gr3",
  fontFamily: "$northwesternSansLight",
  color: "$black50",
});

export const ContentResultsNote = styled("span", {
  fontSize: "$gr2",
  color: "$black20",
});

export const ViewToggle = styled("div", {
  display: "flex",
  gap: "$gr3",
  padding: "$gr3 $gr4 0",
  borderBottom: "2px solid $black10",
  marginBottom: "$gr4",
});

export const ViewToggleOption = styled("button", {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "$gr2 0",
  marginBottom: "-2px",
  fontSize: "$gr3",
  fontFamily: "$northwesternSansLight",
  color: "$black50",
  borderBottom: "2px solid transparent",
  transition: "color 0.15s, border-color 0.15s",

  variants: {
    active: {
      true: {
        color: "$purple",
        borderBottom: "2px solid $purple",
        fontFamily: "$northwesternSansRegular",
      },
    },
  },
});
