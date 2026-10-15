import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
  Ref,
} from "react";
import styles from "./Button.module.css";

type Appearance = {
  variant?: "default" | "primary" | "text" | "danger";
  textCase?: "uppercase" | "normal";
};
type ActionProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  disabled?: boolean;
};
export type ButtonProps = Appearance & (ActionProps | LinkProps);

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { variant = "default", textCase = "uppercase", className, ...props },
  ref,
) {
  const classes = [styles.button, className].filter(Boolean).join(" ");
  if (typeof props.href === "string") {
    const { href, disabled, onClick, ...linkProps } = props as LinkProps;
    return (
      <a
        {...linkProps}
        ref={ref as Ref<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : linkProps.tabIndex}
        onClick={(event) => {
          if (disabled) event.preventDefault();
          else onClick?.(event);
        }}
        data-variant={variant}
        data-text-case={textCase}
        className={classes}
      />
    );
  }
  const { type = "button", ...buttonProps } = props as ActionProps;
  return (
    <button
      {...buttonProps}
      ref={ref as Ref<HTMLButtonElement>}
      type={type}
      data-variant={variant}
      data-text-case={textCase}
      className={classes}
    />
  );
});
