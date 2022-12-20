import React, { ReactNode } from "react";
import { StyledHeading } from "./Heading.styled";

interface HeadingProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  isHidden?: boolean;
  children: ReactNode | ReactNode[];
}

const Heading: React.FC<HeadingProps> = ({
  as = "h2",
  isHidden = false,
  children,
}) => (
  <StyledHeading as={as} isHidden={isHidden} data-level={as}>
    <>{children}</>
  </StyledHeading>
);

export default Heading;
