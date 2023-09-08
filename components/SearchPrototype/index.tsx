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

const SearchPrototype: React.FC<SearchPrototypeProps> = ({ chatConfig }) => {
  const [chatSocket, setChatSocket] = React.useState<WebSocket>();
  const [readyState, setReadyState] = React.useState<WebSocket["readyState"]>();
  const [questions, saveQuestions] = useLocalStorage<any>(
    "nul-chat-search",
    []
  );

  const { auth, endpoint } = chatConfig;

  const handleStateChange = (event: Event) => {
    const target = event.target as WebSocket;
    setReadyState(target.readyState);
  };

  useEffect(() => {
    const socket = new WebSocket(endpoint);
    setChatSocket(socket);
    socket.addEventListener("open", handleStateChange);
    socket.addEventListener("close", handleStateChange);
    socket.addEventListener("error", handleStateChange);

    return () => {
      socket.removeEventListener("open", handleStateChange);
      socket.removeEventListener("close", handleStateChange);
      socket.removeEventListener("error", handleStateChange);
    };
  }, [auth, endpoint]);

  useEffect(() => {
    if (chatSocket)
      chatSocket.onopen = (event) => {
        console.log(event);
        chatSocket.send(
          JSON.stringify({
            auth,
            message: "chat",
            question: "Are you there?",
            ref: "1234",
          })
        );
      };
  }, [chatSocket, auth]);

  const handleQuestionSubmission = (question: string) => {
    /**
     * do some basic validation and save the question
     */
    if (question) {
      const date = new Date();
      const timestamp = date.getTime();

      /**
       * hackily generate unique id from string and timestamp
       */
      const uniqueString = `${question}${timestamp}`;
      const id = uniqueString.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);

      /**
       * save the question in local storage
       */

      questions.unshift({ id, question, timestamp });
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
        {questions.length ? (
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
        )}
      </Accordion.Root>
      <QuestionClearHistory />
    </>
  );
};

export default SearchPrototype;
