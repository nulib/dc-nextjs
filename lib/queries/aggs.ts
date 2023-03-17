import { Aggs } from "@/types/api/request";
import { FacetsInstance } from "@/types/components/facets";
import { SortOrder } from "@elastic/elasticsearch/api/types";
import { UrlFacets } from "@/types/context/filter-context";
import { facetRegex } from "@/lib/utils/facet-helpers";

/**
 * This constructs the `aggs` property as part of an elastic search query request
 * to expect `aggregations` in the response for each defined facet instance
 */
export const buildAggs = (
  facets: FacetsInstance[],
  facetFilterValue: string | undefined,
  userFacets: UrlFacets
) => {
  const aggs: Aggs = {};
  let cleanFilterValue: string;
  const desc = "desc" as SortOrder;

  /** Is user filtering using quotes for exact match? */
  const quoteCount = (facetFilterValue?.match(/"/g) || []).length;

  if (quoteCount % 2 > 0) {
    /** User has entered only one double quote */
    cleanFilterValue = " ";
  } else {
    cleanFilterValue = facetFilterValue?.includes(`"`)
      ? `.*${facetFilterValue.replace(/"/g, '"')}.*`
      : facetRegex(facetFilterValue);
  }

  facets.forEach((facet) => {
    const userFacetsValues =
      userFacets[facet.id]?.length > 0 ? [...userFacets[facet.id]] : undefined;

    const terms = {
      // Exclude active user selected facets.
      //exclude: userFacetsValues,

      field: facet.field,

      // This line will filter returned aggs based on user text input
      include: cleanFilterValue ? cleanFilterValue : undefined,

      order: {
        _count: desc,
      },
      size: 20,
    };

    /**
     * Create a separate aggregation for user selected aggs (checkboxes)
     */

    if (userFacetsValues) {
      aggs.userFacets = {
        terms: {
          field: facet.field,
          include: userFacetsValues,
          order: {
            _count: desc,
          },
          size: 20,
        },
      };
    }

    /**
     * Default agg values for the active Facet
     */
    aggs[facet.id] = {
      terms,
    };
  });

  return aggs;
};
