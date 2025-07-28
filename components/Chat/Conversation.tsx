import { IconRefresh, IconReply, IconSparkles } from "../Shared/SVG/Icons";
import {
  StyledChatConversation,
  StyledResetButton,
} from "./Conversation.styled";
import { defaultState, useSearchState } from "@/context/search-context";
import { useEffect, useRef } from "react";

import { AI_SYS_PROMPT_MSG } from "@/lib/constants/common";
import Stack from "./Stack/Stack";
import { styled } from "@/stitches.config";
import { useRouter } from "next/router";

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
    searchState: { conversation, panel },
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

  useEffect(() => {
    if (conversation?.stagedContext?.works?.length && !panel.open) {
      const searchWrapper = document.getElementById("search-wrapper");

      if (searchWrapper) {
        const searchWrapperBottom =
          searchWrapper.offsetTop + searchWrapper.offsetHeight;
        const targetScrollTop = searchWrapperBottom - window.innerHeight;

        window.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }

      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [conversation?.stagedContext?.works, panel.open]);

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
        stagedContext: undefined,
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

    searchDispatch({
      type: "updateConversation",
      conversation: defaultState.conversation,
    });

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
          {conversation.stagedContext?.works &&
            conversation.stagedContext.works.length > 0 && (
              <Stack
                context={conversation.stagedContext}
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
  margin: "$gr2",
  fontSize: "$gr2",
  color: "$black50",
  textAlign: "right",
  a: {
    cursor: "pointer",
  },
});

export default ChatConversation;
