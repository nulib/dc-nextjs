import { ActionsDialog } from "@/components/Work/TopInfo";
import DownloadAndShare from "@/components/Work/ActionsDialog/DownloadAndShare/DownloadAndShare";
import React from "react";
import SharedDialog from "@/components/Shared/Dialog";
import WorkDialogCite from "@/components/Work/ActionsDialog/Cite";
import WorkDialogFind from "@/components/Work/ActionsDialog/Find";

export interface WorkActionsDialogProps {
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

  function renderContent() {
    switch (activeDialog) {
      case "CITE":
        return <WorkDialogCite />;
      case "FIND":
        return <WorkDialogFind />;
      case "DOWNLOAD":
        return <DownloadAndShare />;
    }
  }

  return (
    <div data-testid="work-actions-dialog">
      <SharedDialog
        handleCloseClick={close}
        isOpen={!!activeDialog}
        large
        title={renderTitle()}
      >
        {renderContent()}
      </SharedDialog>
    </div>
  );
};

export default WorkActionsDialog;
