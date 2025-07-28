import {
  FigureCaption,
  FigureImage,
  FigureImageWrapper,
  FigureLQIP,
  FigurePlaceholder,
  FigureStyled,
  FigureSupplementalInfo,
  FigureText,
  FigureTitle,
  FigureVariants,
} from "@/components/Figure/Figure.styled";
import React, { ReactNode } from "react";

import { IconLock } from "@/components/Shared/SVG/Icons";
import { width } from "@/styles/media";

interface Figure {
  aspectRatio?: number;
  isRestricted?: boolean;
  src: string;
  supplementalInfo?: ReactNode;
  title: string;
  priority?: boolean;
}

interface FigureProps {
  data: Figure;
  orientation?: "horizontal" | "vertical";
  hideCaption?: boolean;
}

const Figure: React.FC<FigureProps & FigureVariants> = (props) => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const { data, orientation, hideCaption } = props;
  const { aspectRatio, isRestricted, title, supplementalInfo, src } = data;

  if (!src) return null;

  const handleOnLoad = () => setIsLoaded(true);
  const handleOnError = () => console.error("image loading error");

  const lqip = new URL(src);
  lqip.searchParams.set("size", "3");

  const srcSetSizes = `(max-width: ${width.xxs}px) 100vw`;

  return (
    <FigureStyled data-orientation={orientation} {...props}>
      <FigureImageWrapper>
        <FigurePlaceholder ratio={aspectRatio ? aspectRatio : 1}>
          {!data.priority && (
            <FigureLQIP
              alt=""
              fill={true}
              sizes={srcSetSizes}
              src={lqip.toString()}
              priority={true}
              unoptimized={true}
            />
          )}

          <FigureImage
            alt={title}
            fill={true}
            isLoaded={isLoaded}
            onLoad={handleOnLoad}
            onError={handleOnError}
            sizes={srcSetSizes}
            src={src}
            unoptimized={true}
            priority={data.priority ?? false}
          />
        </FigurePlaceholder>
      </FigureImageWrapper>
      {!hideCaption && (
        <FigureCaption>
          <FigureText>
            <FigureTitle>{title}</FigureTitle>
            {supplementalInfo && (
              <FigureSupplementalInfo>
                {supplementalInfo}
              </FigureSupplementalInfo>
            )}
          </FigureText>
          {isRestricted && <IconLock aria-hidden="true" />}
        </FigureCaption>
      )}
    </FigureStyled>
  );
};

export default Figure;
