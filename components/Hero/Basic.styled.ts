import { HeadingSlashTitleStyled } from "@/components/Heading/SlashTitle";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const HeroBasicStyled = styled("section", {
  position: "relative",
  width: "100vw",
  height: "600px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "&:before": {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "url(/images/liz__O8A9903_final.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center, center",
    filter: "brightness(60%)",
  },

  [`& ${HeadingSlashTitleStyled}`]: {
    color: "$white",
  },
});

const Content = styled("div", {
  position: "relative",
  color: "$white",
  maxWidth: "1120px",
  textAlign: "center",
});

const HeroTitle = HeadingSlashTitleStyled;

const Subhead = styled("p", {
  fontFamily: "$displayBold",
  fontSize: "72px",
  lineHeight: "5rem",
  margin: "0 0 $gr3 0",

  "@md": {
    fontSize: "$gr8",
    lineHeight: "60px",
  },
});

export { Content, HeroBasicStyled, HeroTitle, Subhead };
