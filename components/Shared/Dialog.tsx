import styles from "@/components/Shared/Dialog.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { IconClear } from "@/components/Shared/SVG/Icons";
import { ReactNode } from "react";
interface SharedDialogProps {
  children: ReactNode;
  handleCloseClick: () => void;
  isOpen: boolean;
  size?: "small" | "large";
  title: string;
}
const SharedDialog: React.FC<SharedDialogProps> = ({
  children,
  handleCloseClick,
  size,
  isOpen,
  title,
}) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content
          onInteractOutside={handleCloseClick}
          data-size={size}
          className={styles.dialogContent}
        >
          <header className={styles.dialogHeader}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Close
              data-testid="facets-filter-close"
              aria-label="Cancel"
              onClick={handleCloseClick}
              className={styles.dialogClose}
            >
              <IconClear />
            </Dialog.Close>
          </header>
          <div className={styles.dialogBody}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default SharedDialog;
