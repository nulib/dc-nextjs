import { Button } from "@nulib/design-system";
import { SetIsModalOpenType } from "@/components/Facets/Filter/Modal";
import { useFilterState } from "@/context/filter-context";
import { useSearchState } from "@/context/search-context";

interface FacetsSubmitProps {
  setIsModalOpen: SetIsModalOpenType;
  total?: number;
}

const FacetsSubmit: React.FC<FacetsSubmitProps> = ({
  setIsModalOpen,
  total,
}) => {
  const {
    filterDispatch,
    filterState: { userFacetsUnsubmitted },
  } = useFilterState();
  const { searchDispatch } = useSearchState();

  const handleSubmit = () => {
    searchDispatch({
      type: "updateUserFacets",
      userFacets: userFacetsUnsubmitted,
    });
    filterDispatch({
      type: "updateUserFacets",
      userFacetsUnsubmitted: {},
    });
    setIsModalOpen(false);
  };

  return (
    <div data-testid="facets-submit">
      <Button isPrimary onClick={handleSubmit} data-testid="submit-button">
        View Results {total ? `(${total})` : undefined}
      </Button>
    </div>
  );
};

export default FacetsSubmit;
