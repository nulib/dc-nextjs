import { CSSProperties, forwardRef, HTMLAttributes } from "react";
import styles from "./Container.module.css";
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  containerType?: "default" | "wide";
  isFlex?: boolean;
  maxWidth?: number;
}
const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  {
    children,
    className,
    containerType = "default",
    isFlex = false,
    maxWidth,
    ...props
  },
  ref,
) {
  // A measured width keeps the fixed search controls aligned to their container.
  const width = {
    "--container-max-width": maxWidth ? maxWidth + "px" : undefined,
  } as CSSProperties;
  return (
    <div
      {...props}
      ref={ref}
      data-container-type={containerType}
      data-is-flex={isFlex}
      style={width}
      data-dc-slot="container"
      className={[styles.containerStyled, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
});
export default Container;
