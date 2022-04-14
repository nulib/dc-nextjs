import { defaultQuery } from "@/mocks/defaultQuery";
import { buildSearchQuery, querySearchTemplate } from "@/lib/queries/search";
import { buildFacetPart } from "@/lib/queries/facet";
import { UserFacets } from "types";

const useApiSearch = () => {
  function updateQuery(term: string, userFacets: UserFacets) {
    const newQuery = JSON.parse(JSON.stringify(querySearchTemplate));

    /**
     * Add search term to the API query
     */
    if (term) {
      newQuery.query.bool.must.push(buildSearchQuery(term));
    }

    /**
     * Add facets to the API query
     */
    for (const [key, value] of Object.entries(userFacets)) {
      if (value?.length > 0) {
        newQuery.query.bool.must.push(buildFacetPart(key, value));
      }
    }

    return newQuery;
  }

  return { defaultQuery, updateQuery };
};

export default useApiSearch;
