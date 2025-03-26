import { IconRefresh, IconReply, IconSparkles } from "../Shared/SVG/Icons";
import {
  StyledChatConversation,
  StyledResetButton,
} from "./Conversation.styled";
import { useEffect, useRef } from "react";

import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

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
  } = useSearchState();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const textareaPlaceholder = conversation.latestDocs
    ? "Ask about these documents"
    : "Ask a followup question";

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
      <StyledResetButton onClick={handleClearConversation}>
        Start new conversation
        <IconRefresh />
      </StyledResetButton>
    </StyledChatConversation>
  );
};

export default ChatConversation;
