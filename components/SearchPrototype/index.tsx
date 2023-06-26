import React, { useState } from "react";
import AnswerResults from "./components/Answer/Results";
import FeedbackPrompt from "./components/Feedback/Prompt";
import QuestionInput from "./components/Question/Input";
import { useLocalStorage } from "./hooks/useLocalStorage";

const SearchPrototype = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>();
  const [questions, saveQuestions] = useLocalStorage<any>(
    "nul-chat-search",
    []
  );

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
      saveQuestions([...questions, { id, question, timestamp }]);
      setActiveQuestion(id);
    }
  };

  return (
    <>
      <QuestionInput onQuestionSubmission={handleQuestionSubmission} />
      {questions.length ? (
        <>
          <AnswerResults activeQuestion={activeQuestion as number} />
          <FeedbackPrompt />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchPrototype;
