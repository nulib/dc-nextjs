import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

export const FooterStyled = styled("footer", {
  background: "$purple",
  color: "$white",
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  fontFamily: "$sansLight",
  fontSize: "$3",
  padding: "$6 0",

  "& a": {
    color: "$white",
    fontFamily: "$sansLight",

    "&:hover, &:focus": {
      textDecoration: "none",
      color: "$white",
    },
  },

  "& .hide-label": {
    position: "absolute",
    left: "-10000px",
    top: "auto",
    width: "1px",
    height: "1px",
    overflow: "hidden",
  },

  variants: {
    isGrey: {
      true: {
        background: "$black80",
      },
    },
  },
});

export const FooterContentColumn = styled("div", {
  "&.contact": {
    display: "flex",
    flexDirection: "column",
    gap: "$gr3",

    span: {
      lineHeight: "145%",
    },

    "& div": {
      marginLeft: "$gr4",
      position: "relative",

      "@xs": {
        marginLeft: "0",
      },
    },
  },

  "@sm": {
    marginBottom: "$2",
  },
});

export const FooterContentWrapper = styled("div", {
  width: "100%",
  display: "grid",
  gap: "$gr4",
  gridTemplateColumns: "repeat(4, 1fr)",

  "@sm": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@xs": {
    gridTemplateColumns: "repeat(1, 1fr)",

    [`${FooterContentColumn}`]: {
      textAlign: "center",
    },
  },
});

export const FooterCopyright = styled("div", {
  color: "$nuPurple10",
  margin: "$4 0 0",

  "> p": {
    lineHeight: "$6 !important",

    a: {
      border: "none",
      color: "inherit",
      textDecoration: "underline",
    },
  },
});

export const FooterIcon = styled("li", {
  backgroundSize: "18px 24px",
  position: "absolute",
  top: "-2px",
  left: "-$gr4",
  height: "24px",
  width: "18px",

  "@xs": {
    display: "none",
  },
});

export const FooterList = styled("ul", {
  listStyleType: "none",
  margin: "0",
  padding: "0",

  "& li": {
    paddingBottom: "$3",
  },

  "& a": {
    borderBottom: "0",
    textDecoration: "underline",
  },
});

export const Social = styled("a", {
  display: "inline-block",
  verticalAlign: "bottom",
  overflow: "hidden",
  margin: "$gr1",
  width: "39px",
  height: "39px",
  fontSize: "0",
  textIndent: "-9999px",
  background:
    "url(https://common.northwestern.edu/v8/css/images/icons/social-media-icons.svg);",
  backgroundColor: "#fff",
  transition: "background 0.3s",
  border: "1px solid #fff",

  "&:hover, &:focus": {
    backgroundColor: "#b6acd1",
  },

  "&.facebook": {
    backgroundPosition: "0 0",
    "&:hover, &:focus": {
      backgroundPosition: "0 -39px",
    },
  },
  "&.twitter": {
    backgroundPosition: "-39px 0",
    "&:hover, &:focus": {
      backgroundPosition: "-39px -39px",
    },
  },
  "&.instagram": {
    backgroundPosition: "-78px 0",
    "&:hover, &:focus": {
      backgroundPosition: "-78px -39px",
    },
  },
  "&.youtube": {
    backgroundPosition: "-156px 0",
    "&:hover, &:focus": {
      backgroundPosition: "-156px -39px",
    },
  },
  "&.wordpress": {
    backgroundPosition: "-234px 0",
    "&:hover, &:focus": {
      backgroundPosition: "-234px -39px",
    },
  },
});
