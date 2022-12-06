import { linkStyling } from "@/components/Shared/LinkStyled";
import { styled } from "@/stitches.config";

const LinkItemStyled = styled("div", {
  [`& a`]: {
    ...linkStyling,
    display: "inline-block",
    fontFamily: "$northwesternSansRegular",
    marginBottom: "$gr1",
  },
});

export { LinkItemStyled };
