import type { CSSProperties, HTMLAttributes } from "react";
import styles from "./BlurredBgImage.module.css";
interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  bgColor?: string;
  bgImageUrl: string;
  height?: string;
  width?: string;
}
const BlurredBgImage = ({
  bgColor = "transparent",
  bgImageUrl,
  height,
  width,
  className,
  ...props
}: Props) => (
  <div
    data-testid="blurred-bg-image"
    {...props}
    className={[styles.wrapper, className].filter(Boolean).join(" ")}
    style={{ "--blur-background-color": bgColor } as CSSProperties}
  >
    <div
      className={styles.blurredBgImageStyled}
      style={
        {
          "--blur-background-image":
            "url(" + JSON.stringify(bgImageUrl + "?size=20") + ")",
          "--blur-height": height,
          "--blur-width": width,
        } as CSSProperties
      }
    />
  </div>
);
export default BlurredBgImage;
