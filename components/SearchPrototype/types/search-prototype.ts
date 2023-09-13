
export type QuestionRendered = {
  question: string;
  ref: string;
};

export type Question = {
  auth: string;
  message: "chat";
  question: string;
  ref: string;
};

export type SourceDocument = {
  page_content: string;
  metadata: {
    [key: string]: any;
  };
};

export type Answer = {
  ref: string;
  source_documents: Array<SourceDocument>;
  answer: string;
  question?: string; // revisit this
};

export type StreamingMessage = {
  answer?: string;
  question?: string;
  ref: string;
  source_documents?: Array<SourceDocument>;
  token?: string;
};