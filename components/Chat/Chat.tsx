import React, { useEffect, useState } from "react";

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
import { useSearchState } from "@/context/search-context";

const Chat = ({ totalResults }: { totalResults?: number }) => {
  const { searchTerm = "" } = useQueryParams();
  const { authToken, isConnected, message, sendMessage } = useChatSocket();
  const { searchDispatch, searchState } = useSearchState();
  const { chat } = searchState;
  const { answer, documents = [], question } = chat;

  const sameQuestionExists = !!question && searchTerm === question;

  const [sourceDocuments, setSourceDocuments] = useState<Work[]>([]);
  const [streamedAnswer, setStreamedAnswer] = useState("");

  useEffect(() => {
    if (!sameQuestionExists && isConnected && authToken && searchTerm) {
      const preparedQuestion = prepareQuestion(searchTerm, authToken);
      sendMessage(preparedQuestion);
    }
  }, [authToken, isConnected, sameQuestionExists, searchTerm, sendMessage]);

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

    if (message.answer) {
      updateChat();
    }
  }, [message, searchTerm, sourceDocuments, searchDispatch]);

  function handleNewQuestion() {
    const input = document.getElementById("dc-search") as HTMLInputElement;
    if (input) {
      input.focus();
      input.value = "";
    }
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
        isStreamingComplete={!!answer}
        searchTerm={searchTerm}
        sourceDocuments={sameQuestionExists ? documents : sourceDocuments}
        streamedAnswer={sameQuestionExists ? answer : streamedAnswer}
      />
      {answer && (
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
