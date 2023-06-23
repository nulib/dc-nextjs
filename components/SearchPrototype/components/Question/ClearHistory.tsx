import { Toaster, toast } from "sonner";
import React from "react";
import { styled } from "@/stitches.config";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const QuestionClearHistory = () => {
  const [questions, saveQuestions] = useLocalStorage<any>(
    "nul-chat-search",
    []
  );

  const handleClick = () => {
    saveQuestions([]);
    toast.success(`Cleared search history.`);
  };
  return (
    <>
      <Toaster position="bottom-center" />
      {questions.length > 0 && (
        <StyledQuestionClearHistory onClick={handleClick}>
          Clear Search History
        </StyledQuestionClearHistory>
      )}
    </>
  );
};

/* eslint sort-keys: 0 */

const StyledQuestionClearHistory = styled("button", {
  backgroundColor: "$white",
  border: "none",
  color: "$black50",
  cursor: "pointer",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr2",
  margin: "$gr2 0",
  padding: "0",
  textDecoration: "underline",

  "&:hover": {
    color: "$brightBlueB",
    textDecoration: "none",
  },
});

export default QuestionClearHistory;
