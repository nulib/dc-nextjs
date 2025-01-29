import { IconArrowForward, IconRefresh, IconReply } from "../Shared/SVG/Icons";

import { styled } from "@/stitches.config";
import { transform } from "next/dist/build/swc";
import { useRef } from "react";
import { useRouter } from "next/router";

const textareaPlaceholder = "Ask a followup question...";

interface ChatConversationProps {
  conversationCallback: (message: string) => void;
  isStreaming?: boolean;
}

const ChatConversation: React.FC<ChatConversationProps> = ({
  conversationCallback,
  isStreaming,
}) => {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitConversationCallback();
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
      <form onSubmit={handleSubmit} ref={formRef} data-is-focused="false">
        <textarea
          ref={textareaRef}
          onKeyDown={handleKeyDown}
          placeholder={textareaPlaceholder}
          onFocus={handleFocus}
          onBlur={handleFocus}
        ></textarea>
        <button type="submit" disabled={isStreaming}>
          Reply <IconReply />
        </button>
      </form>
      <StyledResetButton onClick={handleClearConversation}>
        Start new conversation
        <IconRefresh />
      </StyledResetButton>
    </StyledChatConversation>
  );
};

const StyledResetButton = styled("button", {
  border: "none",
  backgroundColor: "$white",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "$gr1",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr3",
  color: "$purple",
  padding: "$gr3",
  borderRadius: "3px",
  cursor: "pointer",
  transition: "$dcAll",
  textDecoration: "underline",
  textDecorationThickness: "min(2px,max(1px,.05em))",
  textUnderlineOffset: "calc(.05em + 2px)",
  textDecorationColor: "$purple10",
  margin: "0 auto",

  svg: {
    fill: "transparent",
    stroke: "$purple",
    strokeWidth: "48px",
    height: "1.25em",
    width: "1.25em",
    transform: "rotate(45deg) scaleX(-1)",
  },
});

const StyledChatConversation = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "$gr5 0 $gr4",
  gap: "$gr3",

  form: {
    position: "relative",
    transition: "$dcAll",
    borderRadius: "3px",
    flexWrap: "wrap",
    overflow: "hidden",
    flexGrow: 1,
    zIndex: 0,
    height: "62px",

    ["&[data-is-focused=true]"]: {
      backgroundColor: "$white !important",
      boxShadow: "3px 3px 11px #0001",
      outline: "2px solid $purple60",

      button: {
        backgroundColor: "$purple",
        color: "$white",
      },
    },

    ["&[data-is-focused=false]"]: {
      backgroundColor: "#f0f0f0",
      boxShadow: "none",
      outline: "2px solid transparent",

      textarea: {
        color: "$black50",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },

    textarea: {
      width: "100%",
      height: "100%",
      padding: "15px $gr3",
      border: "none",
      resize: "none",
      backgroundColor: "$gray6",
      fontSize: "$gr3",
      lineHeight: "147%",
      zIndex: "1",
      fontFamily: "$northwesternSansRegular",
      overflow: "hidden",
      outline: "none",
      transition: "$dcAll",
      boxSizing: "border-box",

      "&::placeholder": {
        overflow: "hidden",
        color: "$black50",
        textOverflow: "ellipsis",
      },
    },

    button: {
      position: "absolute",
      bottom: "$gr2",
      right: "$gr2",
      height: "38px",
      borderRadius: "3px",
      background: "$purple",
      border: "none",
      color: "$white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "$dcAll",
      cursor: "pointer",
      fontSize: "$gr2",
      padding: "0 $gr2",
      gap: "$gr2",
      fontFamily: "$northwesternSansRegular",

      "&:hover, &:focus": {
        backgroundColor: "$purple120",
        color: "$white",
      },

      svg: {
        width: "1rem",
        height: "1rem",
        fill: "transparent",
        stroke: "$white",
        // transform: "rotate(-90deg)",

        path: {
          strokeWidth: "32px",
        },
      },

      "&:disabled": {
        backgroundColor: "$black20",
        color: "$white",
      },
    },
  },
});

export default ChatConversation;
