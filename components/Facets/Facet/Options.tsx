import { FacetsInstance } from "@/types/components/facets";
import Option from "./Option";
import { Options } from "./GenericFacet.styled";
import { SpinLoader } from "@/components/Shared/Loader.styled";
import useFetchApiData from "@/hooks/useFetchApiData";
import { useFilterState } from "@/context/filter-context";
import { useSearchState } from "@/context/search-context";

interface FacetOptionsProps {
  aggsFilterValue: string;
  facet: FacetsInstance;
}

const FacetOptions: React.FC<FacetOptionsProps> = ({
  aggsFilterValue,
  facet,
}) => {
  const facetInstance = facet ? [facet] : undefined;
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

  if (loading) return <SpinLoader />;
  if (error || !data || !data.aggregations) return <>friendly user error...</>;

  /**
   * return facet aggregation data for this facet instance
   */
  const { aggregations } = data;
  const userFacetsAggregation = aggregations.find(
    (aggregation) => aggregation.id === "userFacets"
  );

  const filteredAggregations = aggregations.filter(
    (aggregation) => aggregation.id === facet.id
  );

  return (
    <>
      {filteredAggregations.map((aggregation) => {
        const userBuckets = userFacetsAggregation
          ? userFacetsAggregation.buckets
          : [];
        const filteredAggBuckets = aggregation.buckets.filter((ab) => {
          return !userBuckets.find((ub) => ub.key === ab.key);
        });
        const buckets = [...userBuckets, ...filteredAggBuckets];
        return (
          <Options
            key={aggregation.id}
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
      })}
    </>
  );
};

export default FacetOptions;
