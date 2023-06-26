import AnswerCard from "./Card";
import React from "react";
import mockAnswer from "../../fixtures/mock-answer";
import { styled } from "@/stitches.config";

const AnswerResults = () => {
  const { data, summary } = mockAnswer;

  return (
    <StyledAnswerResults>
      <Question>How many photos of dogs do you have?</Question>
      <Answer>{summary}</Answer>
      <Sources>
        {data.map((result) => (
          <AnswerCard {...result} key={result.id} />
        ))}
      </Sources>
    </StyledAnswerResults>
  );
};

/* eslint sort-keys: 0 */

const Question = styled("header", {
  color: "$black",
  fontSize: "$gr4",
  fontFamily: "$northwesternSansBold !important",
  padding: "$gr2 0 0",
});

const Answer = styled("article", {
  fontSize: "$gr3",
  fontFamily: "$northwesternSerifRegular !important",
  lineHeight: "1.76em",
  padding: "$gr3 0",
});

const Sources = styled("div", {
  display: "flex",
  gap: "$gr4",
  overflowX: "scroll",
  padding: "$gr1 0",
});

const StyledAnswerResults = styled("div", {
  padding: "$gr4 0",
});

export default AnswerResults;
