import styles from "@/components/Shared/PhotoFeature/PhotoFeature.module.css";
import Link from "next/link";
import React, { CSSProperties } from "react";
export interface PhotoFeatureProps {
  callToAction: string;
  href: string;
  imgAlt?: string;
  imgSrc: string;
  shortDescription?: string;
  title: string;
}
const PhotoFeature: React.FC<PhotoFeatureProps> = ({
  callToAction,
  href,
  imgSrc,
  shortDescription,
  title,
}) => {
  return (
    <Link href={href}>
      <article
        style={
          {
            "--photo-background": `url(${JSON.stringify(imgSrc)})`,
          } as CSSProperties
        }
        className={styles.photoFeatureStyled}
      >
        <div className={styles.textOverImage}>
          <h3>{title}</h3>
          {shortDescription && (
            <div className={"description"}>{shortDescription}</div>
          )}
          <div className={"cta"}>{callToAction}</div>
        </div>
      </article>
    </Link>
  );
};
export default PhotoFeature;
