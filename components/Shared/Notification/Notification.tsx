import { forwardRef, HTMLAttributes, useState } from "react";
import { IconClear } from "@/components/Shared/SVG/Icons";
import styles from "./Notification.module.css";
export interface NotificationProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "warning" | "danger";
  dismissible?: boolean;
}
export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  function Notification(
    { children, tone = "default", dismissible = false, className, ...props },
    ref,
  ) {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;
    return (
      <div
        {...props}
        ref={ref}
        data-tone={tone}
        className={[styles.notification, className].filter(Boolean).join(" ")}
      >
        {dismissible && (
          <button
            type="button"
            className={styles.close}
            aria-label="Close"
            onClick={() => setVisible(false)}
          >
            <IconClear />
          </button>
        )}
        {children}
      </div>
    );
  },
);
