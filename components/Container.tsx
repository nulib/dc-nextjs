import { ReactChildren } from "react";
import { styled } from "@/stitches.config";

export const ContainerStyled = styled("div", {
  margin: "0 auto",
  width: "100%",

  variants: {
    containerType: {
      default: {
        maxWidth: "1120px",
      },
      wide: {
        maxWidth: "1440px",
      },
    },
  },
});
interface ContainerProps {
  containerType?: "default" | "wide";
}

const Container: React.FC<ContainerProps> = ({
  children,
  containerType = "default",
}) => {
  return (
    <ContainerStyled containerType={containerType}>{children}</ContainerStyled>
  );
};

export default Container;
