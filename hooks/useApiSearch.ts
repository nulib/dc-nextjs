const useApiSearch = () => {
  const defaultQuery = {
    query: {
      simple_query_string: {
        /**
         * Our current search formats the query like so:
         * "query":"seeger~1 | seeger*"
         */
        query: "",
        fields: [
          "all_titles^5",
          "description^2",
          "all_subjects^2",
          "full_text",
          "legacy_identifier",
          "accession_number",
          "id",
        ],
        default_operator: "or",
      },
    },
    aggs: {
      genre: {
        terms: {
          field: "descriptiveMetadata.genre.displayFacet",
          size: 10,
          order: {
            _count: "desc",
          },
        },
      },
      subject: {
        terms: {
          field: "descriptiveMetadata.subject.displayFacet",
          size: 10,
          order: {
            _count: "desc",
          },
        },
      },
    },
  };

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

  return { defaultQuery, updateSearch, updateFacet };
};

export default useApiSearch;
