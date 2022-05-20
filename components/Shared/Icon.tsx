import { styled } from "@/stitches.config";

const Icon: React.FC = ({ children }) => {
  return <IconStyled>{children}</IconStyled>;
};

/* eslint sort-keys: 0 */

export const IconStyled = styled("span", {
  display: "flex",
  height: "31px",
  width: "31px",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  backgroundColor: "transparent",
  fill: "$purple60",
  stroke: "$purple60",
  transition: "all 200ms ease-in-out",

  svg: {
    transition: "all 200ms ease-in-out",
    fill: "inherit",
    stroke: "inherit",
    padding: "8px",
  },
});

export default Icon;
