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
import FilterClear from "@/components/Facets/Filter/Clear";
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
    urlFacets: userFacetsUnsubmitted,
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
        <FilterClose
          data-testid="facets-filter-close"
          aria-label="Cancel"
          style={{
            marginRight: "0",
          }}
        >
          <IconClear />
        </FilterClose>
      </FilterHeader>
      <FilterBody>
        <FacetsCurrentUser screen="modal" />
        <FilterBodyInner>
          <FacetsGroupList />
          {!loading && apiData && <Preview items={apiData?.data} />}
        </FilterBodyInner>
      </FilterBody>
      <FilterFooter role="menubar">
        <FilterClear isModal={true} />
        <div style={{ display: "flex" }}>
          <FilterClose data-testid="facets-filter-close" aria-label="Cancel">
            Cancel
          </FilterClose>
          <FacetsSubmit
            setIsModalOpen={setIsModalOpen}
            total={apiData?.info.total}
          />
        </div>
      </FilterFooter>
    </>
  );
};

export default FilterModal;
