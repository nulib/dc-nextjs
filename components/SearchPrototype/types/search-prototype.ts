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
  answer: string;
  isComplete: boolean;
  question?: string; // revisit this
  ref: string;
  source_documents: Array<SourceDocument>;
};

export type StreamingMessage = {
  answer?: string;
  question?: string;
  ref: string;
  source_documents?: Array<SourceDocument>;
  token?: string;
};
