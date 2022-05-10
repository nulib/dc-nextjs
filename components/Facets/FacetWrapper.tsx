import { FacetsInstance } from "@/types/components/facets";
import MultiFacet from "./MultiFacet";
import React from "react";
import useFetchApiData from "@/hooks/useFetchApiData";
import { useFilterState } from "@/context/filter-context";
import { useSearchState } from "@/context/search-context";

interface FacetWrapperProps {
  facet: FacetsInstance;
}

const FacetWrapper: React.FC<FacetWrapperProps> = ({ facet }) => {
  const facetInstance = facet ? [facet] : undefined;

  const {
    searchState: { q, userFacets },
  } = useSearchState();

  const {
    filterState: { userFacetsUnsubmitted },
  } = useFilterState();

  const { data, error, loading } = useFetchApiData(
    q,
    userFacetsUnsubmitted,
    facetInstance,
    5
  );

  /**
   * @todo: create fancy loader while request and response is occuring
   */

  if (loading) return <>loader...</>;

  if (error || !data || !data.aggregations) return <>friendly user error...</>;

  /**
   * return facet aggregation data for this facet instance
   */
  const { aggregations } = data;

  const fileredAggregation = aggregations
    .filter((aggregation) => aggregation.id === facet.id)
    .map((aggregation) => (
      <MultiFacet
        id={aggregation.id}
        buckets={aggregation.buckets}
        key={aggregation.id}
      />
    ));

  return <>{fileredAggregation}</>;
};

export default FacetWrapper;