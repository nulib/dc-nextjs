import * as Dialog from "@radix-ui/react-dialog";
import {
  FilterBody,
  FilterBodyInner,
  FilterClose,
  FilterFooter,
  FilterHeader,
} from "@/components/Facets/Filter/Filter.styled";
import FacetsCurrentUser from "@/components/Facets/UserFacets/UserFacets";
import FacetsGroupList from "@/components/Facets/Filter/GroupList";
import FacetsSubmit from "@/components/Facets/Filter/Submit";
import { IconClear } from "@/components/Shared/SVG/Icons";
import Preview from "./Preview";
import React from "react";
import useFetchApiData from "@/hooks/useFetchApiData";
import { useFilterState } from "@/context/filter-context";

export type SetIsModalOpenType = React.Dispatch<React.SetStateAction<boolean>>;

type FilterModalProps = {
  q: string;
  setIsModalOpen: SetIsModalOpenType;
};

const FilterModal: React.FC<FilterModalProps> = ({ q, setIsModalOpen }) => {
  const {
    filterState: { userFacetsUnsubmitted },
  } = useFilterState();

  const {
    data: apiData,
    error,
    loading,
  } = useFetchApiData({
    searchTerm: q,
    size: 5,
    userFacets: userFacetsUnsubmitted,
  });

  if (error) console.warn(error);

  return (
    <>
      <FilterHeader>
        <Dialog.Title>Filter</Dialog.Title>
        {q && (
          <em>
            Results for &ldquo;<strong>{q}</strong>&rdquo;
          </em>
        )}
        <FilterClose data-testid="facets-filter-close" aria-label="Cancel">
          <IconClear />
        </FilterClose>
      </FilterHeader>
      <FilterBody>
        <FacetsCurrentUser screen="modal" />
        <FilterBodyInner>
          <FacetsGroupList />
          {!loading && apiData && <Preview data={apiData?.data} />}
        </FilterBodyInner>
      </FilterBody>
      <FilterFooter role="menubar">
        <FilterClose data-testid="facets-filter-close" aria-label="Cancel">
          Cancel
        </FilterClose>
        <FacetsSubmit
          setIsModalOpen={setIsModalOpen}
          total={apiData?.info.total}
        />
      </FilterFooter>
    </>
  );
};

export default FilterModal;
