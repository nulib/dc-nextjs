import { AI_DISCLAIMER, AI_SEARCH_UNSUBMITTED } from "@/lib/constants/common";
import React, { useEffect, useState } from "react";
import {
  StyledResponseActions,
  StyledResponseDisclaimer,
  StyledUnsubmitted,
} from "@/components/Chat/Response/Response.styled";
import { defaultState, useSearchState } from "@/context/search-context";

import Announcement from "@/components/Shared/Announcement";
import { Button } from "@nulib/design-system";
import ChatFeedback from "@/components/Chat/Feedback/Feedback";
import ChatResponse from "@/components/Chat/Response/Response";
import Container from "@/components/Shared/Container";
import { prepareQuestion } from "@/lib/chat-helpers";
import useChatSocket from "@/hooks/useChatSocket";
import useQueryParams from "@/hooks/useQueryParams";
import { v4 as uuidv4 } from "uuid";

const Chat = ({
  viewResultsCallback,
}: {
  viewResultsCallback?: () => void;
}) => {
  const { searchTerm = "" } = useQueryParams();
  const { authToken, isConnected, message, sendMessage } = useChatSocket();
  const [conversationRef, setConversationRef] = useState<string>();

  const [streamingError, setStreamingError] = useState("");

  /**
   * get the`chat` state and dispatch function from the search context
   * for persisting the chat state when search screen tabs are switched
   */
  const {
    searchState: { chat },
    searchDispatch,
  } = useSearchState();
  const { question, answer } = chat;

  const [isStreamingComplete, setIsStreamingComplete] = useState(false);

  useEffect(() => {
    if (
      !isStreamingComplete &&
      isConnected &&
      authToken &&
      searchTerm &&
      conversationRef
    ) {
      resetChat();
      const preparedQuestion = prepareQuestion(
        searchTerm,
        authToken,
        conversationRef,
      );
      sendMessage(preparedQuestion);
    }
  }, [
    authToken,
    isStreamingComplete,
    isConnected,
    searchTerm,
    conversationRef,
    sendMessage,
  ]);

  useEffect(() => {
    setIsStreamingComplete(false);
    setConversationRef(uuidv4());
  }, [searchTerm]);

  useEffect(() => {
    if (!message || !conversationRef) return;
  }, [message]);

  function handleNewQuestion() {
    const input = document.getElementById("dc-search") as HTMLInputElement;
    if (input) {
      input.focus();
      input.value = "";
    }
  }

  function resetChat() {
    searchDispatch({
      chat: defaultState.chat,
      type: "updateChat",
    });
  }

  if (!searchTerm)
    return (
      <Container>
        <StyledUnsubmitted>{AI_SEARCH_UNSUBMITTED}</StyledUnsubmitted>
      </Container>
    );

  const handleResponseCallback = (content: any) => {
    if (!conversationRef) return;

    setIsStreamingComplete(true);
    searchDispatch({
      chat: {
        // content here is now a react element
        // once continued conversations ar e in place
        // see note below for question refactor
        answer: content,

        // documents should be eventually removed as
        // they are now integrated into content
        // doing so will require some careful refactoring
        // as the documents are used in feedback form
        documents: [],

        // question should become an entry[] with
        // entry[n].question and entry[n].content
        question: searchTerm || "",

        ref: conversationRef,
      },
      type: "updateChat",
    });
  };

  return (
    <>
      <ChatResponse
        conversationRef={conversationRef}
        isStreamingComplete={isStreamingComplete}
        key={conversationRef}
        message={message}
        question={searchTerm}
        responseCallback={handleResponseCallback}
      />
      {streamingError && (
        <Container>
          <Announcement css={{ marginTop: "1rem" }}>
            {streamingError}
          </Announcement>
        </Container>
      )}
      {isStreamingComplete && (
        <>
          <Container>
            <StyledResponseActions>
              <Button isPrimary isLowercase onClick={viewResultsCallback}>
                View More Results
              </Button>
              <Button isLowercase onClick={handleNewQuestion}>
                Ask Another Question
              </Button>
            </StyledResponseActions>
            <StyledResponseDisclaimer>{AI_DISCLAIMER}</StyledResponseDisclaimer>
          </Container>
          <ChatFeedback />
        </>
      )}
    </>
  );
};

export default React.memo(Chat);
