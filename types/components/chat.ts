import { Work } from "@nulib/dcapi-types";

export type Ref = {
  ref: string;
};

export type AggregationResultMessage = {
  type: "aggregation_result";
  message: {
    buckets: [
      {
        key: string;
        doc_count: number;
      },
    ];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
  };
};

export type AgentFinalMessage = {
  type: "final";
  message: string;
};

export type LLMAnswerMessage = {
  type: "answer";
  message: string;
};

export type LLMFinalMessage = {
  type: "final_message";
};

export type LLMTokenMessage = {
  type: "token";
  message: string;
};

export type LLMStopMessage = {
  type: "stop";
};

export type SearchResultMessage = {
  type: "search_result";
  message: Array<Work>;
};

export type StartMessage = {
  type: "start";
  message: {
    model: string;
  };
};

export type ToolStartMessage = {
  type: "tool_start";
  message:
    | {
        tool: "discover_fields";
        input: {};
      }
    | {
        tool: "search";
        input: {
          query: string;
        };
      }
    | {
        tool: "aggregate";
        input: { agg_field: string; term_field: string; term: string };
      }
    | {
        tool: "retrieve_documents";
        input: { doc_ids: string[] };
      };
};

export type StreamingMessage = Ref &
  (
    | AggregationResultMessage
    | AgentFinalMessage
    | LLMAnswerMessage
    | LLMFinalMessage
    | LLMTokenMessage
    | LLMStopMessage
    | SearchResultMessage
    | StartMessage
    | ToolStartMessage
  );

export type ChatConfig = {
  auth: string;
  endpoint: string;
};
