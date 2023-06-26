import AnswerCertainty from "./Certainity";
import React from "react";
import { styled } from "@/stitches.config";

export interface AnswerCardProps {
  certainty: number;
  id: string;
  title: string;
  type: "Audio" | "Image" | "Video";
}

const AnswerCard: React.FC<AnswerCardProps> = ({ certainty, title, type }) => {
  return (
    <StyledAnswerCard>
      <figure>
        <ImageWrapper>
          <AnswerCertainty amount={certainty} />
        </ImageWrapper>
        <Context>
          <figcaption>
            <strong>{title}</strong>
            <span>{type}</span>
          </figcaption>
        </Context>
      </figure>
    </StyledAnswerCard>
  );
};

/* eslint sort-keys: 0 */

const ImageWrapper = styled("div", {
  backgroundColor: "$gray6",
  borderRadius: "5px",
  height: "$gr8",
  width: "$gr8",
  position: "relative",
});

const Context = styled("div", {
  padding: "$gr2 0",
  display: "flex",
  justifyContent: "space-between",
});

const StyledAnswerCard = styled("div", {
  figcaption: {
    span: {
      color: "$black50 !important",
      display: "block",
      fontFamily: "$northwesternSansLight",
      fontSize: "$gr2",
    },

    strong: {
      display: "block",
      fontFamily: "$northwesternSansBold",
      fontWeight: "400",
      marginBottom: "3px",
    },
  },

  figure: {
    margin: 0,
    padding: 0,
  },
});

export default AnswerCard;
