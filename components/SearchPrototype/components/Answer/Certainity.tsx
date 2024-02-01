import React from "react";
import { styled } from "@/stitches.config";

const AnswerCertainty = ({ amount }: { amount: number }) => {
  return (
    <StyledAnswerCertainty>{Math.floor(amount * 100)}%</StyledAnswerCertainty>
  );
};

/* eslint sort-keys: 0 */

const StyledAnswerCertainty = styled("span", {
  backgroundColor: "$white",
  color: "$brightBlueB",
  display: "flex",
  fontFamily: "$northwesternSerifBold",
  fontSize: "$gr2",
  lineHeight: "1",
  padding: "$gr1",
  position: "absolute",
  borderTopLeftRadius: "5px",
  borderBottomRightRadius: "5px",
  border: "1px solid $gray6",
  right: "0",
  bottom: "0",
});

export default AnswerCertainty;
