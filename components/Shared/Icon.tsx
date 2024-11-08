import { CSS } from "@stitches/react";
import { ReactNode } from "react";
import { styled } from "@/stitches.config";

interface IconProps {
  children: ReactNode;
  style?: CSS;
  hasSVGPadding?: boolean;
}

const Icon: React.FC<IconProps> = ({
  children,
  style,
  hasSVGPadding = true,
}) => {
  return (
    <IconStyled css={{ ...style }} hasSVGPadding={hasSVGPadding}>
      {children}
    </IconStyled>
  );
};

/* eslint sort-keys: 0 */

export const IconStyled = styled("span", {
  display: "flex",
  height: "31px",
  width: "31px",
  objectFit: "contain",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  backgroundColor: "transparent",
  color: "$purple60",
  fill: "$purple60",
  stroke: "$purple60",
  transition: "all 200ms ease-in-out",

  svg: {
    height: "100%",
    width: "100%",
    transition: "all 200ms ease-in-out",
    color: "inherit",
    fill: "inherit",
    stroke: "inherit",
  },

  variants: {
    hasSVGPadding: {
      true: {
        svg: {
          padding: "0.5em",
        },
      },
      false: {
        svg: {
          padding: "0",
        },
      },
    },
  },
});

export default Icon;
