import WorkActionsDialog, {
  WorkActionsDialogProps,
} from "@/components/Work/ActionsDialog/ActionsDialog";
import { render, screen } from "@/test-utils";

const props: WorkActionsDialogProps = {
  actionsDialog: {
    activeDialog: "CITE",
  },
  close: jest.fn,
};

describe("WorkActionsDialog", () => {
  it("renders", () => {
    render(<WorkActionsDialog {...props} />);
    expect(screen.getByTestId("work-actions-dialog"));
  });
});
