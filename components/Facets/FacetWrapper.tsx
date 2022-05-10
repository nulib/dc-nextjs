import { FacetsInstance } from "@/types/components/facets";
import React, { useEffect, useState } from "react";
import useFetchApiData from "@/hooks/useFetchApiData";
import { useSearchState } from "@/context/search-context";
import MultiFacet from "./MultiFacet";

interface FacetWrapperProps {
  facet: FacetsInstance;
}

const FacetWrapper: React.FC<FacetWrapperProps> = ({ facet }) => {
  const facetInstance = facet ? [facet] : undefined;

  const {
    searchState: { q, userFacets },
  } = useSearchState();

  const {
    data: apiData,
    error,
    loading,
  } = useFetchApiData(q, userFacets, facetInstance);

  if (!apiData) return <>loader...</>;

  const { aggregations } = apiData;

  if (!aggregations) return <>loader...</>;

  return aggregations
    .filter((aggregation) => aggregation.id === facet.id)
    .map((aggregation) => (
      <MultiFacet
        id={aggregation.id}
        buckets={aggregation.buckets}
        key={aggregation.id}
      />
    ));
};

export default FacetWrapper;
