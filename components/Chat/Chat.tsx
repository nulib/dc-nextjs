import React, { useEffect, useState } from "react";
import { defaultState, useSearchState } from "@/context/search-context";

import Announcement from "@/components/Shared/Announcement";
import { Button } from "@nulib/design-system";
import ChatFeedback from "@/components/Chat/Feedback/Feedback";
import ChatResponse from "@/components/Chat/Response/Response";
import Container from "@/components/Shared/Container";
import { StyledResponseActions } from "@/components/Chat/Response/Response.styled";
import { Work } from "@nulib/dcapi-types";
import { pluralize } from "@/lib/utils/count-helpers";
import { prepareQuestion } from "@/lib/chat-helpers";
import useChatSocket from "@/hooks/useChatSocket";
import useQueryParams from "@/hooks/useQueryParams";

const Chat = ({ totalResults }: { totalResults?: number }) => {
  const { searchTerm = "" } = useQueryParams();
  const { authToken, isConnected, message, sendMessage } = useChatSocket();

  const [streamingError, setStreamingError] = useState("");

  /**
   * get the`chat` state and dispatch function from the search context
   * for persisting the chat state when search screen tabs are switched
   */
  const {
    searchState: { chat },
    searchDispatch,
  } = useSearchState();
  const { question, answer, documents } = chat;

  const [sourceDocuments, setSourceDocuments] = useState<Work[]>([]);
  const [streamedAnswer, setStreamedAnswer] = useState("");

  const isStreamingComplete = !!question && searchTerm === question;

  useEffect(() => {
    if (!isStreamingComplete && isConnected && authToken && searchTerm) {
      resetChat();
      const preparedQuestion = prepareQuestion(searchTerm, authToken);
      sendMessage(preparedQuestion);
    }
  }, [authToken, isStreamingComplete, isConnected, searchTerm, sendMessage]);

  useEffect(() => {
    if (!message) return;

    const updateSourceDocuments = () => {
      setSourceDocuments(message.source_documents!);
    };

    const updateStreamedAnswer = () => {
      setStreamedAnswer((prev) => prev + message.token);
    };

    const updateChat = () => {
      searchDispatch({
        chat: {
          answer: message.answer || "",
          documents: sourceDocuments,
          question: searchTerm || "",
        },
        type: "updateChat",
      });
    };

    if (message.source_documents) {
      updateSourceDocuments();
      return;
    }

    if (message.token) {
      updateStreamedAnswer();
      return;
    }

    if (message.end) {
      switch (message.end.reason) {
        case "length":
          setStreamingError("The response has hit the LLM token limit.");
          break;
        case "timeout":
          setStreamingError("The response has timed out.");
          break;
        case "eos_token":
          setStreamingError("This should never happen.");
          break;
        default:
          break;
      }
    }

    if (message.answer) {
      updateChat();
    }
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
    setStreamedAnswer("");
    setSourceDocuments([]);
  }

  if (!searchTerm)
    return (
      <Container>
        <p>
          What can I help you find? Try searching for `john cage scrapbooks` or
          `who played at the Berkeley Folk Music Festival in 1965?`
        </p>
      </Container>
    );

  return (
    <>
      <ChatResponse
        isStreamingComplete={isStreamingComplete}
        searchTerm={question || searchTerm}
        sourceDocuments={isStreamingComplete ? documents : sourceDocuments}
        streamedAnswer={isStreamingComplete ? answer : streamedAnswer}
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
              <Button isPrimary isLowercase>
                View {pluralize("Result", totalResults || 0)}
              </Button>
              <Button isLowercase onClick={handleNewQuestion}>
                Ask another Question
              </Button>
            </StyledResponseActions>
          </Container>
          <ChatFeedback />
        </>
      )}
    </>
  );
};

export default React.memo(Chat);
