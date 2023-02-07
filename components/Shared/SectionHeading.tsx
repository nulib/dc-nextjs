import Heading from "../Heading/Heading";
import Icon from "./Icon";
import { IconArrowForward } from "./SVG/Icons";
import Link from "next/link";
import { styled } from "@/stitches.config";

interface SectionHeadingProps {
  headingText: string;
  linkText: string;
  linkHref: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  headingText,
  linkText,
  linkHref,
}) => {
  return (
    <SectionHeadingStyled>
      <Heading as="h2" css={{ "@sm": { margin: "0 0 $gr2 !important" } }}>
        {headingText}
      </Heading>
      <Link href={linkHref}>
        <SectionHeadingExplore>
          {linkText}
          <Icon>
            <IconArrowForward />
          </Icon>
        </SectionHeadingExplore>
      </Link>
    </SectionHeadingStyled>
  );
};

/* eslint sort-keys: 0 */

const SectionHeadingStyled = styled("div", {
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",

  "@sm": {
    flexDirection: "column",
    marginBottom: "$gr4",
  },
});

const SectionHeadingExplore = styled("span", {
  alignContent: "center",
  alignItems: "center",
  display: "flex",
  height: "$gr4",
  justifyContent: "center",
  lineHeight: "$gr4",
});

export default SectionHeading;
