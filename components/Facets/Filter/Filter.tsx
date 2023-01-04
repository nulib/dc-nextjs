import * as Dialog from "@radix-ui/react-dialog";
import {
  FilterActivate,
  FilterContent,
  FilterFloating,
} from "@/components/Facets/Filter/Filter.styled";
import { FilterProvider, useFilterState } from "@/context/filter-context";
import React, { useState } from "react";
import { DialogOverlay } from "@/components/Shared/Dialog.styled";
import FacetsCurrentUser from "@/components/Facets/UserFacets/UserFacets";
import FilterModal from "@/components/Facets/Filter/Modal";
import Icon from "@/components/Shared/Icon";
import { IconFilter } from "@/components/Shared/SVG/Icons";
import useQueryParams from "@/hooks/useQueryParams";

const DialogWrapper: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { filterDispatch } = useFilterState();
  const { searchTerm, urlFacets } = useQueryParams();

  const handleDialogChange = () => {
    /**
     * Opening the Filter dialog, so transfer the updated user facets
     * from Search Context back into the Filter Context
     */
    if (!isModalOpen) {
      filterDispatch({
        type: "updateUserFacets",
        userFacetsUnsubmitted: urlFacets,
      });
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={handleDialogChange}>
      <FilterFloating>
        <FilterActivate>
          <Icon>
            <IconFilter />
          </Icon>
          Filter
        </FilterActivate>
        <FacetsCurrentUser screen="search" urlFacets={urlFacets} />
      </FilterFloating>
      <Dialog.Portal>
        <DialogOverlay />
        <FilterContent data-testid="modal-content">
          <FilterModal q={searchTerm} setIsModalOpen={setIsModalOpen} />
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
