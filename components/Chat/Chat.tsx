import React, { useEffect, useState } from "react";

import ChatResponse from "@/components/Chat/Response/Response";
import { Work } from "@nulib/dcapi-types";
import { prepareQuestion } from "@/lib/chat-helpers";
import useChatSocket from "@/hooks/useChatSocket";
import useQueryParams from "@/hooks/useQueryParams";
import { useSearchState } from "@/context/search-context";

const Chat = () => {
  const { searchTerm = "" } = useQueryParams();
  const { authToken, isConnected, message, sendMessage } = useChatSocket();
  const { searchDispatch, searchState } = useSearchState();
  const { chat } = searchState;
  const { answer, documents = [], question } = chat;

  const sameQuestionExists = !!question && searchTerm === question;

  const [sourceDocuments, setSourceDocuments] = useState<Work[]>([]);
  const [streamedAnswer, setStreamedAnswer] = useState("");

  useEffect(() => {
    if (!sameQuestionExists && isConnected && authToken) {
      const preparedQuestion = prepareQuestion(searchTerm, authToken);
      sendMessage(preparedQuestion);
    }
  }, [authToken, isConnected, sameQuestionExists, searchTerm, sendMessage]);

  useEffect(() => {
    if (!message) return;

    if (message.source_documents) {
      setSourceDocuments(message.source_documents);
    } else if (message.token) {
      setStreamedAnswer((prev) => {
        return prev + message.token;
      });
    } else if (message.answer) {
      searchDispatch({
        chat: {
          answer: message.answer,
          documents: sourceDocuments,
          question: searchTerm || "",
        },
        type: "updateChat",
      });
    }
  }, [message, searchTerm, sourceDocuments, searchDispatch]);

  if (!searchTerm) return null;

  return (
    <ChatResponse
      isStreamingComplete={!!answer}
      searchTerm={searchTerm}
      sourceDocuments={sameQuestionExists ? documents : sourceDocuments}
      streamedAnswer={sameQuestionExists ? answer : streamedAnswer}
    />
  );
};

export default React.memo(Chat);
