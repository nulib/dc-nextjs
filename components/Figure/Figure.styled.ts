import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const FigureStyled = styled("figure", {
  display: "flex",
  flexDirection: "column",
  paddingBottom: "1rem",
  margin: "0",
});

const Image = styled("img", {
  backgroundColor: "$slate11",
});

const SupplementalInfo = styled("span", {
  fontSize: "12px",
  color: "$slate10",
  marginTop: "6px",
});

const Title = styled("span", {
  marginTop: "0.618rem",
  fontSize: "15px",
  fontWeight: "700",
  color: "$slate12",
});

export { FigureStyled, Image, Title, SupplementalInfo };
