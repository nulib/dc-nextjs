import React, { useRef } from "react";

import { keyframes } from "@/stitches.config";
import { styled } from "@stitches/react";

const StreamingAnswer = ({
  answer,
  isComplete,
}: {
  answer: string;
  isComplete: boolean;
}) => {
  const answerElement = useRef(null);

  return (
    <Answer ref={answerElement}>
      {answer}
      {!isComplete && <Cursor />}
    </Answer>
  );
};

/* eslint sort-keys: 0 */

const Answer = styled("article", {
  fontSize: "$gr3",
  fontFamily: "$northwesternSerifRegular !important",
  lineHeight: "1.76em",
  margin: "$gr3 0 $gr2",
});

const Blinker = keyframes({
  "50%": {
    opacity: 0,
  },
});

const Cursor = styled("span", {
  position: "relative",
  marginLeft: "$gr1",

  "&::before": {
    content: '""',
    position: "absolute",
    width: "10px",
    height: "1.4em",
    backgroundColor: "$black20",
    animation: `${Blinker} 1s linear infinite`,
  },
});

export default StreamingAnswer;
