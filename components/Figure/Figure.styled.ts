import { styled } from "@/stitches.config";

const FigureStyled = styled("figure", {
  display: "flex",
  flexDirection: "column",
  paddingBottom: "1rem",
  margin: "0",
});

const Image = styled("div", {
  backgroundColor: "$slate11",
});

const Title = styled("span", {
  marginTop: "0.618rem",
  fontSize: "15px",
  fontWeight: "700",
  color: "$slate12",
});

const Type = styled("span", {
  fontSize: "12px",
  color: "$slate10",
  marginTop: "6px",
});

export { FigureStyled, Image, Title, Type };
