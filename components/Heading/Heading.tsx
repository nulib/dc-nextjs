import React from "react";
import { HeadingStyled } from "./Heading.styled";

interface HeadingProps {
  isHidden?: boolean;
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title, isHidden = false }) => (
  <HeadingStyled isHidden={isHidden}>{title}</HeadingStyled>
);

export default Heading;
