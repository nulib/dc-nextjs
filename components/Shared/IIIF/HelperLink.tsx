import IIIFLogo from "../SVG/IIIF";
import Icon from "../Icon";
import { IconExternalLink } from "../SVG/Icons";
import Link from "next/link";
import { styled } from "@/stitches.config";

const IIIFShareHelperLink = () => {
  return (
    <StyledIIIFShareHelperLink
      href="https://iiif.io/get-started/why-iiif/"
      target="_blank"
      rel="noreferrer"
      data-id="what-is-iiif"
    >
      <StyledIIIFShareHelperLinkContent>
        What is IIIF?
        <Icon
          style={{
            display: "inline-flex",
            width: "12px",
            height: "12px",
            color: "$black50",
            fill: "$black50",
            marginLeft: "0.25em",
          }}
          hasSVGPadding={false}
        >
          <IconExternalLink />
        </Icon>
      </StyledIIIFShareHelperLinkContent>
    </StyledIIIFShareHelperLink>
  );
};

const StyledIIIFShareHelperLink = styled(Link, {
  svg: {
    width: "17px",
    height: "17px",

    path: {
      fill: "$purple !important",
    },
  },
});

const StyledIIIFShareHelperLinkContent = styled("span", {
  display: "flex",
  gap: "$gr1",
  fontSize: "$gr2",
  alignItems: "center",
});

export default IIIFShareHelperLink;
