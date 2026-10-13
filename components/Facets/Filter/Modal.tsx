import modalStyles from "@/components/Facets/Filter/Modal.module.css";
import filterStyles from "@/components/Facets/Filter/Filter.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { ApiSearchRequestBody } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import FacetsCurrentUser from "@/components/Facets/UserFacets/UserFacets";
import FacetsGroupList from "@/components/Facets/Filter/GroupList";
import FacetsSubmit from "@/components/Facets/Filter/Submit";
import FilterClear from "@/components/Facets/Filter/Clear";
import { IconClear } from "@/components/Shared/SVG/Icons";
import Preview from "./Preview";
import { apiPostRequest } from "@/lib/dc-api";
import { buildQuery } from "@/lib/queries/builder";
import { useFilterState } from "@/context/filter-context";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
export type SetIsModalOpenType = React.Dispatch<React.SetStateAction<boolean>>;
type FilterModalProps = {
  q: string;
  setIsModalOpen: SetIsModalOpenType;
};
const FilterModal: React.FC<FilterModalProps> = ({ q, setIsModalOpen }) => {
  const [apiData, setApiData] = useState<ApiSearchResponse>();
  const {
    filterState: { userFacetsUnsubmitted },
  } = useFilterState();
  const { isChecked } = useGenerativeAISearchToggle();
  useEffect(() => {
    async function getData() {
      const body: ApiSearchRequestBody = buildQuery(
        {
          size: 5,
          term: q as string,
          urlFacets: userFacetsUnsubmitted,
        },
        !!isChecked,
      );
      const response = await apiPostRequest<ApiSearchResponse>({
        body: body,
        url: DC_API_SEARCH_URL,
      });
      setApiData(response);
    }
    getData();
  }, [userFacetsUnsubmitted, q]);
  return (
    <>
      <header className={filterStyles.filterHeader}>
        <Dialog.Title>Filter</Dialog.Title>
        {q && (
          <em>
            Results for &ldquo;<strong>{q}</strong>&rdquo;
          </em>
        )}
        <Dialog.Close
          data-testid="facets-filter-close"
          aria-label="Cancel"
          className={[filterStyles.filterClose, modalStyles.override0]
            .filter(Boolean)
            .join(" ")}
        >
          <IconClear />
        </Dialog.Close>
      </header>
      <div className={filterStyles.filterBody}>
        <FacetsCurrentUser screen="modal" />
        <div className={filterStyles.filterBodyInner}>
          <FacetsGroupList />
          {apiData && <Preview items={apiData?.data} />}
        </div>
      </div>
      <footer role="menubar" className={filterStyles.filterFooter}>
        <FilterClear isModal={true} />
        <div className={modalStyles.override1}>
          <Dialog.Close
            data-testid="facets-filter-close"
            aria-label="Cancel"
            className={filterStyles.filterClose}
          >
            Cancel
          </Dialog.Close>
          <FacetsSubmit
            setIsModalOpen={setIsModalOpen}
            total={apiData?.pagination.total_hits}
          />
        </div>
      </footer>
    </>
  );
};
export default FilterModal;
