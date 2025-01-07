import { ActionsDialogAsideStyled } from "@/components/Work/ActionsDialog/ActionsDialog.styled";
import Card from "@/components/Shared/Card";
import { useWorkState } from "@/context/work-context";

interface ActionsDialogAsideProps {
  children?: React.ReactNode | React.ReactNode[];
  dialogSize?: "small" | undefined;
}

const ActionsDialogAside: React.FC<ActionsDialogAsideProps> = ({
  children,
  dialogSize,
}) => {
  const { workState } = useWorkState();
  const { work } = workState;

  const WorkType = () => <>{work?.work_type}</>;

  return (
    <ActionsDialogAsideStyled
      dialogSize={dialogSize}
      data-testid="actions-dialog-aside"
    >
      {work && (
        <Card
          title={work.title || ""}
          imageUrl={work.thumbnail || ""}
          supplementalInfo={<WorkType />}
        />
      )}
      {children}
    </ActionsDialogAsideStyled>
  );
};

export default ActionsDialogAside;
