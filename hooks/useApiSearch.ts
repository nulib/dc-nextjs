const useApiSearch = () => {
  const aggs = {
    aggs: {
      contributor: {
        terms: {
          field: "descriptiveMetadata.contributor.displayFacet",
          size: 10,
          order: {
            _count: "desc",
          },
        },
      },
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
    ...aggs,
  };

  const facetQuery = {
    size: 100,
    query: {
      bool: {
        must: [
          {
            simple_query_string: {
              query: "dylan~1 | dylan*",
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
          {
            bool: {
              should: [
                {
                  terms: {
                    "descriptiveMetadata.contributor.displayFacet": [
                      "Olivier, Barry, 1935- (Photographer)",
                    ],
                  },
                },
              ],
            },
          },
          {
            bool: {
              should: [
                {
                  terms: {
                    "descriptiveMetadata.genre.displayFacet": [
                      "black-and-white negatives",
                    ],
                  },
                },
              ],
            },
          },
          {
            bool: {
              must: [
                {
                  match: {
                    "model.name": "Work",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...aggs,
  };

  const filteredQuery = {
    query: {
      filtered: {
        query: {
          simple_query_string: {
            query: "dylan~1 | dylan*",
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
        filter: {
          bool: {
            must: [
              {
                term: {
                  "descriptiveMetadata.genre.displayFacet": [
                    "black-and-white negatives",
                  ],
                },
              },
              {
                term: {
                  "descriptiveMetadata.contributor.displayFacet": [
                    "Olivier, Barry, 1935- (Photographer)",
                  ],
                },
              },
            ],
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

  function updateQuery(term: string, userFacets: any) {}

  return { defaultQuery, facetQuery, filteredQuery, updateSearch, updateFacet };
};

export default useApiSearch;
