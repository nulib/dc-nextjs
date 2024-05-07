import * as Dialog from "@radix-ui/react-dialog";

import {
  FilterBody,
  FilterBodyInner,
  FilterClose,
  FilterFooter,
  FilterHeader,
} from "@/components/Facets/Filter/Filter.styled";
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

  useEffect(() => {
    async function getData() {
      const body: ApiSearchRequestBody = buildQuery({
        size: 5,
        term: q as string,
        urlFacets: userFacetsUnsubmitted,
      });

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
          {apiData && <Preview items={apiData?.data} />}
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
            total={apiData?.pagination.total_hits}
          />
        </div>
      </FilterFooter>
    </>
  );
};

export default FilterModal;
