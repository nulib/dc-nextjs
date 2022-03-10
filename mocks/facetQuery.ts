import { aggs } from "./aggs";

export const facetQuery = {
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
