import * as Accordion from "@radix-ui/react-accordion";

import {
  Answer,
  QuestionRendered,
  StreamingMessage,
} from "./types/search-prototype";
import React, { useCallback, useEffect } from "react";
import {
  StyledAnswerHeader,
  StyledAnswerItem,
} from "./components/Answer/Answer.styled";

import AnswerLoader from "./components/Answer/Loader";
import AnswerResults from "./components/Answer/Results";
import { ChatConfig } from "@/pages";
import QuestionClearHistory from "./components/Question/ClearHistory";
import QuestionInput from "./components/Question/Input";
import SourceDocuments from "./components/Answer/SourceDocuments";
import StreamingAnswer from "./components/Answer/StreamingAnswer";
import { useLocalStorage } from "./hooks/useLocalStorage";
import useStreamingAnswers from "./hooks/useStreamingAnswers";

interface SearchPrototypeProps {
  chatConfig: ChatConfig;
}

const SearchPrototype: React.FC<SearchPrototypeProps> = ({ chatConfig }) => {
  const [questions, setQuestions] = React.useState<QuestionRendered[]>([]);
  const [chatSocket, setChatSocket] = React.useState<WebSocket>();
  const [readyState, setReadyState] = React.useState<WebSocket["readyState"]>();

  // const [questions, saveQuestions] = useLocalStorage<any>(
  //   "nul-chat-search",
  //   []
  // );

  const { prepareQuestion, updateStreamAnswers } = useStreamingAnswers();

  // This is a pattern to access and update React state within a WebSocket event handler
  const [streamAnswers, _setStreamAnswers] = React.useState<Answer[]>([]);
  const streamAnswersRef = React.useRef(streamAnswers);
  const setStreamAnswers = (data: Array<Answer>) => {
    streamAnswersRef.current = data;
    _setStreamAnswers(data);
  };

  const { auth: authToken, endpoint } = chatConfig;

  const handleReadyStateChange = (event: Event) => {
    const target = event.target as WebSocket;
    setReadyState(target.readyState);
  };

  const handleMessageUpdate = useCallback(
    (event: MessageEvent) => {
      const data: StreamingMessage = JSON.parse(event.data);
      const updatedStreamAnswers = updateStreamAnswers(data, [
        ...streamAnswersRef.current,
      ]);
      setStreamAnswers(updatedStreamAnswers);
    },
    [updateStreamAnswers]
  );

  useEffect(() => {
    const socket = new WebSocket(endpoint);
    setChatSocket(socket);
    socket.addEventListener("open", handleReadyStateChange);
    socket.addEventListener("close", handleReadyStateChange);
    socket.addEventListener("error", handleReadyStateChange);
    socket.addEventListener("message", handleMessageUpdate);

    return () => {
      socket.removeEventListener("open", handleReadyStateChange);
      socket.removeEventListener("close", handleReadyStateChange);
      socket.removeEventListener("error", handleReadyStateChange);
      socket.removeEventListener("message", handleMessageUpdate);
    };
  }, [authToken, endpoint, handleMessageUpdate]);

  const handleQuestionSubmission = (questionString: string) => {
    // do some basic validation and save the question
    if (questionString) {
      const question = prepareQuestion(questionString, authToken);
      const questionToStore = {
        question: question.question,
        ref: question.ref,
      };

      // apped questio to my questions React state array using prevState
      setQuestions((prevQuestions) => [questionToStore, ...prevQuestions]);

      chatSocket?.send(JSON.stringify(question));
    }
  };

  const defaultValue = questions.length ? `${questions[0].ref}` : undefined;

  return (
    <>
      <span>{readyState}</span>
      <Accordion.Root
        type="single"
        key={defaultValue}
        defaultValue={defaultValue}
      >
        {readyState === 1 && (
          <QuestionInput onQuestionSubmission={handleQuestionSubmission} />
        )}

        {questions.map((question: QuestionRendered) => {
          const answer = streamAnswers?.find(
            (answer) => question.ref === answer.ref
          );
          return (
            <StyledAnswerItem value={question.ref} key={question.ref}>
              <StyledAnswerHeader>
                <Accordion.Trigger>
                  <span>{question?.question}</span>
                </Accordion.Trigger>
              </StyledAnswerHeader>
              {answer?.answer ? (
                <Accordion.Content>
                  <SourceDocuments source_documents={answer.source_documents} />
                  <StreamingAnswer
                    answer={answer.answer}
                    isComplete={answer.isComplete}
                  />
                </Accordion.Content>
              ) : (
                <AnswerLoader />
              )}
            </StyledAnswerItem>
          );
        })}
      </Accordion.Root>
      <QuestionClearHistory />
    </>
  );
};

export default SearchPrototype;
