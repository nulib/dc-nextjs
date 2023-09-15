import React from "react";
import { styled } from "@stitches/react";

const StreamingAnswer = ({ answer }: { answer: string }) => {
  return <Answer>{answer}</Answer>;
};

const Answer = styled("article", {
  fontSize: "$gr3",
  fontFamily: "$northwesternSerifRegular !important",
  lineHeight: "1.76em",
  margin: "$gr3 0 $gr2",
});

export default StreamingAnswer;
