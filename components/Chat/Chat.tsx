import React, { useEffect, useState } from "react";

import ChatResponse from "@/components/Chat/Response/Response";
import { StreamingMessage } from "@/types/components/chat";
import { Work } from "@nulib/dcapi-types";
import { prepareQuestion } from "@/lib/chat-helpers";

const Chat = ({
  authToken,
  chatSocket,
  question,
}: {
  authToken: string;
  chatSocket?: WebSocket;
  question?: string;
}) => {
  const [isReadyStateOpen, setIsReadyStateOpen] = useState(false);
  const [isStreamingComplete, setIsStreamingComplete] = useState(false);
  const [sourceDocuments, setSourceDocuments] = useState<Work[]>([]);
  const [streamedAnswer, setStreamedAnswer] = useState("");

  const handleReadyStateChange = () => {
    setIsReadyStateOpen(chatSocket?.readyState === 1);
  };

  // Handle web socket stream updates
  const handleMessageUpdate = (event: MessageEvent) => {
    const data: StreamingMessage = JSON.parse(event.data);
    // console.log("handleMessageUpdate", data);

    if (data.source_documents) {
      setSourceDocuments(data.source_documents);
    } else if (data.token) {
      setStreamedAnswer((prev) => {
        return prev + data.token;
      });
    } else if (data.answer) {
      setStreamedAnswer(data.answer);
      setIsStreamingComplete(true);
    }
  };

  useEffect(() => {
    if (question && isReadyStateOpen && chatSocket) {
      const preparedQuestion = prepareQuestion(question, authToken);
      chatSocket?.send(JSON.stringify(preparedQuestion));
    }
  }, [chatSocket, isReadyStateOpen, prepareQuestion]);

  useEffect(() => {
    if (chatSocket) {
      chatSocket.addEventListener("message", handleMessageUpdate);
      chatSocket.addEventListener("open", handleReadyStateChange);
      chatSocket.addEventListener("close", handleReadyStateChange);
      chatSocket.addEventListener("error", handleReadyStateChange);
    }

    return () => {
      if (chatSocket) {
        chatSocket.removeEventListener("message", handleMessageUpdate);
        chatSocket.removeEventListener("open", handleReadyStateChange);
        chatSocket.removeEventListener("close", handleReadyStateChange);
        chatSocket.removeEventListener("error", handleReadyStateChange);
      }
    };
  }, [chatSocket, chatSocket?.url]);

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
