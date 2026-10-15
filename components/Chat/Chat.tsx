import chatStyles from "@/components/Chat/Chat.module.css";
import responseStyles from "@/components/Chat/Response/Response.module.css";
import { useState } from "react";
import { AI_SEARCH_UNSUBMITTED } from "@/lib/constants/common";
import ChatConversation from "./Conversation";
import ChatResponse from "@/components/Chat/Response/Response";
import Container from "@/components/Shared/Container";
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
              works: [],
            },
          ],
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
        <p className={responseStyles.styledUnsubmitted}>
          {AI_SEARCH_UNSUBMITTED}
        </p>
      </Container>
    );
  return (
    <Container>
      <section
        data-conversation-initial={conversation.initialQuestion}
        data-conversation-length={conversation.turns.length}
        data-conversation-ref={conversation.ref}
        className={chatStyles.styledChat}
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
      </section>
    </Container>
  );
};
export default Chat;
