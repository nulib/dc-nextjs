import Announcement from "@/components/Shared/Announcement";
import { IconClear } from "@/components/Shared/SVG/Icons";
import Link from "next/link";
import React from "react";
import { styled } from "@/stitches.config";

interface Props {
  handleClose: () => void;
  work: {
    id: string;
    title: string;
  };
}

/* eslint sort-keys: 0 */

const SimilarWrapper = styled(Announcement, {
  marginBottom: "$gr4",
  paddingTop: "$gr1",
  paddingBottom: "$gr1",
});

const SimilarStyled = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "$purple",
  position: "relative",

  "& button": {
    position: "absolute",
    right: 0,
    background: "transparent",
    border: "none",
    cursor: "pointer",

    "& span": {
      display: "none",
    },

    "& svg": {
      width: "$gr3",
      height: "$gr3",
    },
  },
});

const SearchSimilar: React.FC<Props> = ({ handleClose, work }) => {
  return (
    <SimilarWrapper>
      <SimilarStyled>
        <p>
          You are viewing works similar to{" "}
          <Link href={`/items/${work?.id}`}>{work?.title}</Link>
        </p>
        <button type="button" onClick={handleClose}>
          <span>Close</span>
          <IconClear />
        </button>
      </SimilarStyled>
    </SimilarWrapper>
  );
};

export default SearchSimilar;
