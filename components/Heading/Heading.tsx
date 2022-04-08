import React from "react";
import { HeadingStyled } from "./Heading.styled";

interface HeadingProps {
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  isHidden?: boolean;
  title: string;
}

const Heading: React.FC<HeadingProps> = ({
  element = "h2",
  isHidden = false,
  title,
}) => (
  <HeadingStyled as={element} isHidden={isHidden}>
    {title}
  </HeadingStyled>
);

export default Heading;
