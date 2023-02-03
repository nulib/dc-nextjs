import { ActionsDialogAsideStyled } from "@/components/Work/ActionsDialog/ActionsDialog.styled";
import Card from "@/components/Shared/Card";
import { useWorkState } from "@/context/work-context";

interface ActionsDialogAsideProps {
  children?: React.ReactNode | React.ReactNode[];
}

const ActionsDialogAside: React.FC<ActionsDialogAsideProps> = ({
  children,
}) => {
  const { workState } = useWorkState();
  const { work } = workState;

  const WorkType = () => <>{work?.work_type}</>;

  return (
    <ActionsDialogAsideStyled data-testid="actions-dialog-aside">
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
