import { styled } from "@/stitches.config";

const linkActiveVariant = {
  active: {
    false: {
      visibility: "hidden",
    },
  },
};

const prevNextStyles = {
  display: "flex",
  flexGrow: 1,
  marginTop: "-1px",

  "& a": {
    display: "inline-flex",
    alignItems: "center",
    paddingTop: "$gr3",
    borderTop: "2px solid transparent",

    "&:hover": {
      borderTop: "2px solid $black20",
    },
  },
};

/* eslint sort-keys: 0 */
const PaginationStyled = styled("nav", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "$gr3",
  color: "$black80",
  margin: "0 $gr3 $gr4",
  borderTop: "2px solid $black10",

  "& svg": {
    width: "$gr3",
  },
});

const LeftNav = styled("div", {
  ...prevNextStyles,
  "& svg": {
    marginRight: "$gr2",
  },

  variants: { ...linkActiveVariant },
});

const NavWrapper = styled("div", {
  display: "flex",

  "& button": {
    fontSize: "$gr3",

    "&:last-of-type": {
      marginRight: "0",
    },
  },
});

const RightNav = styled("div", {
  ...prevNextStyles,
  justifyContent: "end",

  "& svg": {
    marginLeft: "$gr2",
  },

  variants: { ...linkActiveVariant },
});

const PaginationLinks = styled("div", {
  display: "flex",
  marginTop: "-1px",

  "@sm": {
    display: "none",
  },
});

const PageNumber = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "$gr3 $gr3 0 $gr3",
  borderTop: "2px solid transparent",
  color: "$black50",

  "&:hover": {
    color: "$black80",
    borderTop: "2px solid $black20",
  },

  variants: {
    isCurrent: {
      true: {
        color: "$purple",
        borderTop: "2px solid $purple",
      },
    },
  },
});

const Results = styled("div", {
  color: "$black50",

  "& span": {
    fontFamily: "$northwesternSansBold",
  },
});

export {
  LeftNav,
  NavWrapper,
  PageNumber,
  PaginationLinks,
  PaginationStyled,
  Results,
  RightNav,
};
