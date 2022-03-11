import { defaultQuery } from "mocks/defaultQuery";
import { buildSearchQuery, querySearchTemplate } from "lib/queries/search";
import { buildFacetPart } from "lib/queries/facet";

const useApiSearch = () => {
  interface FacetObject {
    [key: string]: [string];
  }

  function updateQuery(term: string, userFacets: FacetObject) {
    const newQuery = { ...querySearchTemplate };

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
      newQuery.query.bool.must.push(buildFacetPart(key, value));
    }

    return newQuery;
  }

  return { defaultQuery, updateQuery };
};

export default useApiSearch;
