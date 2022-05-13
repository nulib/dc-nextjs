export const filteredQuery = {
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

export const filteredQuery2 = {
  query: {
    bool: {
      must: {
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
        terms: {
          "descriptiveMetadata.genre.displayFacet": [
            "black-and-white negatives",
          ],
          "descriptiveMetadata.contributor.displayFacet": [
            "Olivier, Barry, 1935- (Photographer)",
          ],
        },
      },
    },
  },
};
