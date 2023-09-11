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
  question?: string; // revisit this
};

type StreamingMessage = {
  answer?: string;
  question?: string;
  ref: string;
  source_documents?: Array<SourceDocument>;
  token?: string;
};

const SearchPrototype: React.FC<SearchPrototypeProps> = ({ chatConfig }) => {
  const [chatSocket, setChatSocket] = React.useState<WebSocket>();
  const [readyState, setReadyState] = React.useState<WebSocket["readyState"]>();
  const [questions, saveQuestions] = useLocalStorage<any>(
    "nul-chat-search",
    []
  );

  // This is a pattern to access and update React state within a WebSocket event handler
  const [streamAnswers, _setStreamAnswers] = React.useState<Answer[]>([]);
  const streamAnswersRef = React.useRef(streamAnswers);
  const setStreamAnswers = (data: Array<Answer>) => {
    streamAnswersRef.current = data;
    console.log(`data`, data);
    _setStreamAnswers(data);
  };

  const { auth, endpoint } = chatConfig;

  const handleStateChange = (event: Event) => {
    const target = event.target as WebSocket;
    setReadyState(target.readyState);
  };

  const handleMessageUpdate = (event: MessageEvent) => {
    const data: StreamingMessage = JSON.parse(event.data);
    
    // Create a shallow copy of the current answers
    const updatedStreamAnswers = [...streamAnswersRef.current];
  
    // Check if the answer with the given 'ref' already exists in the state
    const answerIndex = updatedStreamAnswers.findIndex(answer => answer.ref === data.ref);
    const existingAnswer = updatedStreamAnswers[answerIndex];
    
    let updatedAnswer: Answer;
    if (existingAnswer) {
      // Create a shallow copy of the existing answer to modify
      updatedAnswer = { ...existingAnswer };
    } else {
      // Initialize a new answer
      updatedAnswer = {
        answer: "",
        question: data.question,
        ref: data.ref,
        source_documents: []
      };
    }
  
    // Update the properties of the answer based on the incoming data
    if (data.token) {
      updatedAnswer.answer += data.token;
    }
    if (data.source_documents) {
      updatedAnswer.source_documents = data.source_documents;
    }
    if (data.answer) {
      updatedAnswer.answer = data.answer;
    }
  
    // Replace or append the answer in the state array
    if (existingAnswer) {
      updatedStreamAnswers[answerIndex] = updatedAnswer;
    } else {
      /**
       * save the question in local storage
       */

      // questions.unshift({ id: ref, question: questionString, timestamp });
      // saveQuestions(questions);
    
      // Update the state with the modified array
      updatedStreamAnswers.push(updatedAnswer);
    }


    setStreamAnswers(updatedStreamAnswers);
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
    }
  };

  const defaultValue = streamAnswers.length
    ? `${streamAnswers[0].ref}`
    : undefined;
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

        <>
          {streamAnswers.map((answer: Answer) => {
            return (
              <article key={answer.ref}>
                <h3>{answer.question}</h3>
                <div>{answer.answer}</div>
              </article>
            )
          })}
        </>
      </Accordion.Root>
      <QuestionClearHistory />
    </>
  );
};

export default SearchPrototype;
