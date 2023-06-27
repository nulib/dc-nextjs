import AnswerCertainty from "./Certainity";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Image from "next/image";
import React from "react";
import { styled } from "@/stitches.config";

export interface AnswerCardProps {
  metadata: any;
  page_content: string;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ metadata, page_content }) => {
  const { _additional, identifier, work_type } = metadata;
  const thumbnail = `${DCAPI_ENDPOINT}/works/${identifier}/thumbnail`;

  return (
    <StyledAnswerCard>
      <figure>
        <ImageWrapper>
          <Image alt={page_content} fill={true} src={thumbnail} />
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

  img: {
    color: "transparent",
  },
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
