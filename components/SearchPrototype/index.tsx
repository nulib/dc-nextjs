import * as Accordion from "@radix-ui/react-accordion";

import {
  Answer,
  QuestionRendered,
  StreamingMessage,
} from "./types/search-prototype";
import React, { useCallback, useEffect } from "react";
import {
  StyledActions,
  StyledAnswerHeader,
  StyledAnswerItem,
  StyledRemoveButton,
} from "./components/Answer/Answer.styled";

import AnswerInformation from "./components/Answer/Information";
import AnswerLoader from "./components/Answer/Loader";
import { ChatConfig } from "@/pages";
import Icon from "@/components/Shared/Icon";
import { IconClear } from "@/components/Shared/SVG/Icons";
import QuestionInput from "./components/Question/Input";
import SourceDocuments from "./components/Answer/SourceDocuments";
import StreamingAnswer from "./components/Answer/StreamingAnswer";
import useLocalStorageSimple from "./hooks/useLocalStorageSimple";
import useStreamingAnswers from "./hooks/useStreamingAnswers";

interface SearchPrototypeProps {
  chatConfig: ChatConfig;
}

const SearchPrototype: React.FC<SearchPrototypeProps> = ({ chatConfig }) => {
  const { auth: authToken, endpoint } = chatConfig;
  const { prepareQuestion, updateStreamAnswers } = useStreamingAnswers();

  const [chatSocket, setChatSocket] = React.useState<WebSocket>();
  const [readyState, setReadyState] = React.useState<WebSocket["readyState"]>();

  const [questions, setQuestions] = useLocalStorageSimple<QuestionRendered[]>(
    "nul-chat-search-questions",
    []
  );

  /**
   * A pattern to access and update React state within a WebSocket event handler
   */
  const [streamAnswers, _setStreamAnswers] = useLocalStorageSimple<Answer[]>(
    "nul-chat-search-answers",
    []
  );

  const streamAnswersRef = React.useRef(streamAnswers);
  const setStreamAnswers = useCallback(
    (data: Array<Answer>) => {
      streamAnswersRef.current = data;
      _setStreamAnswers(data);
    },
    [_setStreamAnswers]
  );

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
    [setStreamAnswers, updateStreamAnswers]
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

      // Append question to my questions React state array using prevState
      setQuestions((prevQuestions) => [questionToStore, ...prevQuestions]);
      chatSocket?.send(JSON.stringify(question));
    }
  };

  const handleDelete = (ref: string) => {
    const updatedQuestions = questions.filter((q: any) => q.ref !== ref);
    const updatedAnswers = streamAnswers.filter((a: any) => a.ref !== ref);
    setQuestions(updatedQuestions);
    setStreamAnswers(updatedAnswers);
  };

  const defaultValue = questions.length ? `${questions[0].ref}` : undefined;

  return (
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

              <StyledActions>
                {answer?.answer && <AnswerInformation timestamp={1212} />}
                <StyledRemoveButton onClick={() => handleDelete(question.ref)}>
                  <Icon>
                    <IconClear />
                  </Icon>
                </StyledRemoveButton>
              </StyledActions>
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
  );
};

export default SearchPrototype;
