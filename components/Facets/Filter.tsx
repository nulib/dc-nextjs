import * as Dialog from "@radix-ui/react-dialog";
import {
  FilterBody,
  FilterContent,
  FilterHeader,
  FilterOverlay,
  FilterTrigger,
} from "./Filter.styled";
import FacetsGroupList from "./GroupList";
import { FilterProvider } from "@/context/filter-context";

const FilterModal: React.FC = () => {
  return (
    <FilterProvider>
      <FilterHeader>
        <Dialog.Title>Filter</Dialog.Title>
        <Dialog.Close>Close</Dialog.Close>
      </FilterHeader>
      <FilterBody>
        <FacetsGroupList />
        {/* {apiData?.aggregations &&
          apiData.aggregations.filter((aggregation) => (
            if () <MultiFacet {...aggregation} key={aggregation.id} />
          ))} */}
      </FilterBody>
    </FilterProvider>
  );
};

const FacetsFilter: React.FC = () => {
  return (
    <Dialog.Root>
      <FilterTrigger>
        <span>Filter</span>
      </FilterTrigger>
      <Dialog.Portal>
        <FilterOverlay />
        <FilterContent>
          <FilterModal />
        </FilterContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FacetsFilter;
