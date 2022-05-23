import { Button } from "@nulib/design-system";
import { SetIsModalOpenType } from "@/components/Facets/Filter/Filter";
import { useFilterState } from "@/context/filter-context";
import { useSearchState } from "@/context/search-context";

interface FacetsSubmitProps {
  setIsModalOpen: SetIsModalOpenType;
}

const FacetsSubmit: React.FC<FacetsSubmitProps> = ({ setIsModalOpen }) => {
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
    <div style={{ paddingTop: "100px" }} data-testid="facets-submit">
      <Button isPrimary onClick={handleSubmit} data-testid="submit-button">
        View Results
      </Button>
    </div>
  );
};

export default FacetsSubmit;
