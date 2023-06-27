import * as Accordion from "@radix-ui/react-accordion";
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

      questions.unshift({ id, question, timestamp });
      saveQuestions(questions);
      setActiveQuestion(id);
    }
  };

  const defaultValue = questions.length ? `${questions[0].id}` : undefined;

  return (
    <Accordion.Root
      type="single"
      defaultValue={defaultValue}
      key={defaultValue}
    >
      <QuestionInput onQuestionSubmission={handleQuestionSubmission} />
      {questions.length ? (
        questions.map((question: any) => (
          <AnswerResults questionId={question.id as number} key={question.id} />
        ))
      ) : (
        <></>
      )}
    </Accordion.Root>
  );
};

export default SearchPrototype;
