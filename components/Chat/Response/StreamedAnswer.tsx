import React from "react";
import { StyledStreamedAnswer } from "@/components/Chat/Response/Response.styled";
import useMarkdown from "@/hooks/useMarkdown";

const ResponseStreamedAnswer = ({
  isStreamingComplete,
  streamedAnswer,
}: {
  isStreamingComplete: boolean;
  streamedAnswer: string;
}) => {
  const { jsx: content } = useMarkdown({
    hasCursor: !isStreamingComplete,
    markdown: streamedAnswer,
  });

  return <StyledStreamedAnswer>{content}</StyledStreamedAnswer>;
};

export default ResponseStreamedAnswer;
