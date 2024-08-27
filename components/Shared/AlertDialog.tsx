import * as AlertDialog from "@radix-ui/react-alert-dialog";

import {
  AlertDialogButtonRow,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/Shared/AlertDialog.styled";

import { Button } from "@nulib/design-system";
import { ReactNode } from "react";

type DialogButton = {
  label: string;
  onClick: () => void;
};

interface SharedAlertDialogProps {
  children: ReactNode;
  action: DialogButton;
  cancel?: DialogButton;
  isOpen: boolean;
  size?: "small" | "large";
  title?: string;
}

export default function SharedAlertDialog({
  children,
  action,
  cancel,
  isOpen,
  title,
}: SharedAlertDialogProps) {
  const cancelLabel = cancel?.label || "Cancel";

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}

          <AlertDialog.Description>{children}</AlertDialog.Description>
          <AlertDialogButtonRow>
            {cancel && (
              <Button isText onClick={cancel?.onClick}>
                {cancelLabel}
              </Button>
            )}

            <AlertDialog.Action asChild>
              <Button isPrimary onClick={action.onClick}>
                {action.label}
              </Button>
            </AlertDialog.Action>
          </AlertDialogButtonRow>
        </AlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
