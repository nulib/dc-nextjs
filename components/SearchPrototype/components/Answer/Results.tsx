import AnswerCard from "./Card";
import React from "react";
import mockAnswer from "../../fixtures/mock-answer";
import { styled } from "@/stitches.config";

const AnswerResults = () => {
  const { data, summary } = mockAnswer;

  return (
    <StyledAnswerResults>
      {summary && <p>{summary}</p>}
      <div>
        {data.map((result) => (
          <AnswerCard {...result} key={result.id} />
        ))}
      </div>
    </StyledAnswerResults>
  );
};

/* eslint sort-keys: 0 */

const StyledAnswerResults = styled("div", {
  padding: "$gr4 0",

  "> div": {
    display: "flex",
    gap: "$gr4",
    overflowX: "scroll",
    padding: "$gr1 0",
  },

  p: {
    color: "$black",
    fontSize: "$gr3",
    fontFamily: "$northwesternSerifRegular !important",
  },
});

export default AnswerResults;
