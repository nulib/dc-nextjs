import loaderStyles from "@/components/Shared/Loader.module.css";
import genericFacetStyles from "@/components/Facets/Facet/GenericFacet.module.css";
import {
  ApiResponseFilteredAggregation,
  ApiSearchResponse,
} from "@/types/api/response";
import { useEffect, useState } from "react";
import { ApiSearchRequestBody } from "@/types/api/request";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { FacetsInstance } from "@/types/components/facets";
import Option from "./Option";
import { apiPostRequest } from "@/lib/dc-api";
import { buildQuery } from "@/lib/queries/builder";
import { useFilterState } from "@/context/filter-context";
import useGenerativeAISearchToggle from "@/hooks/useGenerativeAISearchToggle";
import useQueryParams from "@/hooks/useQueryParams";
interface FacetOptionsProps {
  aggsFilterValue: string;
  facet: FacetsInstance;
}
const FacetOptions: React.FC<FacetOptionsProps> = ({
  aggsFilterValue,
  facet,
}) => {
  const { searchTerm } = useQueryParams();
  const [aggregations, setAggregations] =
    useState<ApiResponseFilteredAggregation>();
  const [loading, setLoading] = useState(true);
  const { isChecked } = useGenerativeAISearchToggle();
  const {
    filterState: { userFacetsUnsubmitted },
  } = useFilterState();
  useEffect(() => {
    if (typeof searchTerm === "undefined") return;
    (async () => {
      try {
        const body: ApiSearchRequestBody = buildQuery(
          {
            aggs: facet ? [facet] : undefined,
            aggsFilterValue: aggsFilterValue,
            size: 1,
            term: searchTerm,
            urlFacets: userFacetsUnsubmitted,
          },
          !!isChecked,
        );
        const response = await apiPostRequest<ApiSearchResponse>({
          body: body,
          url: DC_API_SEARCH_URL,
        });
        setAggregations(
          response?.aggregations as ApiResponseFilteredAggregation,
        );
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [aggsFilterValue, facet, searchTerm, userFacetsUnsubmitted]);
  if (loading)
    return (
      <div className={genericFacetStyles.spinWrapper}>
        <span className={loaderStyles.spinLoader} />
      </div>
    );
  const facetAggregation = aggregations?.[facet.id]?.[facet.id];
  const buckets = facetAggregation?.buckets ?? [];
  function getBucketOrder(bucketKey: string) {
    const urlFacet = userFacetsUnsubmitted[facet.id];
    if (!urlFacet) {
      return Infinity;
    }
    const index = urlFacet.findIndex((facet) => facet.includes(bucketKey));
    return index === -1 ? Infinity : index;
  }
  if (buckets.length === 0) {
    return (
      <p>
        No options for <strong>{facet.label}</strong> on your current filters.
      </p>
    );
  }
  buckets.sort((a, b) => getBucketOrder(a.key) - getBucketOrder(b.key));
  const userBuckets = Array.isArray(aggregations?.userFacets?.buckets)
    ? aggregations.userFacets.buckets
    : [];
  const filteredAggBuckets = buckets.filter(
    (bucket) =>
      !userBuckets.some((userBucket) => userBucket.key === bucket.key),
  );
  const renderBuckets = [...filteredAggBuckets, ...userBuckets];
  return (
    <ul
      key={facet.id}
      data-testid="facet-options"
      className={[genericFacetStyles.options, "facet-options skeleton-loader"]
        .filter(Boolean)
        .join(" ")}
    >
      {renderBuckets.map((bucket, index) => (
        <Option
          bucket={bucket}
          facet={facet.id}
          index={index}
          key={bucket.key}
        />
      ))}
    </ul>
  );
};
export default FacetOptions;
