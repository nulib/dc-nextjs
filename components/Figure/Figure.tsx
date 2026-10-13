import NextImage from "next/image";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import styles from "@/components/Figure/Figure.module.css";
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
  isPromoted?: boolean;
  data: Figure;
  orientation?: "horizontal" | "vertical";
  hideCaption?: boolean;
}
const Figure: React.FC<FigureProps> = (props) => {
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
    <figure
      data-orientation={orientation}
      data-dc-slot="figure"
      className={styles.figureStyled}
    >
      <div
        data-dc-slot="figure-image-wrapper"
        className={styles.figureImageWrapper}
      >
        <AspectRatioPrimitive.Root
          ratio={aspectRatio ? aspectRatio : 1}
          className={styles.figurePlaceholder}
        >
          {!data.priority && (
            <NextImage
              alt=""
              fill={true}
              sizes={srcSetSizes}
              src={lqip.toString()}
              priority={true}
              unoptimized={true}
              className={styles.figureLQIP}
            />
          )}

          <NextImage
            alt={title}
            fill={true}
            data-is-loaded={isLoaded}
            onLoad={handleOnLoad}
            onError={handleOnError}
            sizes={srcSetSizes}
            src={src}
            unoptimized={true}
            priority={data.priority ?? false}
            className={styles.figureImage}
          />
        </AspectRatioPrimitive.Root>
      </div>
      {!hideCaption && (
        <figcaption
          data-dc-slot="figure-caption"
          className={styles.figureCaption}
        >
          <div className={styles.figureText}>
            <span data-dc-slot="figure-title" className={styles.figureTitle}>
              {title}
            </span>
            {supplementalInfo && (
              <span className={styles.figureSupplementalInfo}>
                {supplementalInfo}
              </span>
            )}
          </div>
          {isRestricted && <IconLock aria-hidden="true" />}
        </figcaption>
      )}
    </figure>
  );
};
export default Figure;
