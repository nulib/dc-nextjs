import { VariantProps, styled } from "@/stitches.config";
import { IconLock } from "@/components/Shared/SVG/Icons";

/* eslint sort-keys: 0 */

const Image = styled("img", {
  backgroundColor: "$black50",
  objectFit: "cover",
  borderRadius: "3px",
});

const SupplementalInfo = styled("span", {
  fontSize: "$2",
  color: "$black50",
  marginTop: "6px",
  display: "block",
  fontFamily: "$sansLight",
});

const Title = styled("span", {
  fontSize: "$3",
  fontFamily: "$sansRegular",
  color: "$purple",
  display: "flex",
  alignItems: "flex-start",
});

const TitleWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
});

IconLock.toString = () => ".icon-lock";

const FigureStyled = styled("figure", {
  display: "flex",
  flexDirection: "column",
  paddingBottom: "1rem",
  position: "relative",
  margin: "0",
  color: "transparent",
  width: "100%",

  figcaption: {
    marginTop: "$3",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  [`&[data-orientation=horizontal]`]: {
    flexDirection: "row",
  },

  [`& ${IconLock}`]: {
    width: "28px",
    flexShrink: 0,
    fill: "white",
    marginRight: "$gr1",
    marginTop: "-28px",
    padding: "6px",
    backgroundColor: "$purple",
    borderRadius: "50%",
    zIndex: "1",
  },

  variants: {
    isPromoted: {
      true: {
        [`& ${Image}`]: { maxHeight: "200px" },

        [`& ${Title}`]: {
          fontSize: "$5",
          fontFamily: "$displayBold",
        },

        [`& ${SupplementalInfo}`]: {
          fontSize: "$3",
        },
      },
    },
  },
});

export type FigureVariants = VariantProps<typeof FigureStyled>;

export { FigureStyled, Image, Title, TitleWrapper, SupplementalInfo };
