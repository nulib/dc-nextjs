import { Work } from "@nulib/dcapi-types";

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

export type Answer = {
  answer: string;
  isComplete: boolean;
  question?: string;
  ref: string;
  source_documents: Array<Work>;
};

export type StreamingMessage = {
  answer?: string;
  question?: string;
  ref: string;
  source_documents?: Array<Work>;
  token?: string;
};

export type ChatConfig = {
  auth: string;
  endpoint: string;
};
