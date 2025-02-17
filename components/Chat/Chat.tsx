import React, { useEffect, useState } from "react";

import { AI_SEARCH_UNSUBMITTED } from "@/lib/constants/common";
import ChatConversation from "./Conversation";
import ChatResponse from "@/components/Chat/Response/Response";
import Container from "@/components/Shared/Container";
import { StyledUnsubmitted } from "./Response/Response.styled";
import { styled } from "@/stitches.config";
import { useSearchState } from "@/context/search-context";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const { searchState, searchDispatch } = useSearchState();

  const {
    conversation: { body, ref },
  } = searchState;

  /** get initial question  */
  const initialQuestion = body.length > 0 && body[0].question;

  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!initialQuestion) return;

    const conversationRef = uuidv4();
    setIsStreaming(true);

    searchDispatch({
      type: "updateConversation",
      conversation: {
        body: [
          {
            question: initialQuestion,
            answer: "",
          },
        ],
        ref: conversationRef,
      },
    });
  }, [initialQuestion]);

  const handleConversationCallback = (value: string) => {
    setIsStreaming(true);

    if (ref && value)
      searchDispatch({
        type: "updateConversation",
        conversation: {
          body: [
            ...body,
            {
              question: value,
              answer: "",
            },
          ],
          ref,
        },
      });
  };

  const handleResponseCallback = (content: any) => {
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
        data-conversation-length={body.length}
        data-conversation-ref={ref}
      >
        {body
          .filter((entry) => entry.question)
          .map((entry, index) => {
            return (
              <ChatResponse
                conversationIndex={index}
                conversationRef={ref}
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
      </StyledChat>
    </Container>
  );
};

const StyledChat = styled("section", {
  padding: "$gr6 0",
  position: "relative",
});

export default Chat;
