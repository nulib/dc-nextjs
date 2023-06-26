import AnswerResults from "./components/Answer/Results";
import FeedbackPrompt from "./components/Feedback/Prompt";
import QuestionInput from "./components/Question/Input";
import React from "react";

const SearchPrototype = () => {
  return (
    <>
      <QuestionInput />
      <AnswerResults />
      <FeedbackPrompt />
    </>
  );
};

export default SearchPrototype;
