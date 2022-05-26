import { FigureStyled, Image, SupplementalInfo, Title } from "./Figure.styled";

interface Figure {
  title: string;
  src: string;
  supplementalInfo?: string;
}
interface FigureProps {
  data: Figure;
}

const Figure: React.FC<FigureProps> = ({ data }) => {
  const { title, supplementalInfo, src } = data;
  return (
    <FigureStyled>
      <Image src={src} style={{ width: "100%" }} alt={title} />
      <Title>{title}</Title>
      {supplementalInfo && (
        <SupplementalInfo>{supplementalInfo}</SupplementalInfo>
      )}
    </FigureStyled>
  );
};

export default Figure;
