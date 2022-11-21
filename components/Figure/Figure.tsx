import {
  FigureCaption,
  FigureImage,
  FigureImageWrapper,
  FigurePlaceholder,
  FigureStyled,
  FigureSupplementalInfo,
  FigureText,
  FigureTitle,
  FigureVariants,
} from "@/components/Figure/Figure.styled";
import { IconLock } from "@/components/Shared/SVG/Icons";
import React from "react";

interface Figure {
  aspectRatio?: number;
  isRestricted?: boolean;
  src: string;
  supplementalInfo?: string;
  title: string;
}

interface FigureProps {
  data: Figure;
  orientation?: "horizontal" | "vertical";
}

const Figure: React.FC<FigureProps & FigureVariants> = (props) => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const { data, orientation } = props;
  const { aspectRatio, isRestricted, title, supplementalInfo, src } = data;

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  const handleOnError = () => {
    console.error("image loading error");
  };

  return (
    <FigureStyled data-orientation={orientation} {...props}>
      <FigureImageWrapper>
        <FigurePlaceholder ratio={aspectRatio ? aspectRatio : 1}>
          <FigureImage
            src={src}
            alt={title}
            onLoad={handleOnLoad}
            onError={handleOnError}
            isLoaded={isLoaded}
            {...(isRestricted && { css: { opacity: "0.7" } })}
          />
        </FigurePlaceholder>
      </FigureImageWrapper>
      <FigureCaption>
        <FigureText>
          <FigureTitle>{title}</FigureTitle>
          {supplementalInfo && (
            <FigureSupplementalInfo>{supplementalInfo}</FigureSupplementalInfo>
          )}
        </FigureText>
        {isRestricted && <IconLock aria-hidden="true" />}
      </FigureCaption>
    </FigureStyled>
  );
};

export default Figure;
