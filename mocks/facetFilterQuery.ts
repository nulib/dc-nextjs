const querySearchPart = {
  simple_query_string: {
    query: "Héloïse~1 | Héloïse*",
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
};

export const facetFilterQuery = {
  size: 0,
  query: {
    bool: {
      must: [
        { bool: { must: [{ match: { "model.name": "Work" } }] } },
        {
          ...querySearchPart,
        },
        {
          bool: {
            should: [
              {
                terms: {
                  "descriptiveMetadata.genre.displayFacet": [
                    "prints (visual works)",
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  aggs: {
    facetFilter: {
      terms: {
        field: "descriptiveMetadata.creator.displayFacet",
        include: ".*unk.*",
        exclude: "unknown French|unknown Dutch",
        size: 20,
      },
    },
  },
};
