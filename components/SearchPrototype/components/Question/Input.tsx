import React, { useState } from "react";

import { Icon } from "@nulib/design-system";
import { IconArrowForward } from "@/components/Shared/SVG/Icons";
import { styled } from "@stitches/react";

const QuestionInput = ({
  onQuestionSubmission,
}: {
  onQuestionSubmission: (question: string) => void;
}) => {
  const [question, setQuestion] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleQuestionSubmission = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onQuestionSubmission(question);

    // @ts-ignore
    event.target.reset();
  };

  return (
    <StyledQuestionInput onSubmit={handleQuestionSubmission}>
      <input
        placeholder="Something on your mind?"
        onChange={handleInputChange}
      />
      <button type="submit" aria-label="Search">
        <Icon>
          <IconArrowForward />
        </Icon>
      </button>
    </StyledQuestionInput>
  );
};

/* eslint sort-keys: 0 */

const StyledQuestionInput = styled("form", {
  backgroundColor: "$white",
  display: "flex",
  position: "relative",
  border: "1px solid $gray6",
  borderBottom: "none",
  boxShadow: "0 13px 21px 0 rgba(0, 0, 0, 0.13)",
  margin: "-$gr4 -$gr4 $gr5",
  borderRadius: "8px",

  svg: {
    height: "$gr3",
    color: "$brightBlueB",
  },

  input: {
    flexGrow: 1,
    outlineColor: "$brightBlueB",
  },

  button: {
    position: "absolute",
    right: "0",
    cursor: "pointer",
    fontFamily: "$northwesternSansBold !important",
  },

  "input, button": {
    background: "transparent",
    border: "none",
    color: "$black80",
    fontFamily: "$northwesternSansRegular",
    fontSize: "$gr4",
    padding: "$gr3 $gr4",
  },
});

export default QuestionInput;
