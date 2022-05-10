import { Aggs } from "@/types/api/request";
import { FacetsInstance } from "@/types/components/facets";

/**
 * This constructs the `aggs` property as part of an elastic search query request
 * to expect `aggregations` in the response for each defined facet instance
 * @param facets
 * @returns
 */
export const buildAggs = (facets: FacetsInstance[]) => {
  const aggs: Aggs = {};

  facets.forEach((facet) => {
    const terms = Object.create({});
    terms.field = facet.field;
    terms.size = 20;
    terms.order = {
      _count: "desc",
    };

    aggs[facet.id] = Object.create({});
    aggs[facet.id].terms = terms;
  });

  return aggs;
};
