import Container from "@/components/Shared/Container";
import { HeadingSlashTitleStyled } from "@/components/Heading/SlashTitle.styled";
import { HeadingSubheadStyled } from "@/components/Heading/Subhead";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

interface SectionTopProps {
  children: React.ReactNode;
}

const SectionTop: React.FC<SectionTopProps> = ({ children }) => {
  return (
    <SectionTopStyled>
      <Container maxWidth={1120}>{children}</Container>
    </SectionTopStyled>
  );
};

const SectionTitle = HeadingSlashTitleStyled;
const SectionSubhead = HeadingSubheadStyled;

const SectionTopStyled = styled("section", {
  marginTop: "3rem",
  marginBottom: "3rem",
  textAlign: "center",
  padding: "1 rem",

  [`& ${SectionTitle}`]: {
    color: "$purple",
  },

  [`& ${SectionSubhead}`]: {
    color: "$purple",
    maxWidth: "850px",
    display: "inline-block",
    margin: "$gr1 0 $gr1",

    "@sm": {
      fontSize: "$gr7",
    },
  },
});

export { SectionSubhead, SectionTopStyled, SectionTitle };
export default SectionTop;
