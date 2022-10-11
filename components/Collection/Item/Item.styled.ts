import Image from "next/image";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ItemImage = styled(Image, {
  flexGrow: "0",
});

const ItemImageWrapper = styled("div", {
  display: "flex",
  width: "150px",
  flexShrink: "0",
  margin: "$gr3 0",
  borderRadius: "3px",
  overflow: "hidden",
  flexDirection: "column",
});

const ItemContent = styled("div", {
  paddingLeft: "$gr4",
  lineHeight: "1.55",

  h2: {
    fontSize: "$gr5",
    fontFamily: "$displayBold",
    fontWeight: "400",
    marginBottom: "$gr2",
    color: "$purple",
  },

  p: {
    fontSize: "$gr3",
    fontFamily: "$sansLight",
    margin: "0",

    "a, a:visited": {
      color: "$purple",
      cursor: "pointer",
    },
  },
});

const ItemStyled = styled("article", {
  display: "flex",
  marginBottom: "$gr3",
});

export { ItemImage, ItemImageWrapper, ItemContent, ItemStyled };
