import { ActionsDialog } from "@/components/Work/TopInfo";
import React from "react";
import SharedDialog from "@/components/Shared/Dialog";
import WorkDialogCite from "@/components/Work/Dialog/Cite";
import { WorkShape } from "types/components/works";

export interface WorkActionsDialogProps {
  actionsDialog: ActionsDialog;
  close: () => void;
  work: WorkShape;
}

const WorkActionsDialog: React.FC<WorkActionsDialogProps> = ({
  actionsDialog: { activeDialog },
  close,
  work,
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
    <div data-testid="work-actions-dialog">
      <SharedDialog
        handleCloseClick={close}
        isOpen={!!activeDialog}
        large
        title={renderTitle()}
      >
        {activeDialog === "CITE" && <WorkDialogCite work={work} />}
        {activeDialog === "FIND" && <>Find content goes here</>}
        {activeDialog === "DOWNLOAD" && <>Download content goes here</>}
      </SharedDialog>
    </div>
  );
};

export default WorkActionsDialog;
