import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const FilterClearStyled = styled("button", {
  background: "$white",
  border: "none",
  borderRadius: "50px",
  color: "$black50",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr3",
  height: `calc($gr3 * 2)`,
  justifyContent: "center",
  marginLeft: "$gr2",
  padding: "0 $gr3",
  transition: "$dcAll",
  whiteSpace: "nowrap",

  "&:focus, &:hover": {
    color: "$purple",
  },

  variants: {
    isFixed: {
      true: {
        boxShadow: "2px 2px 5px #0002",
      },
    },
    isModal: {
      true: {
        boxShadow: "none",
        backgroundColor: "transparent",
        textDecoration: "underline",
      },
    },
  },
});

export { FilterClearStyled };
