import React, { useState } from "react";

import { AI_SEARCH_UNSUBMITTED } from "@/lib/constants/common";
import ChatConversation from "./Conversation";
import ChatResponse from "@/components/Chat/Response/Response";
import Container from "@/components/Shared/Container";
import { StyledUnsubmitted } from "./Response/Response.styled";
import { styled } from "@/stitches.config";
import { useSearchState } from "@/context/search-context";

const Chat = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const {
    searchState: { conversation },
    searchDispatch,
  } = useSearchState();

  const handleConversationCallback = (value: string) => {
    setIsStreaming(true);

    if (conversation.ref && value) {
      searchDispatch({
        type: "updateConversation",
        conversation: {
          ...conversation,
          turns: [
            ...conversation.turns,
            {
              question: value,
              /**
               * Move the chat staged context to the new turn
               */
              context: conversation.stagedContext,
              answer: "",
              aggregations: [],
            },
          ],
          /**
           * Clear the staged context after submitting a question
           */
          stagedContext: undefined, // clear chat context on new question
        },
      });
    }
  };

  const handleResponseCallback = () => {
    setIsStreaming(false);
  };

  if (!conversation?.initialQuestion)
    return (
      <Container>
        <StyledUnsubmitted>{AI_SEARCH_UNSUBMITTED}</StyledUnsubmitted>
      </Container>
    );

  return (
    <Container>
      <StyledChat
        data-conversation-initial={conversation.initialQuestion}
        data-conversation-length={conversation.turns.length}
        data-conversation-ref={conversation.ref}
      >
        {conversation.turns
          .filter((turn) => turn.question)
          .map((turn, index) => {
            return (
              <ChatResponse
                conversationIndex={index}
                conversationRef={conversation.ref}
                key={`${conversation.ref}--${index}`}
                question={turn.question}
                content={turn.renderedContent}
                context={turn.context}
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
