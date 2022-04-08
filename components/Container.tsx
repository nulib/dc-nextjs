import { styled } from "@/stitches.config";

const ContainerStyled = styled("div", {
  maxWidth: "90vw",
  position: "relative",
  zIndex: "0",
  margin: "auto 5vw",
});

const Container: React.FC = ({ children }) => {
  return <ContainerStyled>{children}</ContainerStyled>;
};

export default Container;
