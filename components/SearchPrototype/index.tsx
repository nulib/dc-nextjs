import FeedbackPrompt from "./components/Feedback/Prompt";
import React from "react";
import RequestInput from "./components/Request/Input";
import ResponseResults from "./components/Response/Results";

const SearchPrototype = () => {
  return (
    <>
      <RequestInput />
      <ResponseResults />
      <FeedbackPrompt />
    </>
  );
};

export default SearchPrototype;
