import { Work } from "@nulib/dcapi-types";

export type MessageTypes =
  | "answer"
  | "aggregation_result"
  | "final"
  | "final_message"
  | "search_result"
  | "start"
  | "stop"
  | "token"
  | "tool_start";

type MessageAggregationResult = {
  buckets: [
    {
      key: string;
      doc_count: number;
    },
  ];
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
};

type MessageSearchResult = Array<Work>;

type MessageModel = {
  model: string;
};

type MessageTool = {
  input: {
    query:
      | string
      | {
          agg_field: string;
          term_field: string;
          term: string;
        };
  };
  tool: "search" | "aggregate";
};

type MessageShape =
  | string
  | MessageAggregationResult
  | MessageSearchResult
  | MessageModel
  | MessageTool;

export type StreamingMessage = {
  ref: string;
  message?: MessageShape;
  type: MessageTypes;
};

export type ChatConfig = {
  auth: string;
  endpoint: string;
};
