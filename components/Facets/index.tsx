import FacetsFilter from "@/components/Facets/Filter/Filter";
import { FilterProvider } from "@/context/filter-context";

const Facets: React.FC = () => {
  return (
    <FilterProvider>
      <FacetsFilter />
    </FilterProvider>
  );
};

export default Facets;
