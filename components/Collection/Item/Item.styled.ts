import { IconAudio, IconImage, IconVideo } from "@/components/Shared/SVG/Icons";
import { FigureCaption } from "@/components/Figure/Figure.styled";
import Image from "next/image";
import { LinkStyled } from "@/components/Shared/LinkStyled";
import { StyledHeading } from "@/components/Heading/Heading.styled";
import { styled } from "@/stitches.config";

IconAudio.toString = () => ".icon-audio";
IconImage.toString = () => ".icon-image";
IconVideo.toString = () => ".icon-video";

const Description = styled("p", {
  paddingTop: "0",
  marginTop: "0",

  "@sm": {
    display: "none",
  },
});

const iconStyles = {
  height: "$gr3",
  fill: "$black50",
  margin: "0",
  padding: "0",
  marginLeft: "4px",
};

const iconStylesText = {
  height: "16px",
  fill: "$black50",
  marginLeft: "4px",
};

/* eslint sort-keys: 0 */

const ItemImage = styled(Image, {
  flexGrow: "0",
});

const ItemImageWrapper = styled("div", {
  display: "flex",
  width: "$gr8",
  flexShrink: "0",
  margin: "0 0 $gr3 0",
  borderRadius: "3px",
  overflow: "hidden",
  flexDirection: "column",

  "@md": {
    width: "$gr7",
  },
  "@sm": {
    width: "$gr6",
  },

  [`& ${FigureCaption}`]: {
    display: "none",
  },
});

const ItemContent = styled("div", {
  paddingLeft: "$gr4",

  [`& ${StyledHeading}`]: {
    marginTop: "0",

    "@sm": {
      fontSize: "$gr4",
    },
  },

  [`& ${LinkStyled}`]: {
    fontFamily: "$northwesternSansRegular",
  },

  "& p": {
    fontSize: "$gr3",
  },

  "@sm": {
    paddingLeft: "$gr3",
  },
});

const ItemTitle = styled("h3", {
  fontSize: "$gr5",
  marginTop: 0,
});

const ItemStyled = styled("article", {
  display: "flex",
  marginBottom: "$gr4",

  "@sm": {
    marginBottom: "$gr3",
  },
});

const MetadataIcons = styled("div", {
  fontSize: "$gr2",
  display: "flex",
  alignItems: "center",
  marginBottom: "$gr2",

  "& span": {
    padding: "3px $gr1",
    marginRight: "$gr3",
    borderRadius: "10px",
    color: "$black80",
    backgroundColor: "$black10",
    display: "flex",
    alignItems: "center",

    "@sm": {
      marginRight: "$gr1",
    },
  },

  [`& ${IconAudio}`]: iconStyles,
  [`& ${IconImage}`]: iconStyles,
  [`& ${IconVideo}`]: iconStyles,
});

const MetadataText = styled("div", {
  fontSize: "$gr3",
  display: "flex",
  alignItems: "center",
  marginBottom: "$gr2",

  "& span": {
    marginRight: "$gr3",
    color: "$black50",
    display: "flex",
    alignItems: "center",
  },

  [`& ${IconAudio}`]: iconStylesText,
  [`& ${IconImage}`]: iconStylesText,
  [`& ${IconVideo}`]: iconStylesText,
});

export {
  Description,
  ItemImage,
  ItemImageWrapper,
  ItemContent,
  ItemStyled,
  ItemTitle,
  MetadataIcons,
  MetadataText,
};
