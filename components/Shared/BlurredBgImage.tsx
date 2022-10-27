import { BlurredBgImageStyled } from "./BlurredBgImage.styled";
import React from "react";

interface Props {
  bgColor?: string;
  bgImageUrl: string;
  height?: string;
  width?: string;
}

const BlurredBgImage: React.FC<Props> = ({
  bgColor = "transparent",
  bgImageUrl,
  height,
  width,
  ...restProps
}) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        overflow: "hidden",
      }}
      data-testid="blurred-bg-image"
      {...restProps}
    >
      <BlurredBgImageStyled
        css={{
          backgroundImage: `url(${bgImageUrl}?size=20)`,
          height,
          width,
        }}
      />
    </div>
  );
};

export default BlurredBgImage;
