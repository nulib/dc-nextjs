import React from "react";
import ResponseCard from "./Card";
import mockResponse from "../../fixtures/mock-response";
import { styled } from "@/stitches.config";

const ResponseResults = () => {
  return (
    <StyledResponseResults>
      <p>
        Foo lipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor
        mauris eget. Foo lipsum dolor sit amet, consectetur adipiscing elit. Foo
        lipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor mauris
        eget. Foo lipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div>
        {mockResponse.map((result) => (
          <ResponseCard {...result} key={result.id} />
        ))}
      </div>
    </StyledResponseResults>
  );
};

/* eslint sort-keys: 0 */

const StyledResponseResults = styled("div", {
  padding: "$gr3 0",

  "> div": {
    display: "flex",
    gap: "$gr4",
    overflowX: "scroll",
    padding: "$gr1 0",
  },

  p: {
    fontSize: "$gr3",
  },
});

export default ResponseResults;
