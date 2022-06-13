import * as Dialog from "@radix-ui/react-dialog";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "@/components/Shared/Dialog.styled";
import { IconClear } from "@/components/Shared/SVG/Icons";
import { ReactNode } from "react";

interface SharedDialogProps {
  children: ReactNode;
  handleCloseClick: () => void;
  isOpen: boolean;
  title: string;
}

const SharedDialog: React.FC<SharedDialogProps> = ({
  children,
  handleCloseClick,
  isOpen,
  title,
}) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent onInteractOutside={handleCloseClick}>
          <DialogHeader>
            <Dialog.Title>{title}</Dialog.Title>
            <DialogClose
              data-testid="facets-filter-close"
              aria-label="Cancel"
              onClick={handleCloseClick}
            >
              <IconClear />
            </DialogClose>
          </DialogHeader>
          <DialogBody>{children}</DialogBody>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SharedDialog;
