import { styled } from "@/stitches.config";

interface HeadingSubheadProps {
  children: React.ReactNode;
}

const HeadingSubhead: React.FC<HeadingSubheadProps> = ({ children }) => {
  return <HeadingSubheadStyled>{children}</HeadingSubheadStyled>;
};

/* eslint sort-keys: 0 */

const HeadingSubheadStyled = styled("p", {
  fontSize: "$gr8",
  fontFamily: "$displayExtraLight",
  lineHeight: "1.2em",
  marginBottom: "$gr3",
});

export { HeadingSubheadStyled };
export default HeadingSubhead;
