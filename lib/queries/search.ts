import { ApiSearchRequestBody } from "@/types/api/request";

/**
 * Default search query for a Work
 */
const querySearchTemplate = {
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
} as ApiSearchRequestBody;

const buildSearchPart = (term: string) => {
  /**
   * Reference: https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl-query-string-query.html#query-string-query-notes
   */
  return {
    query_string: {
      /**
       * Reference available index keys/vars:
       * https://github.com/nulib/meadow/blob/deploy/staging/app/priv/elasticsearch/v2/settings/work.json
       */
      fields: ["title^5", "all_text", "all_controlled_labels", "all_ids"],
      query: term,
    },
  };
};

export { buildSearchPart, querySearchTemplate };
