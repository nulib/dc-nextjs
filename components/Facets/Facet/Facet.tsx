import { FacetsInstance } from "@/types/components/facets";
import GenericFacet from "@/components/Facets/Facet/GenericFacet";
import React from "react";
import useFetchApiData from "@/hooks/useFetchApiData";
import { useFilterState } from "@/context/filter-context";
import { useSearchState } from "@/context/search-context";

interface FacetsFacetProps {
  facet: FacetsInstance;
}

const FacetsFacet: React.FC<FacetsFacetProps> = ({ facet }) => {
  const facetInstance = facet ? [facet] : undefined;
  const [aggsFilterValue, setAggsFilterValue] = React.useState("");

  const {
    searchState: { q },
  } = useSearchState();

  const {
    filterState: { userFacetsUnsubmitted },
  } = useFilterState();

  const { data, error, loading } = useFetchApiData({
    activeFacets: facetInstance,
    aggsFilterValue,
    searchTerm: q,
    size: 0,
    userFacets: userFacetsUnsubmitted,
  });

  /**
   * @todo: create fancy loader while request and response is occurring
   */

  if (loading) return <>loader...</>;

  if (error || !data || !data.aggregations) return <>friendly user error...</>;

  /**
   * return facet aggregation data for this facet instance
   */
  const { aggregations } = data;
  const userFacetsAggregation = aggregations.find(
    (aggregation) => aggregation.id === "userFacets"
  );

  const filteredAggregation = aggregations
    .filter((aggregation) => aggregation.id === facet.id)
    .map((aggregation) => {
      const userBuckets = userFacetsAggregation
        ? userFacetsAggregation.buckets
        : [];
      const filteredAggBuckets = aggregation.buckets.filter((ab) => {
        return !userBuckets.find((ub) => ub.key === ab.key);
      });
      const buckets = [...userBuckets, ...filteredAggBuckets];

      return (
        <GenericFacet
          filterValue={aggsFilterValue}
          id={aggregation.id}
          buckets={buckets}
          key={aggregation.id}
          setAggsFilterValue={setAggsFilterValue}
        />
      );
    });

  return <>{filteredAggregation}</>;
};

export default FacetsFacet;
