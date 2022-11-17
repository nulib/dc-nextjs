import {
  FigureStyled,
  FigureVariants,
  Image,
  SupplementalInfo,
  Title,
  TitleWrapper,
} from "@/components/Figure/Figure.styled";
import { IconLock } from "@/components/Shared/SVG/Icons";
import LoadingBox from "@/components/Shared/LoadingBox";
import React from "react";

interface Figure {
  isRestricted?: boolean;
  title: string;
  src: string;
  supplementalInfo?: string;
}

interface FigureProps {
  data: Figure;
  orientation?: "horizontal" | "vertical";
}

const Figure: React.FC<FigureProps & FigureVariants> = (props) => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const { data, orientation } = props;
  const { isRestricted, title, supplementalInfo, src } = data;

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  const handleOnError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    console.error("image loading error");
    // Set a placeholder image if error
    event.currentTarget.src = "/images/book_placeholder.png";
  };

  return (
    <FigureStyled data-orientation={orientation} {...props}>
      {!isLoaded && <LoadingBox />}

      <Image
        src={src}
        alt={title}
        onLoad={handleOnLoad}
        onError={handleOnError}
        {...(isRestricted && { css: { opacity: "0.7" } })}
      />
      <figcaption>
        <TitleWrapper>
          <Title>{title}</Title>
          {supplementalInfo && (
            <SupplementalInfo>{supplementalInfo}</SupplementalInfo>
          )}
        </TitleWrapper>
        {isRestricted && <IconLock aria-hidden="true" />}
      </figcaption>
    </FigureStyled>
  );
};

export default Figure;
