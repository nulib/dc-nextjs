import React from "react";
import { StyledResponseMarkdown } from "@/components/Chat/Response/Response.styled";
import useMarkdown from "@nulib/use-markdown";

const ResponseMarkdown = ({ content }: { content: string }) => {
  const { jsx } = useMarkdown(content);

  return <StyledResponseMarkdown>{jsx}</StyledResponseMarkdown>;
};

export default ResponseMarkdown;
