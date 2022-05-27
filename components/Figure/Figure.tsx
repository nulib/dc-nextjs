import { FigureStyled, Image, SupplementalInfo, Title } from "./Figure.styled";

interface Figure {
  title: string;
  src: string;
  supplementalInfo?: string;
}

interface FigureProps {
  data: Figure;
  orientation?: "horizontal" | "vertical";
}

const Figure: React.FC<FigureProps> = ({ data, orientation = "vertical" }) => {
  const { title, supplementalInfo, src } = data;
  return (
    <FigureStyled data-orientation={orientation}>
      <Image src={src} alt={title} />
      <figcaption>
        <Title>{title}</Title>
        {supplementalInfo && (
          <SupplementalInfo>{supplementalInfo}</SupplementalInfo>
        )}
      </figcaption>
    </FigureStyled>
  );
};

export default Figure;
