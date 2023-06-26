import AnswerCard from "./Card";
import Heading from "@/components/Heading/Heading";
import React from "react";
import mockAnswer from "../../fixtures/mock-answer";
import { styled } from "@/stitches.config";

const AnswerResults = () => {
  const { answer, question, source_documents } = mockAnswer;

  return (
    <StyledAnswerResults>
      <Header>
        <Heading as="h2">{question}</Heading>
      </Header>
      <Answer>{answer}</Answer>
      <Sources>
        {source_documents.map((document: any) => (
          <AnswerCard {...document} key={document.identifier} />
        ))}
      </Sources>
    </StyledAnswerResults>
  );
};

/* eslint sort-keys: 0 */

const Header = styled("header", {
  h2: {
    color: "$black !important",
    fontSize: "$gr5 !important",
    fontFamily: "$northwesternSansBold !important",
    padding: "$gr2 0 0 !important",
    margin: "0 !important",
  },
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
