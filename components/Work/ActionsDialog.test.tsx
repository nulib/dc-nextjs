import WorkActionsDialog, {
  WorkActionsDialogProps,
} from "@/components/Work/ActionsDialog";
import { render, screen } from "@/test-utils";
import { sampleWork1 } from "@/mocks/sample-work1";

const props: WorkActionsDialogProps = {
  actionsDialog: {
    activeDialog: "CITE",
  },
  close: jest.fn,
  work: sampleWork1,
};

describe("WorkActionsDialog", () => {
  it("renders", () => {
    render(<WorkActionsDialog {...props} />);
    expect(screen.getByTestId("work-actions-dialog"));
  });
});
