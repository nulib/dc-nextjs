import { estypes } from "@elastic/elasticsearch";

export type Aggs =
  | Record<string, estypes.AggregationsAggregationContainer>
  | undefined;

export type ApiSearchRequestBody = estypes.SearchRequest["body"];

export type SearchSource = [
  "id",
  "iiif_manifest",
  "representative_file_set",
  "title",
  "thumbnail",
  "visibility",
  "work_type"
];
