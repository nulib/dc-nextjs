import { aggs } from "mocks/aggs";
import { defaultQuery } from "mocks/defaultQuery";
import { facetQuery } from "mocks/facetQuery";
import { filteredQuery, filteredQuery2 } from "mocks/filterQuery";

const useApiSearch = () => {
  function updateSearch(term: string) {
    const newQuery = {
      ...defaultQuery,
    };
    newQuery.query.simple_query_string.query = `${term}~1 | ${term}*`;
    return newQuery;
  }

  function updateFacet() {
    return "foo";
  }

  // TODO: Adam wire this up
  function updateQuery(term: string, userFacets: any) {}

  return { defaultQuery, facetQuery, filteredQuery, updateSearch, updateFacet };
};

export default useApiSearch;
