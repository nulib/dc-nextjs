import * as Accordion from "@radix-ui/react-accordion";

import React, { useEffect } from "react";

import AnswerResults from "./components/Answer/Results";
import { ChatConfig } from "@/pages";
import QuestionClearHistory from "./components/Question/ClearHistory";
import QuestionInput from "./components/Question/Input";
import { useLocalStorage } from "./hooks/useLocalStorage";

interface SearchPrototypeProps {
  chatConfig: ChatConfig;
}

type Question = {
  auth: string;
  message: "chat";
  question: string;
  ref: string;
};

type SourceDocument = {
  page_content: string;
  metadata: {
    [key: string]: any;
  };
};

type Answer = {
  ref: string;
  source_documents: Array<SourceDocument>;
  answer: string;
};

type StreamingMessageEventData =
  | AnswerMessage
  | ContextMessage
  | StreamingMessage;

type ContextMessage = {
  question: string;
  ref: string;
  source_documents: Array<SourceDocument>;
};

type StreamingMessage = {
  ref: string;
  token: string;
};

type AnswerMessage = {
  answer: string;
  ref: string;
};

const SearchPrototype: React.FC<SearchPrototypeProps> = ({ chatConfig }) => {
  const [chatSocket, setChatSocket] = React.useState<WebSocket>();
  const [readyState, setReadyState] = React.useState<WebSocket["readyState"]>();
  const [questions, saveQuestions] = useLocalStorage<any>(
    "nul-chat-search",
    []
  );

  const [streamAnswers, setStreamAnswers] = React.useState<Answer[]>([]);

  const { auth, endpoint } = chatConfig;

  const handleStateChange = (event: Event) => {
    const target = event.target as WebSocket;
    setReadyState(target.readyState);
  };

  const handleMessageUpdate = (event: MessageEvent) => {
    const data: StreamingMessageEventData = JSON.parse(event.data);
    console.log("data", data);

    // Does the 'ref' exist in the answers array?
  };

  useEffect(() => {
    const socket = new WebSocket(endpoint);
    setChatSocket(socket);
    socket.addEventListener("open", handleStateChange);
    socket.addEventListener("close", handleStateChange);
    socket.addEventListener("error", handleStateChange);
    socket.addEventListener("message", handleMessageUpdate);

    return () => {
      socket.removeEventListener("open", handleStateChange);
      socket.removeEventListener("close", handleStateChange);
      socket.removeEventListener("error", handleStateChange);
      socket.removeEventListener("message", handleMessageUpdate);
    };
  }, [auth, endpoint]);

  const handleQuestionSubmission = (questionString: string) => {
    /**
     * do some basic validation and save the question
     */
    if (questionString) {
      const date = new Date();
      const timestamp = date.getTime();

      /**
       * hackily generate unique id from string and timestamp
       */
      const uniqueString = `${questionString}${timestamp}`;

      // Refactor the following as a SHA1[0..4]
      const ref = uniqueString
        .split("")
        .reduce((a, b) => {
          a = (a << 5) - a + b.charCodeAt(0);
          return a & a;
        }, 0)
        .toString();

      const question: Question = {
        auth,
        message: "chat",
        question: questionString,
        ref,
      };

      chatSocket?.send(JSON.stringify(question));

      /**
       * save the question in local storage
       */

      questions.unshift({ id: ref, question: questionString, timestamp });
      saveQuestions(questions);
    }
  };

  const defaultValue = questions.length ? `${questions[0].id}` : undefined;

  return (
    <>
      <span>{readyState}</span>
      <Accordion.Root
        type="single"
        defaultValue={defaultValue}
        key={defaultValue}
      >
        {readyState === 1 && (
          <QuestionInput onQuestionSubmission={handleQuestionSubmission} />
        )}
        {/* {questions.length ? (
          <>
            {questions.map((question: any) => (
              <AnswerResults
                questionId={question.id as number}
                key={question.id}
              />
            ))}
          </>
        ) : (
          <></>
        )} */}
      </Accordion.Root>
      <QuestionClearHistory />
    </>
  );
};

export default SearchPrototype;
