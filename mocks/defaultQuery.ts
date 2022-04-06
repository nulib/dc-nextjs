import { aggs } from "../lib/queries/aggs";

export const defaultQuery = {
  size: 10000,
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
