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
import Preview from "./Preview";

const FilterModal: React.FC = () => {
  return (
    <FilterProvider>
      <FilterHeader>
        <Dialog.Title>Filter</Dialog.Title>
        <Dialog.Close>Close</Dialog.Close>
      </FilterHeader>
      <FilterBody>
        <div>
          <div>[active facet tray]</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FacetsGroupList />
            <Preview />
          </div>
        </div>
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
