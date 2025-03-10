import React, { useEffect, useState } from "react";

import { AI_SEARCH_UNSUBMITTED } from "@/lib/constants/common";
import ChatConversation from "./Conversation";
import ChatResponse from "@/components/Chat/Response/Response";
import Container from "@/components/Shared/Container";
import { StyledUnsubmitted } from "./Response/Response.styled";
import { styled } from "@/stitches.config";
import { useSearchState } from "@/context/search-context";
import { v4 as uuidv4 } from "uuid";
import { Turn } from "@/types/context/search-context";

const Chat = () => {
  const { searchState, searchDispatch } = useSearchState();

  const { conversation } = searchState;

  const ref = conversation.ref;
  /** get initial question  */
  const initialQuestion = conversation.initialQuestion;

  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!initialQuestion) return;

    const conversationRef = uuidv4();
    setIsStreaming(true);

    searchDispatch({
      type: "updateConversation",
      conversation: {
        ...conversation,
        ref: conversationRef,
      },
    });
  }, [initialQuestion]);

  const handleConversationCallback = (value: string) => {
    debugger;
    setIsStreaming(true);

    if (ref && value)
      searchDispatch({
        type: "updateConversation",
        conversation: {
          ...conversation,
          turns: [
            ...conversation.turns,
            {
              question: value,
              answer: "",
              aggregations: [],
              works: [],
            },
          ],
        },
      });
  };

  const handleResponseCallback = () => {
    setIsStreaming(false);
  };

  if (!initialQuestion)
    return (
      <Container>
        <StyledUnsubmitted>{AI_SEARCH_UNSUBMITTED}</StyledUnsubmitted>
      </Container>
    );

  return (
    <Container>
      <StyledChat
        data-conversation-initial={initialQuestion}
        // TODO: not sure what this represents
        data-conversation-length={conversation.turns.length}
        data-conversation-ref={ref}
      >
        {conversation.turns
          .filter((turn) => turn.question)
          .map((turn, index) => {
            return (
              <ChatResponse
                conversationIndex={index}
                conversationRef={ref}
                key={index}
                question={turn.question}
                content={turn.renderedContent}
                responseCallback={handleResponseCallback}
              />
            );
          })}
        <ChatConversation
          conversationCallback={handleConversationCallback}
          isStreaming={isStreaming}
        />
      </StyledChat>
    </Container>
  );
};

const StyledChat = styled("section", {
  padding: "$gr5 0",
  position: "relative",
});

export default Chat;
