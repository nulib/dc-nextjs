import { estypes } from "@elastic/elasticsearch";

export type Aggs =
  | Record<string, estypes.AggregationsAggregationContainer>
  | undefined;

export type ApiSearchRequestBody = estypes.SearchRequest["body"];
