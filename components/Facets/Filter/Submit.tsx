import styles from "@/components/Facets/Filter/Submit.module.css";
import { Button } from "@/components/Shared/Button/Button";
import { SetIsModalOpenType } from "@/components/Facets/Filter/Modal";
import { useFilterState } from "@/context/filter-context";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/router";
interface FacetsFilterSubmitProps {
  setIsModalOpen: SetIsModalOpenType;
  total?: number;
}
const FacetsFilterSubmit: React.FC<FacetsFilterSubmitProps> = ({
  setIsModalOpen,
  total,
}) => {
  const router = useRouter();
  const { isChecked: isAI } = useGenerativeAISearchToggle();
  const {
    query: { q },
  } = router;
  const { urlFacets } = useQueryParams();
  const {
    filterDispatch,
    filterState: { userFacetsUnsubmitted },
  } = useFilterState();
  const handleSubmit = () => {
    filterDispatch({
      type: "updateUserFacets",
      userFacetsUnsubmitted: {},
    });
    const newQueryObj = {
      ...(q && { q }),
      ...urlFacets,
      ...userFacetsUnsubmitted,
    };
    router.push({
      pathname: "/search",
      query: newQueryObj,
    });
    setIsModalOpen(false);
  };
  return (
    <div data-testid="facets-submit" className={styles.override0}>
      <Button
        variant="primary"
        textCase="normal"
        onClick={handleSubmit}
        data-testid="submit-button"
      >
        View Results {total && !isAI ? `(${total})` : undefined}
      </Button>
    </div>
  );
};
export default FacetsFilterSubmit;
