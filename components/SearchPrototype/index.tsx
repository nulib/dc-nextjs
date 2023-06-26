import React, { useEffect } from "react";
import AnswerResults from "./components/Answer/Results";
import FeedbackPrompt from "./components/Feedback/Prompt";
import QuestionInput from "./components/Question/Input";
import { useLocalStorage } from "./hooks/useLocalStorage";

const SearchPrototype = () => {
  const [questions, saveQuestions] = useLocalStorage<any>(
    "nul-chat-search",
    []
  );

  const handleQuestionSubmission = (submission: string) => {
    const date = new Date();
    const timestamp = date.getTime();

    const newQuestion = { question: submission, timestamp };

    saveQuestions([...questions, newQuestion]);
  };

  useEffect(() => {
    //
  }, [questions]);

  return (
    <>
      <QuestionInput onQuestionSubmission={handleQuestionSubmission} />
      {questions.length ? (
        <>
          <AnswerResults />
          <FeedbackPrompt />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchPrototype;
