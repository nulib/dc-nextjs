import styles from "@/components/Work/ActionsDialog/ActionsDialog.module.css";
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
    <aside
      data-testid="actions-dialog-aside"
      className={styles.actionsDialogAsideStyled}
    >
      {work && (
        <Card title={work.title || ""} imageUrl={work.thumbnail || ""} />
      )}
      {children}
    </aside>
  );
};
export default ActionsDialogAside;
