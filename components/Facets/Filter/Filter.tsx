import dialogStyles from "@/components/Shared/Dialog.module.css";
import filterStyles from "@/components/Facets/Filter/Filter.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { FilterProvider, useFilterState } from "@/context/filter-context";
import React, { useState } from "react";
import FacetsCurrentUser from "@/components/Facets/UserFacets/UserFacets";
import FilterClear from "@/components/Facets/Filter/Clear";
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
      <div className={filterStyles.filterWrapper}>
        <div className={filterStyles.filterFloating}>
          <Dialog.Trigger className={filterStyles.filterActivate}>
            <Icon>
              <IconFilter />
            </Icon>
            Filter
          </Dialog.Trigger>
          <FacetsCurrentUser screen="search" urlFacets={urlFacets} />
        </div>
        {Object.keys(urlFacets).length > 0 && <FilterClear />}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogStyles.dialogOverlay} />
        <Dialog.Content
          data-testid="modal-content"
          className={filterStyles.filterContent}
        >
          <FilterModal q={searchTerm || ""} setIsModalOpen={setIsModalOpen} />
        </Dialog.Content>
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
