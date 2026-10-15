import { forwardRef, HTMLAttributes } from "react";
import styles from "./Icon.module.css";
interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  hasSVGPadding?: boolean;
}
const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { children, className, hasSVGPadding = true, ...props },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      data-has-svg-padding={hasSVGPadding}
      data-dc-slot="icon"
      className={[styles.iconStyled, className].filter(Boolean).join(" ")}
    >
      {children}
    </span>
  );
});
export default Icon;
