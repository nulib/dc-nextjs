import {
  ApiResponseAggregation,
  ApiSearchResponse,
} from "@/types/api/response";
import { Options, SpinWrapper } from "./GenericFacet.styled";
import { useEffect, useState } from "react";

import { ApiSearchRequestBody } from "@/types/api/request";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { FacetsInstance } from "@/types/components/facets";
import Option from "./Option";
import { SpinLoader } from "@/components/Shared/Loader.styled";
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
  const [aggregations, setAggregations] = useState<ApiResponseAggregation>();
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

        setAggregations(response?.aggregations);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [aggsFilterValue, facet, searchTerm, userFacetsUnsubmitted]);

  if (loading)
    return (
      <SpinWrapper>
        <SpinLoader />
      </SpinWrapper>
    );

  const facetAggregation = aggregations?.[facet.id]?.[facet.id];
  const buckets = facetAggregation?.buckets ?? [];

  if (buckets.length === 0) {
    return (
      <p>
        No options for <strong>{facet.label}</strong> on your current filters.
      </p>
    );
  }

  const userBuckets = Array.isArray(aggregations?.userFacets?.buckets)
    ? aggregations.userFacets.buckets
    : [];

  const filteredAggBuckets = buckets.filter(
    (bucket) =>
      !userBuckets.some((userBucket) => userBucket.key === bucket.key),
  );

  const renderBuckets = [...filteredAggBuckets, ...userBuckets];

  return (
    <Options
      key={facet.id}
      className="facet-options skeleton-loader"
      data-testid="facet-options"
    >
      {renderBuckets.map((bucket, index) => (
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
