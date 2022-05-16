import { Aggs } from "@/types/api/request";
import { FacetsInstance } from "@/types/components/facets";

/**
 * This constructs the `aggs` property as part of an elastic search query request
 * to expect `aggregations` in the response for each defined facet instance
 * @param facets
 * @returns
 */
export const buildAggs = (
  facets: FacetsInstance[],
  facetFilterValue: string | undefined
) => {
  const aggs: Aggs = {};

  facets.forEach((facet) => {
    const terms = {
      field: facet.field,

      // This line will filter returned aggs based on user text input
      include: facetFilterValue ? `.*${facetFilterValue}.*` : undefined,

      order: {
        _count: "desc",
      },
      size: 20,
    };

    aggs[facet.id] = {
      terms,
    };
  });

  return aggs;
};
