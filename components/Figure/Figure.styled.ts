import { VariantProps, styled } from "@/stitches.config";

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
  marginTop: "$3",
  fontSize: "$3",
  fontFamily: "$sansRegular",
  color: "$purple",
  display: "block",
});

const FigureStyled = styled("figure", {
  display: "flex",
  flexDirection: "column",
  paddingBottom: "1rem",
  margin: "0",
  color: "transparent",
  width: "100%",

  figcaption: { display: "flex", flexDirection: "column" },

  [`&[data-orientation=horizontal]`]: {
    flexDirection: "row",
  },

  variants: {
    isPromoted: {
      true: {
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

export { FigureStyled, Image, Title, SupplementalInfo };
