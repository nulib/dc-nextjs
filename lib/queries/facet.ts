import { ALL_FACETS } from "@/lib/constants/facets-model";
import { QueryDslBoolQuery } from "@elastic/elasticsearch/api/types";
import { UrlFacets } from "@/types/context/filter-context";

const buildFacetFilters = (urlFacets: UrlFacets) => {
  const filter: QueryDslBoolQuery["filter"] = [];

  /** Sample urlFacets object for reference
  const sampleUrlFacets = {
    collection: [],
    genre: ['baz'],
    subject: ["foo", "bar"]
  }
  */

  /** Loop through facet keys */
  for (const [key, value] of Object.entries(urlFacets)) {
    /** Lookup facet field by ID to pass to query */
    const facet = ALL_FACETS.facets.find((item) => item.id === key);

    if (facet && value?.length > 0) {
      /** Loop through facet values */
      value.forEach((facetValue) => {
        filter.push({
          term: { [facet.field]: facetValue },
        });
      });
    }
  }
  return filter;
};

const getFacetIdByField = (field: string) => {
  const facet = ALL_FACETS.facets.find((item) => item.field === field);
  return facet ? facet.id : null;
};

export { buildFacetFilters, getFacetIdByField };
