import { Metadata } from "@samvera/clover-iiif/primitives";
import { linkStyling } from "@/components/Shared/LinkStyled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const LinkItemStyled = styled("div", {
  position: "relative",
  zIndex: "0",
  paddingLeft: "$gr4",
  marginTop: "$gr1",

  "&::before": {
    display: "block",
    content: "",
    width: "$gr1",
    height: "$gr1",
    borderRadius: "100%",
    backgroundColor: "$purple10",
    position: "absolute",
    top: "10px",
    left: "$gr1",
  },

  [`& a`]: {
    ...linkStyling,
    display: "inline-block",
    fontFamily: "$northwesternSansRegular",
  },
});

const MetadataStyled = styled(Metadata, {
  "[data-label=last-modified]": {
    display: "none",
  },
});

export { LinkItemStyled, MetadataStyled };
