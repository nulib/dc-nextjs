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

  return (
    <ActionsDialogAsideStyled data-testid="actions-dialog-aside">
      {work && (
        <Card
          title={work.title}
          imageUrl={work.thumbnail}
          supplementalInfo={work.work_type}
        />
      )}
      {children}
    </ActionsDialogAsideStyled>
  );
};

export default ActionsDialogAside;
