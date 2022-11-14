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
  margin: "0 0 $gr3 0",
  borderRadius: "3px",
  overflow: "hidden",
  flexDirection: "column",
});

const ItemContent = styled("div", {
  paddingLeft: "$gr4",
});

const ItemTitle = styled("h3", {
  fontSize: "$gr5",
  marginTop: 0,
});

const ItemStyled = styled("article", {
  display: "flex",
  marginBottom: "$gr3",
});

export { ItemImage, ItemImageWrapper, ItemContent, ItemStyled, ItemTitle };
