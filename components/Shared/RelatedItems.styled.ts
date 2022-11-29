import { HeadingSlashTitleStyled } from "@/components/Heading/SlashTitle.styled";
import { StyledHeading } from "@/components/Heading/Heading.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const RelatedItemsStyled = styled("section", {
  marginBottom: "$gr5",

  [`& ${StyledHeading}`]: {
    color: "$black80",
  },

  "> div": {
    padding: "0 0 $gr4",
  },

  [`& .bloom-header-label`]: {
    display: "block",
    color: "$purple",
    fontFamily: "$northwesternSansRegular !important",
    fontSize: "$gr5 !important",
  },

  [`& .bloom-header-summary`]: {
    display: "block",
    fontSize: "$gr3 !important",
  },

  figcaption: {
    fontFamily: "$northwesternSansRegular !important",
    fontWeight: "400",

    "> span": {
      fontSize: "$gr2",
      color: "$black50",
      marginTop: "6px",
    },

    "> span:first-child": {
      fontSize: "$gr3",
      color: "$purple",
      fontWeight: "400",
      lineHeight: "1.15em",
    },
  },

  [`& a:hover figcaption, & a:focus figcaption`]: {
    color: "$purple !important",
  },

  [`& ${HeadingSlashTitleStyled}`]: {
    color: "$purple",
    textAlign: "center",
    marginTop: "$gr6",
  },
});

export { RelatedItemsStyled };
