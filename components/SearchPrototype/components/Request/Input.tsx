import React from "react";
import { styled } from "@stitches/react";

const RequestInput = () => {
  return (
    <StyledRequestInput>
      <input placeholder="What's the deal?" />
      <button type="submit">Search</button>
    </StyledRequestInput>
  );
};

/* eslint sort-keys: 0 */

const StyledRequestInput = styled("form", {
  backgroundColor: "$gray6",
  borderRadius: "5px",
  display: "flex",
  overflow: "hidden",

  input: {
    flexGrow: 1,
  },

  "input, button": {
    background: "transparent",
    border: "none",
    color: "$black80",
    fontFamily: "$northwesternSansRegular",
    fontSize: "$gr3",
    padding: "$gr2 $gr3",
  },
});

export default RequestInput;
