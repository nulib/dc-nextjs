import { ApiSearchRequest, SearchSimpleQueryString } from "@/types/api/request";

/**
 * Default search query for a Work
 */
const querySearchTemplate: ApiSearchRequest = {
  _source: [
    "id",
    "iiif_manifest",
    "representative_file_set",
    "title",
    "thumbnail",
    "visibility",
    "work_type",
  ],
  query: {
    bool: {
      must: [],
    },
  },
  size: 20,
};

const buildSearchPart = (term: string): SearchSimpleQueryString => {
  return {
    simple_query_string: {
      default_operator: "or",
      // Reference at: https://github.com/nulib/meadow/blob/deploy/staging/app/priv/elasticsearch/v2/settings/work.json
      fields: ["title^5", "all_text", "all_controlled_labels", "all_ids"],
      query: term ? `${term}~1 | ${term}*` : "",
    },
  };
};

export { buildSearchPart, querySearchTemplate };
