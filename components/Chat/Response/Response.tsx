import React, { useEffect, useState } from "react";
import {
  StyledQuestion,
  StyledResponse,
} from "@/components/Chat/Response/Response.styled";

import BouncingLoader from "@/components/Shared/BouncingLoader";
import ResponseAggregations from "@/components/Chat/Response/Aggregations";
import ResponseImages from "@/components/Chat/Response/Images";
import ResponseInterstitial from "@/components/Chat/Response/Interstitial";
import ResponseMarkdown from "@/components/Chat/Response/Markdown";
import ResponseOptions from "./Options";
import { prepareQuestion } from "@/lib/chat-helpers";
import useChatSocket from "@/hooks/useChatSocket";
import { v4 as uuidv4 } from "uuid";

interface ChatResponseProps {
  conversationIndex: number;
  conversationRef?: string;
  question: string;
  responseCallback?: (response: any) => void;
}

const ChatResponse: React.FC<ChatResponseProps> = ({
  conversationIndex,
  conversationRef,
  question,
  responseCallback,
}) => {
  const { authToken, isConnected, message, sendMessage } = useChatSocket();

  useEffect(() => {
    if (isConnected && authToken && question && conversationRef) {
      const preparedQuestion = prepareQuestion(
        question,
        authToken,
        conversationRef,
      );
      sendMessage(preparedQuestion);
    }
  }, [isConnected, authToken, question, conversationRef]);

  const [renderedMessage, setRenderedMessage] = useState<any>();
  const [streamedMessage, setStreamedMessage] = useState<string>("");
  const [isStreamingComplete, setIsStreamingComplete] = useState(false);

  useEffect(() => {
    setIsStreamingComplete(false);
  }, [conversationRef, question]);

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
          <ResponseMarkdown content={message.message} messageType={type} />
        </>
      ));
    }

    if (type === "tool_start") {
      // @ts-ignore
      setRenderedMessage((prev) => (
        <>
          {prev}
          <ResponseInterstitial message={message.message} id={uuidv4()} />
        </>
      ));
    }

    if (type === "search_result") {
      // @ts-ignore
      setRenderedMessage((prev) => (
        <>
          {prev}
          <ResponseImages works={message.message} />
        </>
      ));
    }

    if (type === "aggregation_result") {
      // @ts-ignore
      setRenderedMessage((prev) => (
        <>
          {prev}
          <ResponseAggregations message={message.message} />
        </>
      ));
    }

    /**
     * Final message is the last message in the response
     * and is used to trigger the responseCallback
     * to store this response.
     */
    if (type === "final_message") {
      setIsStreamingComplete(true);
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
    <StyledResponse
      data-index={conversationIndex}
      data-ref={conversationRef}
      data-question={question}
    >
      <StyledQuestion>{question}</StyledQuestion>
      <div data-testid="response-content">
        {renderedMessage}
        {streamedMessage && (
          <ResponseMarkdown content={streamedMessage} messageType="token" />
        )}
        {isStreamingComplete ? (
          <ResponseOptions conversationIndex={conversationIndex} />
        ) : (
          <BouncingLoader />
        )}
      </div>
    </StyledResponse>
  );
};

export default ChatResponse;
