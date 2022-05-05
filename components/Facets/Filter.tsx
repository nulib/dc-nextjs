import * as Dialog from "@radix-ui/react-dialog";
import {
  FilterBody,
  FilterContent,
  FilterHeader,
  FilterOverlay,
  FilterTrigger,
} from "./Filter.styled";
import { Filter } from "@/types/components/facets";
import { FilterProvider } from "@/context/filter-context";
import MultiFacet from "./MultiFacet";

const FilterModal: React.FC<Filter> = ({ aggregations }) => {
  return (
    <FilterProvider>
      <FilterHeader>
        <Dialog.Title>Filter</Dialog.Title>
        <Dialog.Close>Close</Dialog.Close>
      </FilterHeader>
      <FilterBody>
        {aggregations &&
          aggregations.map((aggregation) => (
            <MultiFacet {...aggregation} key={aggregation.id} />
          ))}
      </FilterBody>
    </FilterProvider>
  );
};

const FacetsFilter: React.FC<Filter> = ({ aggregations }) => {
  return (
    <Dialog.Root>
      <FilterTrigger>
        <span>Filter</span>
      </FilterTrigger>
      <Dialog.Portal>
        <FilterOverlay />
        <FilterContent>
          <FilterModal aggregations={aggregations} />
        </FilterContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FacetsFilter;
