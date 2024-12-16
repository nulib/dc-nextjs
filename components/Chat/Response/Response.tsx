import React, { useEffect, useState } from "react";
import {
  StyledQuestion,
  StyledResponse,
  StyledResponseWrapper,
} from "./Response.styled";

import BouncingLoader from "@/components/Shared/BouncingLoader";
import Container from "@/components/Shared/Container";
import ResponseImages from "@/components/Chat/Response/Images";
import ResponseMarkdown from "@/components/Chat/Response/Markdown";
import { StreamingMessage } from "@/types/components/chat";
import { Work } from "@nulib/dcapi-types";

interface ChatResponseProps {
  conversationRef?: string;
  message?: StreamingMessage;
  searchTerm: string;
  isStreamingComplete: boolean;
}

const ChatResponse: React.FC<ChatResponseProps> = ({
  conversationRef,
  message,
  searchTerm,
  isStreamingComplete,
}) => {
  const [renderedMessage, setRenderedMessage] = useState<any>();
  const [streamedMessage, setStreamedMessage] = useState<string>("");

  useEffect(() => {
    if (!message || message.ref !== conversationRef) return;

    const { type } = message;

    if (type === "token") {
      setStreamedMessage((prev) => prev + message?.message);
    }

    if (type === "answer") {
      resetStreamedMessage();

      // @ts-ignore
      setRenderedMessage((prev) => (
        <>
          {prev}
          <ResponseMarkdown content={streamedMessage} />
        </>
      ));
    }

    if (type === "search_result") {
      // @ts-ignore
      setRenderedMessage((prev) => (
        <>
          {prev}
          <ResponseImages
            works={message?.message as Work[]}
            isStreamingComplete={isStreamingComplete}
          />
        </>
      ));
    }
  }, [message]);

  function resetStreamedMessage() {
    setStreamedMessage("");
  }

  return (
    <StyledResponseWrapper>
      <Container>
        <StyledResponse>
          <StyledQuestion>{searchTerm}</StyledQuestion>
          {renderedMessage}
          {streamedMessage && <ResponseMarkdown content={streamedMessage} />}
          {!isStreamingComplete && <BouncingLoader />}
        </StyledResponse>
      </Container>
    </StyledResponseWrapper>
  );
};

export default ChatResponse;
