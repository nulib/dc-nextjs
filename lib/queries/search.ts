import { aggs } from "@/lib/queries/aggs";

const querySearchTemplate = {
  size: 20,
  _source: [
    "id",
    "accessionNumber",
    "iiifManifest",
    "title",
    "workType.label",
    "thumbnail",
  ],
  query: {
    bool: {
      must: [
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
  //...aggs,
};

const buildSearchQuery = (term: string) => {
  return {
    simple_query_string: {
      query: term ? `${term}~1 | ${term}*` : "",
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
};

export { buildSearchQuery, querySearchTemplate };
