import React from "react";
import { styled } from "@/stitches.config";

const ResponseCertainty = ({ amount }: { amount: number }) => {
  return (
    <StyledResponseCertainty>
      {Math.floor(amount * 100)}%
    </StyledResponseCertainty>
  );
};

/* eslint sort-keys: 0 */

const StyledResponseCertainty = styled("span", {
  backgroundColor: "$black80",
  color: "$white",
  display: "flex",
  fontFamily: "$northwesternSerifRegular",
  fontSize: "$gr1",
  lineHeight: "1",
  padding: "$gr1",
  position: "absolute",
  borderTopLeftRadius: "5px",
  borderBottomRightRadius: "5px",
  right: "0",
  bottom: "0",
});

export default ResponseCertainty;
