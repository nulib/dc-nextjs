import { FigureStyled, Image, Title, Type } from "./Figure.styled";

interface Figure {
  height: string;
  title: string;
  type: string;
}
interface FigureProps {
  data: Figure;
}

const Figure: React.FC<FigureProps> = ({ data }) => {
  const { height, title, type } = data;
  return (
    <FigureStyled>
      {/* eslint-disable-next-line */}
      <Image style={{ width: "100%", height: `${height}px` }} />
      <Title>{title}</Title>
      <Type>{type}</Type>
    </FigureStyled>
  );
};

export default Figure;
