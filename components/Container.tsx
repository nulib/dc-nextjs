import { styled } from "stitches.config";

const ContainerStyled = styled("div", {
  maxWidth: "calc(90vw + 2rem)",
  position: "relative",
  zIndex: "0",
  margin: "auto calc(5vw - 1rem)",
});

const Container: React.FC = ({ children }) => {
  return <ContainerStyled>{children}</ContainerStyled>;
};

export default Container;
