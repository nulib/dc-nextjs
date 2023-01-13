import { Options, SpinWrapper } from "./GenericFacet.styled";
import { FacetsInstance } from "@/types/components/facets";
import Option from "./Option";
import { SpinLoader } from "@/components/Shared/Loader.styled";
import useFetchApiData from "@/hooks/useFetchApiData";
import { useFilterState } from "@/context/filter-context";
import useQueryParams from "@/hooks/useQueryParams";

interface FacetOptionsProps {
  aggsFilterValue: string;
  facet: FacetsInstance;
}

const FacetOptions: React.FC<FacetOptionsProps> = ({
  aggsFilterValue,
  facet,
}) => {
  const facetInstance = facet ? [facet] : undefined;
  const { searchTerm } = useQueryParams();

  const {
    filterState: { userFacetsUnsubmitted },
  } = useFilterState();

  const { data, error, loading } = useFetchApiData({
    activeFacets: facetInstance,
    aggsFilterValue,
    searchTerm,
    size: 0,
    urlFacets: userFacetsUnsubmitted,
  });

  if (loading)
    return (
      <SpinWrapper>
        <SpinLoader />
      </SpinWrapper>
    );
  if (error) return <p>Error fetching data</p>;
  if (
    !data ||
    !data.aggregations ||
    data.aggregations[facet.id].buckets.length === 0
  )
    return <p>No data returned</p>;

  /**
   * return facet aggregation data for this facet instance
   */
  const { aggregations } = data;

  const userFacetsAggregation = aggregations.userFacets;
  const userBuckets = userFacetsAggregation
    ? userFacetsAggregation.buckets
    : [];

  const filteredAggBuckets = aggregations[facet.id].buckets.filter((bucket) => {
    return !userBuckets.find((userBucket) => userBucket.key == bucket.key);
  });

  const buckets = [...userBuckets, ...filteredAggBuckets];

  return (
    <Options
      key={facet.id}
      className="facet-options skeleton-loader"
      data-testid="facet-options"
    >
      {buckets.map((bucket, index) => (
        <Option
          bucket={bucket}
          facet={facet.id}
          index={index}
          key={bucket.key}
        />
      ))}
    </Options>
  );
};

export default FacetOptions;
