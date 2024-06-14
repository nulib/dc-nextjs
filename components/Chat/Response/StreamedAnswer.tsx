import React from "react";
import { StyledStreamedAnswer } from "@/components/Chat/Response/Response.styled";
import useMarkdown from "@nulib/use-markdown";

const cursor = "<!--PLACEHOLDER_CURSOR-->";

const ResponseStreamedAnswer = ({
  isStreamingComplete,
  streamedAnswer,
}: {
  isStreamingComplete: boolean;
  streamedAnswer: string;
}) => {
  const preparedMarkdown = !isStreamingComplete
    ? streamedAnswer + cursor
    : streamedAnswer;

  const { html } = useMarkdown(preparedMarkdown);

  const cursorRegex = new RegExp(cursor, "g");
  const updatedHtml = !isStreamingComplete
    ? html.replace(cursorRegex, `<span class="markdown-cursor"></span>`)
    : html;

  return (
    <StyledStreamedAnswer>
      <div dangerouslySetInnerHTML={{ __html: updatedHtml }} />
    </StyledStreamedAnswer>
  );
};

export default ResponseStreamedAnswer;
