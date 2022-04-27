import { aggs } from "@/lib/queries/aggs";
import { ApiSearchRequest, SearchSimpleQueryString } from "@/types/api/request";

/**
 * Default Elasticsearch search query for a Work
 */
const querySearchTemplate: ApiSearchRequest = {
  _source: [
    "accessionNumber",
    "id",
    "iiifManifest",
    "title",
    "thumbnail",
    "workType.label",
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
  size: 20,
  ...aggs,
};

const buildSearchPart = (term: string): SearchSimpleQueryString => {
  return {
    simple_query_string: {
      default_operator: "or",
      fields: [
        "all_titles^5",
        "description^2",
        "all_subjects^2",
        "full_text",
        "legacy_identifier",
        "accession_number",
        "id",
      ],
      query: term ? `${term}~1 | ${term}*` : "",
    },
  };
};

export { buildSearchPart, querySearchTemplate };
