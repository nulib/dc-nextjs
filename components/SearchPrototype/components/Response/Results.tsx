import React from "react";
import ResponseCard from "./Card";
import mockResponse from "../../fixtures/mock-response";
import { styled } from "@/stitches.config";

const ResponseResults = () => {
  const { data, summary } = mockResponse;

  return (
    <StyledResponseResults>
      {summary && <p>{summary}</p>}
      <div>
        {data.map((result) => (
          <ResponseCard {...result} key={result.id} />
        ))}
      </div>
    </StyledResponseResults>
  );
};

/* eslint sort-keys: 0 */

const StyledResponseResults = styled("div", {
  padding: "$gr4 0",

  "> div": {
    display: "flex",
    gap: "$gr4",
    overflowX: "scroll",
    padding: "$gr1 0",
  },

  p: {
    fontSize: "$gr3",
    fontFamily: "$northwesternSerifRegular !important",
  },
});

export default ResponseResults;
