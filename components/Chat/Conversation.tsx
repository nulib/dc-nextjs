import { IconRefresh, IconReply, IconSparkles } from "../Shared/SVG/Icons";
import {
  StyledChatConversation,
  StyledResetButton,
} from "./Conversation.styled";
import { useEffect, useRef } from "react";
import { styled } from "@/stitches.config";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";
import Stack from "./Stack/Stack";
import { AI_SYS_PROMPT_MSG } from "@/lib/constants/common";

interface ChatConversationProps {
  conversationCallback: (message: string) => void;
  isStreaming?: boolean;
}

const ChatConversation: React.FC<ChatConversationProps> = ({
  conversationCallback,
  isStreaming,
}) => {
  const router = useRouter();
  const {
    searchState: { conversation },
    searchDispatch,
  } = useSearchState();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const textareaPlaceholder = "Ask a followup question";

  const handleScroll = () => {
    // handle scrolling
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitConversationCallback();
    textareaRef.current!.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitConversationCallback();
    }
  };

  const submitConversationCallback = () => {
    if (isStreaming) return;

    const value = textareaRef.current?.value;
    if (value) conversationCallback(value);

    /* Clear the textarea and unfocus it */
    textareaRef.current!.value = "";
    textareaRef.current!.blur();
  };

  const handleFocus = () => {
    const isFocused = String(textareaRef.current === document.activeElement);
    formRef.current!.dataset.isFocused = isFocused;
  };

  const handleStackDismiss = () => {
    searchDispatch({
      type: "updateConversation",
      conversation: {
        ...conversation,
        context: undefined,
      },
    });
  };

  const handleClearConversation = () => {
    const textarea = document.getElementById(
      "dc-search",
    ) as HTMLTextAreaElement;

    if (textarea) {
      textarea.value = "";
      textarea.innerText = "";
      textarea.focus();
    }

    router.push({
      pathname: "/search",
    });
  };

  return (
    <StyledChatConversation data-testid="chat-conversation">
      <div>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          data-is-focused="false"
          data-is-streaming={isStreaming}
        >
          <textarea
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            placeholder={textareaPlaceholder}
            onFocus={handleFocus}
            onBlur={handleFocus}
          ></textarea>
          {conversation.context?.works &&
            conversation.context.works.length > 0 && (
              <Stack
                context={conversation.context}
                isDismissable
                dismissCallback={handleStackDismiss}
              />
            )}
          <button type="submit" disabled={isStreaming}>
            {isStreaming ? (
              <>
                Responding
                <IconSparkles />
              </>
            ) : (
              <>
                Reply <IconReply />
              </>
            )}
          </button>
        </form>
        <StyledSystemPrompt>
          <AI_SYS_PROMPT_MSG />
        </StyledSystemPrompt>
      </div>
      <StyledResetButton onClick={handleClearConversation}>
        Start new conversation
        <IconRefresh />
      </StyledResetButton>
    </StyledChatConversation>
  );
};

export const StyledSystemPrompt = styled("p", {
  margin: 0,
  fontSize: "$gr1",
  color: "$black50",
  marginBlockStart: "$gr1",
  a: {
    cursor: "pointer",
  },
});

export default ChatConversation;
