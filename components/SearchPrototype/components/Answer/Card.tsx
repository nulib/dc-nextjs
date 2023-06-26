import AnswerCertainty from "./Certainity";
import React from "react";
import { styled } from "@/stitches.config";

export interface AnswerCardProps {
  _additional: any;
  metadata: any;
  page_content: string;
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  metadata,
  page_content,
  _additional,
}) => {
  const { work_type } = metadata;

  return (
    <StyledAnswerCard>
      <figure>
        <ImageWrapper>
          {_additional?.certainty && (
            <AnswerCertainty amount={_additional?.certainty} />
          )}
        </ImageWrapper>
        <Context>
          <figcaption>
            <strong>{page_content}</strong>
            <span>{work_type}</span>
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
    width: "$gr8",
    span: {
      color: "$black50 !important",
      display: "block",
      fontFamily: "$northwesternSansLight",
      fontSize: "$gr2",
      whiteSpace: "wrap",
    },

    strong: {
      color: "$black",
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
