import { FigureStyled, Image, Title, Type } from "./Figure.styled";

interface Figure {
  title: string;
  type: string;
  src: string;
}
interface FigureProps {
  data: Figure;
}

const Figure: React.FC<FigureProps> = ({ data }) => {
  const { title, type, src } = data;
  return (
    <FigureStyled>
      <Image style={{ width: "100%", height: "200px" }} />
      <Title>{title}</Title>
      <Type>{type}</Type>
    </FigureStyled>
  );
};

export default Figure;
