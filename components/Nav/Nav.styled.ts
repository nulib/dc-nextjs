import { styled } from "@/stitches.config";

const NavStyled = styled("nav", {
  display: "flex",
  alignItems: "center",
  flexShrink: "1",
  flexGrow: "0",

  a: {
    padding: "0 1.618rem",
  },
});

export { NavStyled };
