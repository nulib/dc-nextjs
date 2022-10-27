import React from "react";
import { maxWidths } from "@/styles/containers";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const AnnouncementStyled = styled("section", {
  background: "$purple10",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "$gr4",
  padding: "$gr3",

  "& h2": {
    color: "$purple",
    fontFamily: "$displayBold",
  },

  "& a": {
    color: "$purple",
    textDecoration: "underline",

    "&:hover": {
      textDecoration: "none",
    },
  },
});

const ContentWrapper = styled("div", {
  maxWidth: maxWidths.default,
  width: "100%",
});

interface AnnouncementProps {
  children: React.ReactNode;
}

const Announcement: React.FC<AnnouncementProps> = ({
  children,
  ...restProps
}) => {
  return (
    <AnnouncementStyled {...restProps}>
      <ContentWrapper>{children}</ContentWrapper>
    </AnnouncementStyled>
  );
};

export default Announcement;
