import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { VariantProps, styled } from "@/stitches.config";
import { IconLock } from "@/components/Shared/SVG/Icons";

/* eslint sort-keys: 0 */

IconLock.toString = () => ".icon-lock";

const FigureImage = styled("img", {
  display: "flex",
  borderRadius: "3px",
  transition: "$dcAll",
  opacity: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",

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
        [`& ${FigureTitle}`]: {
          fontSize: "$5",
          fontFamily: "$northwesternDisplayBold",
        },

        [`& ${FigureSupplementalInfo}`]: {
          fontSize: "$3",
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
  FigurePlaceholder,
  FigureStyled,
  FigureSupplementalInfo,
  FigureText,
  FigureTitle,
};
