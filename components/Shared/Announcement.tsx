import { forwardRef, HTMLAttributes } from "react";
import styles from "./Announcement.module.css";
const Announcement = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function Announcement({ children, className, ...props }, ref) {
    return (
      <section
        {...props}
        ref={ref}
        className={[styles.announcementStyled, className]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.contentWrapper}>{children}</div>
      </section>
    );
  },
);
export default Announcement;
