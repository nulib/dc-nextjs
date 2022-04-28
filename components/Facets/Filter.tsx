import { ApiResponseAggregation } from "@/types/api/response";
import * as Dialog from "@radix-ui/react-dialog";
import {
  FilterBody,
  FilterContent,
  FilterHeader,
  FilterOverlay,
  FilterTrigger,
} from "./Filter.styled";
import MultiFacet from "./MultiFacet";

interface FilterProps {
  aggregations: ApiResponseAggregation[];
}

const FacetsFilter: React.FC<FilterProps> = ({ aggregations }) => {
  return (
    <Dialog.Root>
      <FilterTrigger>
        <span>Filter</span>
      </FilterTrigger>
      <Dialog.Portal>
        <FilterOverlay />
        <FilterContent>
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
        </FilterContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FacetsFilter;
