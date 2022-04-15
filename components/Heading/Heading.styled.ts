import { styled } from "../../stitches.config";

const HeadingStyled = styled("h1", {
  variants: {
    isHidden: {
      true: {
        position: "absolute",
        visibility: "hidden",
      },
    },
  },
});

export { HeadingStyled };
