import React, { useEffect, useState } from "react";

import { AI_SEARCH_UNSUBMITTED } from "@/lib/constants/common";
import ChatConversation from "./Conversation";
import ChatFeedback from "@/components/Chat/Feedback/Feedback";
import ChatResponse from "@/components/Chat/Response/Response";
import Container from "@/components/Shared/Container";
import { StyledUnsubmitted } from "./Response/Response.styled";
import useQueryParams from "@/hooks/useQueryParams";
import { v4 as uuidv4 } from "uuid";

interface Conversation {
  question: string;
  answer: string;
}

const Chat = () => {
  const { searchTerm } = useQueryParams();

  const initialConversation = {
    question: searchTerm,
    answer: "",
  };

  const [conversationRef, setConversationRef] = useState<string>();
  const [conversation, setConversation] = useState<Conversation[]>([
    initialConversation,
  ]);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const conversationRef = uuidv4();
    setIsStreaming(true);
    setConversationRef(conversationRef);
    setConversation([initialConversation]);
  }, [searchTerm]);

  const handleConversationCallback = (value: string) => {
    setIsStreaming(true);
    setConversation([
      ...conversation,
      {
        question: value,
        answer: "",
      },
    ]);
  };

  const handleResponseCallback = (content: any) => {
    setIsStreaming(false);
  };

  if (!searchTerm)
    return (
      <Container>
        <StyledUnsubmitted>{AI_SEARCH_UNSUBMITTED}</StyledUnsubmitted>
      </Container>
    );

  return (
    <Container>
      <section
        data-conversation-initial={searchTerm}
        data-conversation-length={conversation.length}
        data-conversation-ref={conversationRef}
      >
        {conversation
          .filter((entry) => entry.question)
          .map((entry, index) => {
            return (
              <ChatResponse
                conversationRef={conversationRef}
                key={index}
                question={entry.question}
                responseCallback={handleResponseCallback}
              />
            );
          })}
        <ChatConversation
          conversationCallback={handleConversationCallback}
          isStreaming={isStreaming}
        />
        {isStreaming && (
          <>
            {/* <StyledResponseActions>
            <Button isPrimary isLowercase onClick={viewResultsCallback}>
              View More Results
            </Button>
            <Button isLowercase onClick={handleNewQuestion}>
              Ask Another Question
            </Button>
          </StyledResponseActions>
          <StyledResponseDisclaimer>{AI_DISCLAIMER}</StyledResponseDisclaimer> */}
            {/* <ChatFeedback /> */}
          </>
        )}
      </section>
    </Container>
  );
};

export default Chat;
