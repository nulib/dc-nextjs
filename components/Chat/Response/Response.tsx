import React, { use, useEffect, useState } from "react";
import {
  StyledQuestion,
  StyledResponse,
  StyledResponseWrapper,
} from "@/components/Chat/Response/Response.styled";

import BouncingLoader from "@/components/Shared/BouncingLoader";
import Container from "@/components/Shared/Container";
import ResponseImages from "@/components/Chat/Response/Images";
import ResponseInterstitial from "@/components/Chat/Response/Interstitial";
import ResponseMarkdown from "@/components/Chat/Response/Markdown";
import { StreamingMessage } from "@/types/components/chat";

interface ChatResponseProps {
  conversationRef?: string;
  isStreamingComplete: boolean;
  message?: StreamingMessage;
  question: string;
  responseCallback?: (renderedMessage: any) => void;
}

const ChatResponse: React.FC<ChatResponseProps> = ({
  conversationRef,
  isStreamingComplete,
  message,
  question,
  responseCallback,
}) => {
  const [renderedMessage, setRenderedMessage] = useState<any>();
  const [streamedMessage, setStreamedMessage] = useState<string>("");

  useEffect(() => {
    if (!message || message.ref !== conversationRef) return;

    const { type } = message;

    if (type === "token") {
      setStreamedMessage((prev) => prev + message.message);
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

    if (type === "tool_start") {
      // @ts-ignore
      setRenderedMessage((prev) => (
        <>
          {prev}
          <ResponseInterstitial message={message.message} />
        </>
      ));
    }

    if (type === "search_result") {
      // @ts-ignore
      setRenderedMessage((prev) => (
        <>
          {prev}
          <ResponseImages
            works={message.message}
            isStreamingComplete={isStreamingComplete}
          />
        </>
      ));
    }

    if (type === "aggregation_result") {
      console.log(`aggregation result`, message.message);

      // @ts-ignore
      setRenderedMessage((prev) => (
        <>
          {prev}
          <></>
        </>
      ));
    }

    /**
     * Final message is the last message in the response
     * and is used to trigger the responseCallback
     * to store this response.
     */
    if (type === "final_message") {
      if (responseCallback) responseCallback(renderedMessage);
    }
  }, [message]);

  useEffect(() => {
    resetRenderedMessage();
    resetStreamedMessage();
  }, [conversationRef]);

  function resetStreamedMessage() {
    setStreamedMessage("");
  }

  function resetRenderedMessage() {
    setRenderedMessage(undefined);
  }

  return (
    <StyledResponseWrapper>
      <Container>
        <StyledResponse>
          <StyledQuestion>{question}</StyledQuestion>
          {renderedMessage}
          {streamedMessage && <ResponseMarkdown content={streamedMessage} />}
          {!isStreamingComplete && <BouncingLoader />}
        </StyledResponse>
      </Container>
    </StyledResponseWrapper>
  );
};

export default ChatResponse;
