import { styled } from "@/stitches.config";
import { useRef } from "react";

const textareaPlaceholder = "Ask a followup question...";

interface ChatConversationProps {
  conversationCallback: (message: string) => void;
  isStreaming?: boolean;
}

const ChatConversation: React.FC<ChatConversationProps> = ({
  conversationCallback,
  isStreaming,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitConversationCallback();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isStreaming) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitConversationCallback();
    }
  };

  const submitConversationCallback = () => {
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

  return (
    <StyledChatConversation>
      <form onSubmit={handleSubmit} ref={formRef} data-is-focused="false">
        <textarea
          ref={textareaRef}
          onKeyDown={handleKeyDown}
          placeholder={textareaPlaceholder}
          onFocus={handleFocus}
          onBlur={handleFocus}
        ></textarea>
        <button type="submit" disabled={isStreaming}>
          submit
        </button>
      </form>
    </StyledChatConversation>
  );
};

const StyledChatConversation = styled("div", {
  position: "relative",
  zIndex: 0,

  form: {
    transition: "$dcAll",
    borderRadius: "3px",
    flexWrap: "wrap",
    overflow: "hidden",

    ["&[data-is-focused=true]"]: {
      backgroundColor: "$white !important",
      boxShadow: "3px 3px 11px #0001",
      outline: "2px solid $purple60",
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
  },

  textarea: {
    width: "100%",
    height: "100%",
    padding: "$gr3",
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
  },
});

export default ChatConversation;
