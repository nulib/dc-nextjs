import { FigureStyled, Image, Title, Type } from "./Figure.styled";

export default function Figure({ data }) {
  const { height, title, type } = data;
  return (
    <FigureStyled>
      <Image style={{ width: "100%", height: `${height}px` }} />
      <Title>{title}</Title>
      <Type>{type}</Type>
    </FigureStyled>
  );
}
