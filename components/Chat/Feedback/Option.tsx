import { useRef, useState } from "react";

import { styled } from "@/stitches.config";

const ChatFeedbackOption = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleOnChange() {
    setIsChecked(inputRef?.current?.checked ?? false);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === " ") {
      event.preventDefault();
      setIsChecked(!isChecked);
    }
  };

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <StyledChatFeedbackOption
      aria-checked={isChecked}
      data-testid={`chat-feedback-option-${name}`}
      isChecked={isChecked}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="checkbox"
      tabIndex={0}
    >
      <input
        name={name}
        id={`chat-feedback-option-${name}`}
        onChange={handleOnChange}
        ref={inputRef}
        type="checkbox"
      />
      {label}
    </StyledChatFeedbackOption>
  );
};

/* eslint-disable sort-keys */
const StyledChatFeedbackOption = styled("label", {
  display: "inline-flex",
  alignItems: "center",
  fontSize: "$gr2",
  margin: "0 $gr1 $gr1 0",
  borderRadius: "1rem",
  cursor: "pointer",
  transition: "$dcAll",
  padding: "$gr1 $gr2",
  gap: "3px",

  "&:hover": {
    boxShadow: "3px 3px 8px #0002",
  },

  input: {
    display: "none",
  },

  variants: {
    isChecked: {
      true: {
        color: "$white",
        border: "1px solid $black80",
        backgroundColor: "$black80",
      },
      false: {
        color: "$black50",
        border: "1px solid $black20",
        backgroundColor: "$white",
      },
    },
  },
});

export default ChatFeedbackOption;
