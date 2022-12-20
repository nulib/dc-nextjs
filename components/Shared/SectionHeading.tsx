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
      <Heading as="h2">{headingText}</Heading>
      <Link href={linkHref}>
        <a>
          <SectionHeadingExplore>
            {linkText}
            <Icon>
              <IconArrowForward />
            </Icon>
          </SectionHeadingExplore>
        </a>
      </Link>
    </SectionHeadingStyled>
  );
};

const SectionHeadingStyled = styled("div", {
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
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
