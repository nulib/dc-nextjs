import { keyframes, styled } from "@/stitches.config";

import React from "react";

const BouncingLoader = () => {
  return (
    <StyledBouncingLoader aria-label="loading" role="status">
      <div></div>
      <div></div>
      <div></div>
    </StyledBouncingLoader>
  );
};

/* eslint sort-keys: 0 */

const bouncingLoader = keyframes({
  to: {
    backgroundColor: "$brightBlueB",
    transform: "translateY(-13px)",
  },
});

const StyledBouncingLoader = styled("div", {
  display: "flex",
  margin: "$gr2 0",

  "& > div": {
    width: "$gr2",
    height: "$gr2",
    margin: "$gr1 $gr1",
    borderRadius: "50%",
    backgroundColor: "$purple",
    opacity: 1,
    animation: `${bouncingLoader} 0.6s infinite alternate`,

    "&:nth-child(2)": {
      animationDelay: "0.2s",
    },

    "&:nth-child(3)": {
      animationDelay: "0.4s",
    },
  },
});

export default BouncingLoader;
