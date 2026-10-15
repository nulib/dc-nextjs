import React, { forwardRef, HTMLAttributes } from "react";
import styles from "./Heading.module.css";
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  isHidden?: boolean;
}
const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { as: Tag = "h2", isHidden = false, className, children, ...props },
  ref,
) {
  return (
    <Tag
      {...props}
      ref={ref}
      data-is-hidden={isHidden}
      data-level={Tag}
      data-dc-slot="heading"
      className={[styles.styledHeading, className].filter(Boolean).join(" ")}
    >
      {children}
    </Tag>
  );
});
export default Heading;
