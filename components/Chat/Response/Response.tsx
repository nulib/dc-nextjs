import React, { use, useEffect, useState } from "react";
import {
  StyledQuestion,
  StyledResponse,
} from "@/components/Chat/Response/Response.styled";

import BouncingLoader from "@/components/Shared/BouncingLoader";
import Container from "@/components/Shared/Container";
import ResponseImages from "@/components/Chat/Response/Images";
import ResponseInterstitial from "@/components/Chat/Response/Interstitial";
import ResponseMarkdown from "@/components/Chat/Response/Markdown";
import ResponseOptions from "./Options";
import { prepareQuestion } from "@/lib/chat-helpers";
import useChatSocket from "@/hooks/useChatSocket";

interface ChatResponseProps {
  conversationRef?: string;
  question: string;
  responseCallback?: (response: any) => void;
}

const ChatResponse: React.FC<ChatResponseProps> = ({
  conversationRef,
  question,
  responseCallback,
}) => {
  const { authToken, isConnected, message, sendMessage } = useChatSocket();

  useEffect(() => {
    console.log(`trying to send message`);
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
    console.log(`message`, message);

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
          <ResponseImages works={message.message} />
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
    <StyledResponse>
      <StyledQuestion>{question}</StyledQuestion>
      <div>
        {renderedMessage}
        {streamedMessage && <ResponseMarkdown content={streamedMessage} />}
        {isStreamingComplete ? <ResponseOptions /> : <BouncingLoader />}
      </div>
    </StyledResponse>
  );
};

export default ChatResponse;
