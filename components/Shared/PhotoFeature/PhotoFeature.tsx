import Link from "next/link";
import React from "react";
import { styled } from "@/stitches.config";

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
    (<Link href={href}>

      <PhotoFeatureStyled css={{ backgroundImage: `url(${imgSrc})` }}>
        <TextOverImage>
          <h3>{title}</h3>
          {shortDescription && (
            <div className="description">{shortDescription}</div>
          )}
          <div className="cta">{callToAction}</div>
        </TextOverImage>
      </PhotoFeatureStyled>

    </Link>)
  );
};

/* eslint sort-keys: 0 */

const PhotoFeatureStyled = styled("article", {
  display: "block",
  width: "720px",
  maxWidth: "50vw",
  height: "350px",
  position: "relative",
  overflow: "hidden",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",

  "@sm": {
    maxWidth: "100vw",
  },

  "&::after": {
    content: " ",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: "inherit",
    backgroundSize: "cover",
    transformOrigin: "center",
    transition: "transform 0.5s ease-in-out",
  },

  "&:hover": {
    "&::after": {
      transform: "scale(1.025)",
    },
  },

  "&::before": {
    content: " ",
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)",
    zIndex: "1",
  },
});

const TextOverImage = styled("div", {
  width: "100%",
  color: "$white",
  padding: "0 $gr3 $gr3 $gr4",
  position: "absolute",
  bottom: "$gr1",
  zIndex: "31",

  "& h3": {
    color: "$white",
    fontSize: "$gr6",
    //fontFamily: "$northwesternDisplayBold",
    marginBottom: "$gr2",
    lineHeight: "1",
    textShadow: "2px 2px 0x #000",
  },

  "& .description": {
    marginBottom: "$gr3",
  },

  "& .cta": {
    fontSize: "$gr3",
    textTransform: "uppercase",
  },
});

export default PhotoFeature;
