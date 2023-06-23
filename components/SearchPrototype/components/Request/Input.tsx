import { Icon } from "@nulib/design-system";
import { IconArrowForward } from "@/components/Shared/SVG/Icons";
import React from "react";
import { styled } from "@stitches/react";

const RequestInput = () => {
  return (
    <StyledRequestInput>
      <input placeholder="Something on your mind?" />
      <button type="submit" aria-label="Search">
        <Icon>
          <IconArrowForward />
        </Icon>
      </button>
    </StyledRequestInput>
  );
};

/* eslint sort-keys: 0 */

const StyledRequestInput = styled("form", {
  backgroundColor: "$gray6",
  borderRadius: "5px",
  display: "flex",
  position: "relative",
  border: "1px solid $purple10",
  boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.05)",

  svg: {
    height: "$gr3",
    color: "$black20",
  },

  input: {
    flexGrow: 1,
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
    fontSize: "$gr3",
    padding: "$gr2 $gr3",
  },
});

export default RequestInput;
