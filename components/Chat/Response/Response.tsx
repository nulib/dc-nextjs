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
import { useSearchState } from "@/context/search-context";
import { v4 as uuidv4 } from "uuid";
import type { Turn } from "@/types/context/search-context";
import InterstitialDocuments from "./InterstitialDocuments";

interface ChatResponseProps {
  conversationIndex: number;
  conversationRef?: string;
  question: string;
  userDocs: Turn["userDocs"];
  content?: React.JSX.Element;
  responseCallback?: (response?: any) => void;
}

const ChatResponse: React.FC<ChatResponseProps> = ({
  conversationIndex,
  conversationRef,
  question,
  userDocs,
  content,
  responseCallback,
}) => {
  const { authToken, isConnected, message, sendMessage } = useChatSocket();
  const { searchState, searchDispatch } = useSearchState();
  const [turnAnswer, setTurnAnswer] = useState<Turn["answer"]>("");
  const [turnAggregations, setTurnAggregations] = useState<
    Turn["aggregations"]
  >([]);
  const [turnWorks, setTurnWorks] = useState<Turn["works"]>([]);

  useEffect(() => {
    if (isConnected && authToken && question && conversationRef) {
      const preparedQuestion = prepareQuestion(
        question,
        authToken,
        conversationRef,
        userDocs,
      );
      sendMessage(preparedQuestion);
    }
  }, [isConnected, authToken, question, conversationRef]);

  const [renderedMessage, setRenderedMessage] = useState<React.JSX.Element>();
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
      setRenderedMessage((prev) => (
        <>
          {prev}
          <ResponseMarkdown content={message.message} messageType={type} />
        </>
      ));
      setTurnAnswer(turnAnswer + message.message);
    }

    if (type === "tool_start") {
      setRenderedMessage((prev) => (
        <>
          {prev}
          <ResponseInterstitial message={message.message} id={uuidv4()} />
        </>
      ));
    }

    if (type === "search_result") {
      setRenderedMessage((prev) => (
        <>
          {prev}
          <ResponseImages works={message.message} />
        </>
      ));
      setTurnWorks([...turnWorks, message.message]);
    }

    if (type === "aggregation_result") {
      setRenderedMessage((prev) => (
        <>
          {prev}
          <ResponseAggregations message={message.message} />
        </>
      ));

      setTurnAggregations([...turnAggregations, message.message]);
    }

    /**
     * Final message is the last message in the response
     * and is used to trigger the responseCallback
     * and store this response to the conversation.
     */
    if (type === "final_message") {
      setIsStreamingComplete(true);

      // update the corresponding turn with the response
      const turns = searchState.conversation.turns;
      turns[conversationIndex] = {
        ...turns[conversationIndex],
        answer: turnAnswer,
        aggregations: turnAggregations,
        works: turnWorks,
        renderedContent: renderedMessage,
      };

      searchDispatch({
        type: "updateConversation",
        conversation: {
          ...searchState.conversation,
          turns,
        },
      });

      if (responseCallback) responseCallback();
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
      {userDocs && userDocs.length > 0 && (
        <InterstitialDocuments documents={userDocs} canRemove={false} />
      )}
      <div data-testid="response-content">
        {content ? (
          content
        ) : (
          <>
            {renderedMessage}
            {streamedMessage && (
              <ResponseMarkdown content={streamedMessage} messageType="token" />
            )}
          </>
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
