import { ActionsDialog } from "@/components/Work/TopInfo";
import SharedDialog from "@/components/Shared/Dialog";

interface WorkActionsDialogProps {
  actionsDialog: ActionsDialog;
  close: () => void;
}

const WorkActionsDialog: React.FC<WorkActionsDialogProps> = ({
  actionsDialog: { activeDialog },
  close,
}) => {
  function renderTitle() {
    switch (activeDialog) {
      case "CITE":
        return "Cite this item";
      case "FIND":
        return "Find this item";
      case "DOWNLOAD":
        return "Download this item";
      default:
        return "";
    }
  }

  return (
    <SharedDialog
      handleCloseClick={close}
      isOpen={!!activeDialog}
      title={renderTitle()}
    >
      {activeDialog === "CITE" && <>Cite content goes here</>}
      {activeDialog === "FIND" && <>Find content goes here</>}
      {activeDialog === "DOWNLOAD" && <>Download content goes here</>}
    </SharedDialog>
  );
};

export default WorkActionsDialog;
