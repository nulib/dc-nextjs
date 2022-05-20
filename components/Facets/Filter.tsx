import * as Dialog from "@radix-ui/react-dialog";
import {
  FilterBody,
  FilterContent,
  FilterHeader,
  FilterOverlay,
  FilterTrigger,
} from "./Filter.styled";
import { FilterProvider, useFilterState } from "@/context/filter-context";
import FacetsGroupList from "./GroupList";
import FacetsSubmit from "@/components/Facets/Submit";
import Preview from "./Preview";
import React from "react";
import { useSearchState } from "@/context/search-context";

export type SetIsModalOpenType = React.Dispatch<React.SetStateAction<boolean>>;

type FilterModalProps = {
  setIsModalOpen: SetIsModalOpenType;
};

const FilterModal: React.FC<FilterModalProps> = ({ setIsModalOpen }) => {
  return (
    <>
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
        <FacetsSubmit setIsModalOpen={setIsModalOpen} />
      </FilterBody>
    </>
  );
};

const DialogWrapper: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const { filterDispatch } = useFilterState();
  const { searchState } = useSearchState();

  const handleDialogChange = () => {
    /**
     * Opening the Filter dialog, so transfer the updated user facets
     * from Search Context back into the Filter Context
     */
    if (!isModalOpen) {
      filterDispatch({
        type: "updateUserFacets",
        userFacetsUnsubmitted: searchState.userFacets,
      });
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={handleDialogChange}>
      <FilterTrigger>
        <span>Filter</span>
      </FilterTrigger>
      <Dialog.Portal>
        <FilterOverlay />
        <FilterContent>
          <FilterModal setIsModalOpen={setIsModalOpen} />
        </FilterContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const FacetsFilter: React.FC = () => {
  return (
    <FilterProvider>
      <DialogWrapper />
    </FilterProvider>
  );
};

export default FacetsFilter;
