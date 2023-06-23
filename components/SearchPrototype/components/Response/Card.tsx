import React from "react";
import { styled } from "@/stitches.config";

const ResponseCard = ({ title }: { title: string }) => {
  return (
    <StyledResponseCard>
      <figure>
        <ImageWrapper></ImageWrapper>
        <figcaption>
          <strong>{title}</strong>
          <span>Image</span>
        </figcaption>
      </figure>
    </StyledResponseCard>
  );
};

/* eslint sort-keys: 0 */

const ImageWrapper = styled("div", {
  backgroundColor: "$gray6",
  borderRadius: "5px",
  height: "$gr8",
  width: "$gr8",
  border: "1px solid $purple10",
});

const StyledResponseCard = styled("div", {
  figcaption: {
    padding: "$gr2 0",

    span: {
      color: "$black50 !important",
      display: "block",
      fontFamily: "$northwesternSansLight",
      fontSize: "$gr2",
    },

    strong: {
      display: "block",
      fontFamily: "$northwesternSansBold",
      marginBottom: "3px",
    },
  },

  figure: {
    margin: 0,
    padding: 0,
  },
});

export default ResponseCard;
