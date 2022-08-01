import {
  FigureStyled,
  FigureVariants,
  Image,
  SupplementalInfo,
  Title,
} from "@/components/Figure/Figure.styled";

interface Figure {
  title: string;
  src: string;
  supplementalInfo?: string;
}

interface FigureProps {
  data: Figure;
  orientation?: "horizontal" | "vertical";
}

const Figure: React.FC<FigureProps & FigureVariants> = (props) => {
  const { data, orientation } = props;
  const { title, supplementalInfo, src } = data;

  return (
    <FigureStyled data-orientation={orientation} {...props}>
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
