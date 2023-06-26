import { Icon } from "@nulib/design-system";
import { IconArrowForward } from "@/components/Shared/SVG/Icons";
import React from "react";
import { styled } from "@stitches/react";

const QuestionInput = () => {
  return (
    <StyledQuestionInput>
      <input placeholder="Something on your mind?" />
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
  boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.05)",
  borderBottom: "1px solid $gray6",
  margin: "-$gr4 -$gr4 0",
  borderRadius: "13px",
  borderBottomLeftRadius: "0",
  borderBottomRightRadius: "0",

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
