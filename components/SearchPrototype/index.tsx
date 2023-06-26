import AnswerResults from "./components/Answer/Results";
import FeedbackPrompt from "./components/Feedback/Prompt";
import HistoryDialog from "./components/History/Dialog";
import QuestionInput from "./components/Question/Input";
import React from "react";

const SearchPrototype = () => {
  return (
    <>
      <QuestionInput />
      <HistoryDialog />
      <AnswerResults />
      <FeedbackPrompt />
    </>
  );
};

export default SearchPrototype;
