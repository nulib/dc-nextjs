import React from "react";
import { styled } from "@/stitches.config";

const FeedbackPrompt = () => {
  return (
    <StyledFeedbackPrompt>
      <p>
        Do you have questions or feedback regarding these results?{" "}
        <a href="#">Let us know</a>.
      </p>
    </StyledFeedbackPrompt>
  );
};

/* eslint sort-keys: 0 */

const StyledFeedbackPrompt = styled("div", {
  fontSize: "$gr2",
  fontFamily: "$northwesternSansRegular !important",
  textAlign: "center",
  color: "$black80",
  padding: "$gr3 0",

  "a, a:visited": {
    textDecoration: "underline",
    color: "$black80",
  },
});

export default FeedbackPrompt;
