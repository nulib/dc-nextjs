import * as Accordion from "@radix-ui/react-accordion";

import { Answer, QuestionRendered, StreamingMessage } from "./types/chat";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyledActions,
  StyledAnswerHeader,
  StyledAnswerItem,
  StyledRemoveButton,
} from "./components/Answer/Answer.styled";

import AnswerInformation from "./components/Answer/Information";
import AnswerLoader from "./components/Answer/Loader";
import { ChatConfig } from "@/components/Chat/types/chat";
import Icon from "@/components/Shared/Icon";
import { IconClear } from "@/components/Shared/SVG/Icons";
import QuestionInput from "./components/Question/Input";
import SourceDocuments from "./components/Answer/SourceDocuments";
import StreamingAnswer from "./components/Answer/StreamingAnswer";
import useLocalStorageSimple from "./hooks/useLocalStorageSimple";
import useQueryParams from "@/hooks/useQueryParams";
import useStreamingAnswers from "./hooks/useStreamingAnswers";

const Chat = ({ chatConfig }: { chatConfig: ChatConfig }) => {
  const { auth: authToken, endpoint } = chatConfig;
  const { prepareQuestion, updateStreamAnswers } = useStreamingAnswers();

  const [chatSocket, setChatSocket] = React.useState<WebSocket>();
  const [readyState, setReadyState] = React.useState<WebSocket["readyState"]>();

  const [streamedAnswer, setStreamedAnswer] = useState("");
  console.log("streamedAnswer", streamedAnswer);

  const { searchTerm: question } = useQueryParams();
  console.log("question", question);

  const handleReadyStateChange = (event: Event) => {
    const target = event.target as WebSocket;
    console.log("target.readyState", target.readyState);
    setReadyState(target.readyState);
  };

  // Handle web socket stream updates
  const handleMessageUpdate = (event: MessageEvent) => {
    const data: StreamingMessage = JSON.parse(event.data);
    console.log("handleMessageUpdate", data);

    if (data.token) {
      setStreamedAnswer((prev) => {
        console.log("prev, data.token", prev, data.token);
        return prev + data.token;
      });
    } else if (data.answer) {
      setStreamedAnswer(data.answer);
    }
  };

  useEffect(() => {
    if (question && chatSocket?.readyState === 1) {
      const preparedQuestion = prepareQuestion(question, authToken);
      console.log("preparedQuestion", preparedQuestion, chatSocket);
      chatSocket?.send(JSON.stringify(preparedQuestion));
    }
  }, [authToken, chatSocket, question, prepareQuestion]);

  useEffect(() => {
    if (!authToken || !endpoint) return;

    console.log("creating socket", authToken, endpoint);
    const socket = new WebSocket(endpoint);

    socket.addEventListener("open", handleReadyStateChange);
    socket.addEventListener("close", handleReadyStateChange);
    socket.addEventListener("error", handleReadyStateChange);
    socket.addEventListener("message", handleMessageUpdate);

    setChatSocket(socket);

    return () => {
      socket.removeEventListener("open", handleReadyStateChange);
      socket.removeEventListener("close", handleReadyStateChange);
      socket.removeEventListener("error", handleReadyStateChange);
      socket.removeEventListener("message", handleMessageUpdate);
    };
  }, [authToken, endpoint]);

  return (
    <>
      {question && (
        <>
          {/* <SourceDocuments source_documents={answer.source_documents} /> */}
          <StreamingAnswer answer={streamedAnswer} isComplete={false} />
        </>
      )}
    </>
  );
};

export default Chat;
