import { styled } from "../../stitches.config";

const HeadingStyled = styled("span", {
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
