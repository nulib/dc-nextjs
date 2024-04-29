import React, { useEffect, useState } from "react";

import ChatResponse from "@/components/Chat/Response/Response";
import { Work } from "@nulib/dcapi-types";
import { prepareQuestion } from "@/lib/chat-helpers";
import useChatSocket from "@/hooks/useChatSocket";
import useQueryParams from "@/hooks/useQueryParams";

const Chat = () => {
  const { searchTerm: question } = useQueryParams();
  const { authToken, isConnected, message, sendMessage } = useChatSocket();

  const [isStreamingComplete, setIsStreamingComplete] = useState(false);
  const [sourceDocuments, setSourceDocuments] = useState<Work[]>([]);
  const [streamedAnswer, setStreamedAnswer] = useState("");

  useEffect(() => {
    if (question && isConnected && authToken) {
      const preparedQuestion = prepareQuestion(question, authToken);
      sendMessage(preparedQuestion);
    }
  }, [authToken, isConnected, question, sendMessage]);

  useEffect(() => {
    if (!message) return;

    if (message.source_documents) {
      setSourceDocuments(message.source_documents);
    } else if (message.token) {
      setStreamedAnswer((prev) => {
        return prev + message.token;
      });
    } else if (message.answer) {
      setStreamedAnswer(message.answer);
      setIsStreamingComplete(true);
    }
  }, [message]);

  if (!question) return null;

  return (
    <ChatResponse
      isStreamingComplete={isStreamingComplete}
      question={question}
      sourceDocuments={sourceDocuments}
      streamedAnswer={streamedAnswer}
    />
  );
};

export default Chat;
