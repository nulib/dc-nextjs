import { styled } from "../../stitches.config";

const StyledHeading = styled("h2", {
  variants: {
    isHidden: {
      true: {
        position: "absolute",
        visibility: "hidden",
      },
    },
  },
});

export { StyledHeading };
