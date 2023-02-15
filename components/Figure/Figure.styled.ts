import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { VariantProps, styled } from "@/stitches.config";
import { IconLock } from "@/components/Shared/SVG/Icons";
import Image from "next/image";

/* eslint sort-keys: 0 */

IconLock.toString = () => ".icon-lock";

const FigureImage = styled(Image, {
  display: "flex",
  borderRadius: "3px",
  transition: "$dcImageLoad",
  opacity: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: "1",

  variants: {
    isLoaded: {
      true: {
        opacity: "1",
      },
      false: {
        opacity: "0",
      },
    },
  },
});

const FigureLQIP = styled(Image, {
  display: "flex",
  borderRadius: "3px",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: "0",
});

const FigureImageWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  borderRadius: "3px",
});

const FigureCaption = styled("figcaption", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  position: "relative",
  zIndex: "0",

  [`& ${IconLock}`]: {
    position: "absolute",
    right: "$gr1",
    width: "$gr4",
    height: "$gr4",
    flexShrink: 0,
    flexGrow: "0",
    marginTop: "-$gr3",
    padding: "$gr1",
    fill: "$black50",
    backgroundColor: "$white",
    boxShadow: "1px 1px 2px #0003",
    borderRadius: "50%",
    zIndex: "1",
  },
});

const FigurePlaceholder = styled(AspectRatio.Root, {
  backgroundColor: "$black10",
  borderRadius: "3px",
  zIndex: "0",
});

const FigureSupplementalInfo = styled("span", {
  fontSize: "$gr2",
  color: "$black50",
  marginTop: "$gr1",
  display: "block",
  fontFamily: "$northwesternSansLight",
});

const FigureTitle = styled("span", {
  marginTop: "$gr3",
  fontSize: "$gr3",
  fontFamily: "$northwesternSansRegular",
  color: "$purple",
  display: "flex",
  alignItems: "flex-start",
});

const FigureText = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const FigureStyled = styled("figure", {
  display: "flex",
  flexDirection: "column",
  paddingBottom: "$gr4",
  margin: "0",
  color: "transparent",
  width: "100%",
  position: "relative",

  [`&[data-orientation=horizontal]`]: {
    flexDirection: "row",
  },

  variants: {
    isPromoted: {
      true: {
        paddingBottom: "$gr3",

        [`& ${FigureTitle}`]: {
          fontSize: "$5",
          fontFamily: "$northwesternDisplayBook",
        },

        [`& ${FigureSupplementalInfo}`]: {
          fontSize: "$2",
        },
      },
    },
  },
});

export type FigureVariants = VariantProps<typeof FigureStyled>;

export {
  FigureCaption,
  FigureImage,
  FigureImageWrapper,
  FigureLQIP,
  FigurePlaceholder,
  FigureStyled,
  FigureSupplementalInfo,
  FigureText,
  FigureTitle,
};
